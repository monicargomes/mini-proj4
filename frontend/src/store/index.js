import Vue from "vue";
import Vuex from "vuex";

// import moduleBase from "./module";
import moduleTask from "./tasks/task.module";


Vue.use(Vuex);

export default new Vuex.Store({
  // getters: moduleTask.getters,
  // mutations: moduleTask.mutations,
  // state: moduleTask.state,
  // actions: moduleTask.actions,
  modules: {
    task: moduleTask
  }
});
