import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueRouter from "vue-router";

import Vant from 'vant';
import 'vant/lib/index.css';


import {
  Progress,
  Uploader,
  Toast
} from 'vant';
Vue.use(Toast);
Vue.use(Uploader);
Vue.use(Progress);
Vue.use(VueRouter);
Vue.use(Progress);
Vue.use(VueRouter);




// if (process.env.NODE_ENV === 'production') {
//   /*第二层if，根据.env文件中的VUE_APP_FLAG判断是生产环境还是测试环境*/
//   if (process.env.VUE_APP_FLAG === 'pro') {
//     //production 生产环境
//     axios.defaults.baseURL = 'http://test-api.exingtech.com/'; //路径

//   } else {
//     //test 测试环境
//     axios.defaults.baseURL = 'http://test-api.exingtech.com/'; //路径
//   }
// } else { //dev 开发环境 axios.defaults.baseURL = 'http://192.168.0.152:8102';//路径

// }

// Vue.config.productionTip = false


// var charts = axios.create({
//   baseURL: 'http: //test.exingtech.com'
// })
// var canvas = axios.create({
//   baseURL: ''
// })

// Vue.prototype.$canvas = canvas;
// Vue.prototype.$charts = charts;

Vue.prototype.$axios = axios


import HelloWorld from './components/HelloWorld.vue'
import chart from './components/chart.vue'

const router = new VueRouter({
  mode: "hash",
  routes: [{
      path: "/chart",
      name: "index",
      component: chart
    },
    {
      path: "/canvas",
      name: "index",
      component: HelloWorld
    },
  ]
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')