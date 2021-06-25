import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import { routes } from "./routes";
import store from "./store";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueSimpleAlert from "vue-simple-alert";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueRouter);
Vue.use(VueSimpleAlert)

const router = new VueRouter({ routes, mode: "history" });

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters["auth/isUserLoggedIn"];
  if (to.name !== 'login' && to.name !== 'register' && !isAuthenticated) next({ name: 'login' })
  else next()
})

new Vue({
  router,
  store,
  el: "#app",
  render: (h) => h(App),
});
