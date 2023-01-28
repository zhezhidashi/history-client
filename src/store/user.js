import Cookie from 'js-cookie'
export default {
    state: {
        token: undefined
    },
    mutations: {
        setToken(state, val) {
            state.token = val
            Cookie.set('token', val)
        },
        clearToken(state) {
            state.token = undefined
            Cookie.remove('token')
        },
        getToken(state) {
            state.token = state.token || Cookie.get("token")
        }
    }
}