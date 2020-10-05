import axios from 'axios'
import { url } from '../../helper/env'

const state = () => {
  return {
    detail: []
  }
}

const getters = {
  getDetail: (state) => state.detail
}

const mutations = {
  SET_DETAIL (state, payload) {
    state.detail = payload
  }
}

const actions = {
  // get detail data
  onDetail (context, payload) {
    return new Promise((resolve, reject) => {
      axios.get(`${url}/users/getDetail/${payload}`).then((response) => {
        context.commit('SET_DETAIL', response.data.data[0])
        resolve(response)
      }).catch((err) => reject(err))
    })
  },
  // update data user
  onUpdate (context, payload) {
    return new Promise((resolve, reject) => {
      axios.patch(`${url}/users/update/${payload.id}`, {
        name: payload.name,
        username: payload.username,
        phoneNumber: payload.phoneNumber,
        bio: payload.bio
      }).then((response) => {
        resolve(response)
      }).catch((err) => reject(err))
    })
  },
  updateImage (context, payload) {
    return new Promise((resolve, reject) => {
      const fd = new FormData()
      fd.append('image', payload.image)
      axios.patch(`${url}/users/update/${payload.id}`, fd).then((response) => {
        resolve(response)
      }).catch((err) => reject(err))
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
