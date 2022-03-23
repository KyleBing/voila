import { createStore } from 'vuex'

export default createStore({
  state: {
    insets: {
      width: 0,
      height: 0
    },
    lastZIndex: 1 // 最后一个 FloatingPanel 的 zIndex，每点一次，+1
  },
  mutations: {
    SET_INSETS(state, payload){
      state.insets = payload
    },
    SET_LATEST_Z_INDEX(state, payload){
      state.lastZIndex = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
