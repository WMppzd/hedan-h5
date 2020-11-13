const user = {
    state: {
        token: '',
        userInfo: null, //用户信息
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token;
        },
        SET_LOGOUT: state => {
            state.token = '';
            state.userInfo = null;
        },
        SET_STUDENTINFO: (state, data) => {
            state.studentInfo = data;
        },
    },
    actions: {
        // getUserInfo({ commit, dispatch, getters, state }) {
        //     return new Promise((resolve, reject) => {
        //         getUserInfo()
        //             .then(response => {
        //                 commit('SET_USER', response);
        //                 commit('filter/SET_DEFAULT', 0, {root: true})
                        
        //                 if(getters.wxOpenId){
        //                     dispatch('updateGrant');  //绑定openid 和 当前登录用户关系
        //                 }else{
        //                     console.log('没有openid')
        //                 }
                        
        //                 if(state.staffShareCode){  //本地存有推销人员code 调取绑定关系接口
        //                     dispatch('bindDistributionScan', {
        //                         staff_share_code: state.staffShareCode,
        //                         openid: getters.wxOpenId ? getters.wxOpenId : '',
        //                     })
        //                 }else{
        //                     console.log('没有推销员工code')
        //                 }

        //                 resolve(response);
        //             })
        //             .catch(error => {
        //                 reject(error);
        //             });
        //     });
        // },
        // logOut({ commit }) {
        //     return new Promise((resolve, reject) => {
        //         logOut()
        //             .then(response => {
        //                 if (response) {
        //                     commit('SET_LOGOUT');
        //                     commit('filter/SET_DEFAULT', 0, {root: true})
        //                     resolve();
        //                 } else {
        //                     reject();
        //                 }
        //             })
        //             .catch(() => {
        //                 reject();
        //             });
        //     });
        // }
    },
    getters: {
        token: state => state.token,
        userInfo: state => state.userInfo,
    }
};

export default user;
