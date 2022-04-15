<template>
  <div class="menu">
    <span @click="add">新建窗口</span>
    <span @click="close">X</span>
  </div>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Welcome to Your Vue.js App" />
</template>

<script>
const { ipcRenderer } = window.requireNative("electron");
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  created() {
    //渲染进程监听主进程时间
    ipcRenderer.on("read", (el, val) => {
      console.log("read", val);
      document.getElementsByClassName("menu")[0].innerHTML = val;
    });
  },
  methods: {
    close() {
      console.log("渲染进程发送消息给主进程");
      //渲染进程发送主进程事件
      ipcRenderer.send("close");
    },
    add() {
      console.log("add");
      console.log(ipcRenderer);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.menu {
  background-color: #2c3e50;
  height: 50px;
  -webkit-app-region: drag;
  font-size: 20px;
  color: aliceblue;
}
span {
  -webkit-app-region: no-drag;
}
</style>
