import photo from "@/pages/gallery/photo";

export const state = () => ({
  headerHeight: null,
  footerHeight: null,
  paddingTop: null,
  subListKey: 0,
  listKey: null,
  key: null,
  showList: true,
  bottom: '',
  pageId: '',
  object: [],
  hide: false
})
export const mutations = {
  SET_HEADER_HEIGHT(state, number) {
    state.headerHeight = number
  },
  SET_FOOTER_HEIGHT(state, number) {
    state.footerHeight = number
  },
  SET_PADDING_TOP(state, number) {
    state.paddingTop = number
  },
  SET_SUBLIST_KEY(state, number) {
    state.subListKey = number
  },
  SET_LIST_KEY(state, number) {
    state.listKey = number
  },
  SET_KEY(state, number) {
    state.key = number
  },
  SET_SHOW_LIST(state, boolean) {
    state.showList = boolean
  },
  SET_BOTTOM(state, item) {
    state.bottom = item
  },
  SET_PAGE_ID(state, item) {
    state.pageId = item
  },
  SET_OBJECT(state, item) {
    state.object = item
  },
  SET_HIDE(state, boolean) {
    state.object = boolean
  }
}
export const actions = {
  async setHeaderHeight ({ commit }, item) {
    await commit('SET_HEADER_HEIGHT', item)
  },
  async setFooterHeight ({ commit }, item) {
    await commit('SET_FOOTER_HEIGHT', item)
  },
  async setPaddingTop ({ commit }, key) {
    await commit('SET_PADDING_TOP', key)
  },
  async setSubListKey ({ commit }, key) {
    await commit('SET_SUBLIST_KEY', key)
  },
  async setListKey ({ commit }, key) {
    await commit('SET_LIST_KEY', key)
  },
  async setKey ({ commit }, key) {
    await commit('SET_KEY', key)
  },
  async setShowList ({ commit }, boolean) {
    await commit('SET_SHOW_LIST', boolean)
  },
  async setBottom ({ commit }, item) {
    await commit('SET_BOTTOM', item)
  },
  async setPageId ({ commit }, item) {
    await commit('SET_PAGE_ID', item)
  },
  async setObject ({ commit }, item) {
    await commit('SET_OBJECT', item)
  },
  async setHide ({ commit }, boolean) {
    await commit('SET_HIDE', boolean)
  },

}
