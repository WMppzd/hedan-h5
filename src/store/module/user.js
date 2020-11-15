const user = {
    state: {
        token: '',
        userinfo: null, //用户信息
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_USERINFO(state,data){
            window.localStorage.setItem('userinfo', JSON.stringify(data));  //本地存储只能存字符串
            state.userinfo = JSON.parse(window.localStorage.getItem('userinfo'));
        },
    },
    getters: {
        token: state => state.token,
        userInfo: state => state.userinfo,
    }
};

export default user;
