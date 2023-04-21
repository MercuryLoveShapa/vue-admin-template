import Vue from 'vue'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.scss' // global css
import App from './App'
import store from './store'
import router from './router'
import '@/icons' // icon
// import '@/permission' // permission control
import  './utils/axios' //引入axios
import axios from 'axios'




// axios拦截器

// 添加请求拦截器
axios.interceptors.request.use(config => {
    // 从 localStorage 中获取 token
    const token = localStorage.getItem('token')
    // 如果 token 存在，则添加到请求头中
    console.log(token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

// // 发送请求
// instance.get('/api/user')
//   .then(response => {
//     console.log(response.data)
//   })
//   .catch(error => {
//     console.log(error)
//   })


// 导航守卫(登录跳转)
router.beforeEach((to,from,next)=> {
  const  token = localStorage.getItem('token');
  if(!token && to.name !== 'login'){
    next({ name:'login'})
  }else if(token && to.name === 'login'){
    next({name:'Dashboard'})
  }else{
    next()
  }
})

// 如果想要中文版 element-ui，按如下方式声明
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
