import axios from 'axios'
import { url } from '../../helper/env'

const state = () => {
  return {
    token: localStorage.getItem('token') || null,
    refreshToken: localStorage.getItem('refreshToken') || null
  }
}
const getters = {
  isLogin (state) {
    if (state.token !== null) {
      return true
    } else {
      return false
    }
  }
}
const actions = {
  onRegister (context, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}/users/register`, payload)
        .then(result => {
          resolve(result.data.message)
        })
        .catch(err => {
          reject(err.message)
        })
    })
  },
  onLogin (context, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}/users/login`, {
          email: payload.loginEmail,
          password: payload.loginPass
        })
        .then(result => {
          console.log(result)
          localStorage.setItem('id', result.data.data.id)
          localStorage.setItem('username', result.data.data.username)
          localStorage.setItem('token', result.data.data.token)
          localStorage.setItem('refreshToken', result.data.data.refreshToken)
          resolve(result.data.message)
        })
        .catch(err => {
          reject(err.message)
        })
    })
  },
  onLogout (context, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}/users/logout/${payload}`)
        .then(result => {
          localStorage.removeItem('id')
          localStorage.removeItem('username')
          localStorage.removeItem('token')
          localStorage.removeItem('refreshToken')
          localStorage.removeItem('receiver')
          resolve(result)
        })
        .catch(err => {
          reject(err.message)
        })
    })
  },
  onForgotPassword (context, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}/users/forgot`, payload)
        .then(result => {
          resolve(result.data.message)
        })
        .catch(err => reject(err.message))
    })
  },
  onResetPassword (context, payload) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}/users/resetPass/${payload.userkey}`, {
          password: payload.password
        })
        .then(result => {
          resolve(result)
        })
        .catch(err => reject(err.message))
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions
}
