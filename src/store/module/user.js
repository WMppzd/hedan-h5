const user = {
    state: {
        token: '',
        list: '',
        userinfo: null, //用户信息
        base64:""
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_USERINFO(state, data) {
            window.localStorage.setItem('userinfo', JSON.stringify(data)); //本地存储只能存字符串
            state.userinfo = JSON.parse(window.localStorage.getItem('userinfo'));
        },
        SET_LIST(state, data) {
            state.list = data
        },
        SET_BASE(state, data) {
            state.base64 = data
        },
    },
    getters: {
        token: state => state.token,
        userInfo: state => state.userinfo,
        list: state => state.list
    }
};

export default user;
