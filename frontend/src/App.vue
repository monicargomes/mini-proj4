<template>
  <div id="app">
    <div class="body">
      <b-card no-body>
        <b-card-header header-tag="nav">
          <app-header></app-header>
        </b-card-header>

        <b-card-body>
          <router-view></router-view>
        </b-card-body>
      </b-card>
    </div>
  </div>
</template>

<script>
import Header from "./components/header/Header";
export default {
  name: "app",
  components: {
    "app-header": Header,
  },
};
</script>

<style lang="css">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
}
h1,
h2 {
  font-weight: normal;
}
a {
  text-decoration: none;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.body {
  width: 50%;
  margin: auto;
  height: 100%;
  padding: 24px 0;
}
</style>
