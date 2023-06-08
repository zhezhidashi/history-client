import Cookie from 'js-cookie'
export default {
    state: {
        myToken: undefined
    },
    mutations: {
        setToken(state, val) {
            state.myToken = val
            Cookie.set('myToken', val)
        },
        clearToken(state) {
            state.myToken = undefined
            Cookie.remove('myToken')
        },
        getToken(state) {
            state.myToken = state.myToken || Cookie.get("myToken")
        }
    }
}