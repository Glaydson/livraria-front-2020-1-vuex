<template>
  <div id="app">
    <BarraCabecalho />
    <div class="main-section columns">
      <main class="column">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script>
import BarraCabecalho from "@/components/barra-cabecalho";

export default {
  name: "App",
  components: {
    BarraCabecalho
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-left: 20px;
  margin-right: 20px;
  margin-top: 30px;
}
</style>
