const state = {
  dialogVisible: false,
  dialogImageUrl: null,
  dialogUrlList: [],
  accessMenu: null
}

const mutations = {
  // image zoom out div
  VISIBLEDIALOG(state, payload) {
      state.dialogVisible = true;
      state.dialogImageUrl = payload.url;
      state.dialogUrlList = payload.urlList ? payload.urlList : [];
  },
  UNVISIBLEDIALOG(state) {
      state.dialogVisible = false;
      state.dialogImageUrl = null;
      state.dialogUrlList = [];
  },
  // access pages list for login user
  SETACCESSMENU(state, payload) {
      state.accessMenu = payload.accessMenu;
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    commit('INCREMENT_MAIN_COUNTER')
  },
  unvisibledialog ({commit})  {
      commit('UNVISIBLEDIALOG')
  },
  visibledialog ({commit}, msg) {
      commit('VISIBLEDIALOG', msg)
  },
  setaccessmenu ({commit}, msg)  {
    commit('SETACCESSMENU', msg)
  }
}

const getters = {
    getdialogImageUrl(state) {
        return state.dialogImageUrl
    },
    getdialogVisible(state) {
        return state.dialogVisible;
    },
    etdialogImageUrl(state) {
        return state.dialogImageUrl;
    },
    getdialogImageUrlList(state) {
        return state.dialogUrlList;
    },
    setAccessMenu(state) {
        return state.accessMenu;
    }
}

export default {
  state,
  mutations,
  actions,
  getters
}
