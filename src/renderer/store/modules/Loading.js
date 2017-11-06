const state = {
  isShowLoading: false
}

const mutations = {
  SHOWLOADING (state) {
      state.isShowLoading = true;
  },
  HIDELOADING (state) {
      state.isShowLoading = false;
  }
}

const actions = {
  showLoading ({ commit }) {
    // do something async
    commit('SHOWLOADING')
  },
  hideLoading ({ commit }) {
    // do something async
    commit('HIDELOADING')
  }
}

const getters = {
    getIsLoading(state) {
        return state.isShowLoading
    }
}

export default {
  state,
  mutations,
  actions,
  getters
}