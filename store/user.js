export const state = () => {
    return {
        nickname: '小明',
        avatar: null,
        token: '',
        signature: '',
        birthdays: ''
    }
}


export const mutations = {
    SET_TOKEN(state, token) {
        state.token = token
    },
    SET_INFO(state, info) {
        state.nickname = info.nickname
        state.avatar = info.avatar
        state.signature = info.signature
        state.birthdays = info.birthdays
    },
    RESET_STATE: (state) => {
        Object.assign(state, {
            nickname: '',
            avatar: '',
            token: '',
            signature: "",
            birthdays: ""
        })
    },


}

export const actions = {


    async login({ commit }, model) {
        let { email, password } = model
        let res = await this.$axios.post('/user/login', { email, password })
        let { token } = res
        commit("SET_TOKEN", token)
        this.$cookies.set('token', token)
        return res
    },

    async getInfo({ commit, state }) {
        let res = await this.$axios.get('/user/info')
            // console.log(res)
        commit('SET_INFO', res.data)
        return res
    },


    // user logout
    logout({ commit, state }) {
        commit('RESET_STATE')
        this.$cookies.remove('token')
    },


}