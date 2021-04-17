export const actions = {
    async nuxtServerInit({ commit, dispatch }, { app }) {
        const token = app.$cookies.get("token");
        if (token) {
            // console.log("nuxtServerInit: token:" + token);
            commit("user/SET_TOKEN", token);
            await dispatch('user/getInfo')
        }
    }
};