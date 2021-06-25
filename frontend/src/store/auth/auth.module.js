import { authService } from "../../api/auth.service.js";
import {
  AUTH_LOGIN,
  AUTH_REGISTER,
  AUTH_INFO,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT_SUCCESS,
  AUTH_REGISTER_SUCCESS,
  SET_MESSAGE
} from "./auth.constant";

import { STORAGE_ACCESS_TOKEN, STORAGE_USER_NAME } from "../constants";

const state = {
  message: "",
  token:
    localStorage.getItem(STORAGE_ACCESS_TOKEN) ||
    sessionStorage.getItem(STORAGE_ACCESS_TOKEN) ||
    "",
  name:
    localStorage.getItem(STORAGE_USER_NAME) ||
      sessionStorage.getItem(STORAGE_USER_NAME) ||
      ""
};

// getters
const getters = {
  isUserLoggedIn: state => state.token != "",
  getName: state => state.name,
  getMessage: state => state.message
};

// actions
const actions = {
  [AUTH_LOGIN]: async ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      authService
      .login(payload)
      .then(res => {
          console.log('Login res', res.token, res.name),
          commit(AUTH_LOGIN_SUCCESS, {token: res.token, name: res.profile.name});
          commit(SET_MESSAGE, `Bem-vindo, ${res.profile.name}!`);
          resolve(res);
      })
      .catch(err => reject(err))

    })
  },

  [AUTH_REGISTER]: async ({ commit }, payload) => {
    return new Promise((resolve, reject) => {
      authService.register(payload)
      .then(res => {
          commit(SET_MESSAGE, `O utilizador ${res.body.name} foi adicionado com sucesso!`);
          resolve(res);
      })
      .catch(err => reject(err))
    });
  },

  [AUTH_INFO]: async ({ commit }, token) => {
    commit(
      SET_MESSAGE,
      await authService.getInfo(token)
    );
  }
};

// mutations
export const mutations = {
  [AUTH_LOGIN_SUCCESS]: (state, data) => {
    state.token = data.token;
    localStorage.STORAGE_ACCESS_TOKEN = data.token;
    state.name = data.name;
    localStorage.STORAGE_USER_NAME = JSON.stringify(data.name);
  },

  [AUTH_LOGOUT_SUCCESS]: state => {
    state.token = "";
    state.name = "";
    localStorage.removeItem(STORAGE_ACCESS_TOKEN);
    localStorage.removeItem(STORAGE_USER_NAME);
  },
  [AUTH_REGISTER_SUCCESS]: (state, data) => {
    state.register = data;
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
