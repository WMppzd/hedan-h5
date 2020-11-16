import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';
// import * as Cookies from 'js-cookie';
import createLogger from 'vuex/dist/logger';
Vue.use(Vuex);

// 自动导入module下所有模块
const modules = (modulesFiles => {
    return modulesFiles.keys().reduce((modules, modulePath) => {
        const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
        const value = modulesFiles(modulePath);
        modules[moduleName] = value.default;
        return modules;
    }, {});
})(require.context('./module', false, /\.js$/));

const debug = process.env.NODE_ENV !== 'production';

const createPersisted = createPersistedState({
    key: 'hedan',
    reducer(val) {
        return {
            user: val.user
        };
    }
});

const store = new Vuex.Store({
    modules,
    plugins: debug ? [createLogger(), createPersisted] : [createPersisted]
});

export default store;
