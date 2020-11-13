import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import { Toast, Lazyload, Form, Cell, CellGroup, Field, Icon, Button, RadioGroup, Radio, Popup, Area,Step,Steps,Loading,ActionSheet,Overlay,Dialog , Picker} from 'vant';
import 'normalize.css/normalize.css';
import './styles/iconfont/iconfont.css';
// 导入toast css
import VueJsonp from 'vue-jsonp';
import VConsole from 'vconsole';

Vue.use(Toast)
    .use(Lazyload)
    .use(Popup)
    .use(Area)
    .use(Form)
    .use(Cell)
    .use(CellGroup)
    .use(Field)
    .use(Icon)
    .use(Button)
    .use(RadioGroup)
    .use(Radio)
    .use(VueJsonp)
    .use(Overlay)
    .use(Loading)
    .use(Step)
    .use(Steps)
    .use(ActionSheet)
    .use(Dialog)
    .use(Picker);

if (process.env.VUE_APP_IS_DEBUG === 'true') {
    new VConsole();
}

// Vue.filter('changeDateFormat', function(timestr) {
//     if (timestr && timestr.indexOf('-' != -1)) {
//         return timestr.replace(/-/g, '.');
//     }
// });

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');