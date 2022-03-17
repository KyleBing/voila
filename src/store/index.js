import { createStore } from 'vuex'

export default createStore({
  state: {
    insets: {
      width: 0,
      height: 0
    }
  },
  mutations: {
    SET_INSETS(state, payload){
      state.insets = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
