
//导入模块，只适用与主进程的，在渲染进程使用需要remote
const {app,BrowserWindow,Menu, shell, dialog, globalShortcut, ipcMain, webContents}  = require('electron')
const fs = require('fs')

//electron页面热更新
const reload = require('electron-reloader')
reload(module)



app.whenReady().then(()=>{

//窗口预加载
const mainWindow = new BrowserWindow({
  width:1800,
  height:800,
  webPreferences: {
    nodeIntegration: true,
    contextIsolation: false,
    enableRemoteModule: true,
    webSecurity: false
  }
  
})



//配置桌面应用菜单
const template = [
  {
    label:'文件',
    submenu:[{
      label:'打开新文件',
      click(){
      const mainWindow =   new BrowserWindow({
          width:800,
          height:1000
        })
        mainWindow.loadURL('http://localhost:8080')
      }
    }]
  },
  {
    label:"打开没有menu的窗口",
    
    click(){
      const mainWindow = new BrowserWindow({
        width:1000,
        height:1000,
        frame:false,
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false,
          enableRemoteModule: true,
          webSecurity: false
        }
      })
      mainWindow.loadURL('http://localhost:8080')
      mainWindow.webContents.openDevTools()
    }
  },
  {
    label:"外部链接",
    click(){
     shell.openExternal('https://www.baidu.com/')
    }
  },
  {
    label:"读取文件",
    click(){
      const res = dialog.showOpenDialogSync({
        title:'读取文件',
        buttonLabel:'确定',
        filters:[{
          name:'aaa',
          extensions:['js']
        }]
      }) 
      const fileValue = fs.readFileSync(res[0]).toString()
      console.log(fileValue,res[0])
      //主进程发送消息给渲染进程
      mainWindow.webContents.send('read',fileValue)
    }
  },
  {
    label:"保存文件",
    click(){
      const res = dialog.showSaveDialogSync({
        title:'保存文件',
        buttonLabel:'确定',
        filters:[{
          name:'aaa',
          extensions:['js']
        }]
      }) 
      fs.writeFileSync(res,'aaa12345')

    }
  }
]
const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu) 

mainWindow.loadURL('http://localhost:8080') //定义窗口加载的内容


// 直接打开控制台
mainWindow.webContents.openDevTools()

//快捷键设置
globalShortcut.register('commandorcontrol+x',()=>{
  console.log('按下了c+x')
  mainWindow.close() //关闭窗口，还有放大缩小等一系列窗口操作
})

//主进程监听渲染进程发送的消息
ipcMain.on('close',()=>{
  console.log('渲染进程和组进程进行了通信')
  mainWindow.close() //关闭窗口，还有放大缩小等一系列窗口操作
})



})  