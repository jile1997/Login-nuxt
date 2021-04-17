export const state = () => {
    return {
        visible: false,
        unread: false,
        unreadNum: 0
    }
}


export const mutations = {
    SET_MODAL(state, isopen) {
        state.visible = isopen
    },
    SET_UNNUM(state, num) {
        state.unreadNum = num
    },
    SET_ISUN(state, isunread) {
        state.unread = isunread
    }


}

export const actions = {


    async getUnreadnum({ commit }) {

        let res = await this.$axios.get('/public/unread')
        let unreply = res.reply
        if (unreply > 0) {
            commit('SET_ISUN', true)
            commit('SET_UNNUM', unreply)
        }

    },



}