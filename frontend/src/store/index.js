import Vue from "vue";
import Vuex from "vuex";

import moduleTask from "./tasks/task.module";
import moduleAuth from "./auth/auth.module";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    task: moduleTask,
    auth: moduleAuth
  }
});
