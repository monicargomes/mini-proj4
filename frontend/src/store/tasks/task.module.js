import taskService from "../../api/task.service";
import {
  FETCH_TASKS,
  ADD_TASK,
  EDIT_TASK,
  REMOVE_TASK,
  SET_TASKS,
  SET_MESSAGE
} from "./task.constant";

const state = {
  tasks: [],
  message: ""
};

const getters = {
  getTasks: state => state.tasks,
  getTaskById: state => id => state.tasks.find(task => task._id === id),
  getMessage: state => state.message
};

const actions = {
  [FETCH_TASKS]: ({ commit, rootState }) => {
    return new Promise((resolve, reject) => {
      taskService.getTasks(rootState.auth.token).then(
        res => {
          commit(SET_TASKS, res.body);
          resolve(res);
        },
        err => {
          commit(SET_MESSAGE, err.message);
          reject(err);
        }
      );
    });
  },
  [ADD_TASK]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      taskService.addTask(rootState.auth.token, payload).then(
        res => {
          commit(SET_MESSAGE, `A tarefa foi adicionada com sucesso!`);
          resolve(res);
        },
        err => {
          commit(SET_MESSAGE, err.message);
          reject(err);
        }
      );
    });
  },
  [EDIT_TASK]: ({ commit, rootState }, payload) => {
    return new Promise((resolve, reject) => {
      taskService.editTask(rootState.auth.token, payload).then(
        res => {
          commit(SET_MESSAGE, `A tarefa foi foi atualizada com sucesso!`);
          resolve(res);
        },
        err => {
          commit(SET_MESSAGE, err);
          reject(err);
        }
      );
    });
  },
  [REMOVE_TASK]: ({ commit }, id) => {
    return new Promise((resolve, reject) => {
      taskService.removeTask(rootState.auth.token, id).then(
        res => {
          commit(SET_MESSAGE, `A tarefa foi removida com sucesso!`);
          resolve(res);
        },
        err => {
          commit(SET_MESSAGE, err.message);
          reject(err);
        }
      );
    });
  }
};

export const mutations = {
  [SET_TASKS]: (state, tasks) => {
    state.tasks = tasks;
  },
  [SET_MESSAGE]: (state, message) => {
    state.message = message;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
