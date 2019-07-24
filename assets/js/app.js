// Vuex
const store = new Vuex.Store({
  state: {
    hasUserInfo: false,
    userInfo: {}
  },
  mutations: {
    update(state, payload) {
      state[payload.name] = payload.value
    }
  }
})
const Home = Vue.extend({
  template:document.querySelector('#tpl-home').innerHTML,
  data(){
    return{
      list:[
        {
          imgUrl:'http://h5.gc-app.com/91cnki/images/pmlc.jpg',
          title:'本科PMLC',
          price:'100',
          introduction:"专科、本科毕业论文定稿",
          href:""
        },
        {
          imgUrl:'http://h5.gc-app.com/91cnki/images/pmlc.jpg',
          title:'硕博VIP5.1',
          price:'100',
          introduction:"硕士、博士毕业论文定稿"
        },
        {
          imgUrl:'http://h5.gc-app.com/91cnki/images/pmlc.jpg',
          title:'期刊AMLC',
          price:'100',
          introduction:"发表期刊查重初稿"
        },
        {
          imgUrl:'http://h5.gc-app.com/91cnki/images/pmlc.jpg',
          title:'大分解',
          price:'100',
          introduction:"发表论文查重初稿"
        },
        {
          imgUrl:'http://h5.gc-app.com/91cnki/images/pmlc.jpg',
          title:'小分解',
          price:'100',
          introduction:"高校毕业论文初查必备"
        },
        {
          imgUrl:'http://h5.gc-app.com/91cnki/images/pmlc.jpg',
          title:'查看更多',
          price:'100',
          introduction:"查询更多品牌点这里(#^.^#)"
        },
      ]
    }
  },

})
// 定义 (路由) 组件。
const Index = Vue.extend({
  template: document.querySelector('#tpl-index').innerHTML,
  data() {
    return {
      
    }
  },
  computed: {
    ...Vuex.mapState(['userInfo', 'hasUserInfo'])
  },
  created() {},
  methods: {
    getUserInfo() {
      // 授权
      qihoo.Authorize('user_base_info', (code) => {
        if (code == 0) {
          // 获取用户信息
          qihoo.GetBaseUserInfo((code, res) => {
            if (code == 0) {
              this.$store.commit('update', {
                name: 'hasUserInfo',
                value: true
              })
              this.$store.commit('update', {
                name: 'userInfo',
                value: JSON.parse(res)
              })
            } else {
              // 获取用户信息失败
            }
          })
        } else {
          // 授权失败
        }
      })

    }
  }
})
const Intro = Vue.extend({
  template: document.querySelector('#tpl-intro').innerHTML,
})

// 定义路由
const routes = [
  {
    path: '/',
    component: Home
  },
  // {
  //   path: '/',
  //   component: Index
  // },
  {
    path: '/intro',
    component: Intro
  }
]

// 创建 router 实例
const router = new VueRouter({
  routes: routes
})

// 创建和挂载根实例。
const app = new Vue({
  store,
  router,
  watch: {
    $route(to, from) {
      switch (to.path) {
        case '/':
          // 切换小屏
          qihoo.SetScreenState(false, true)
          break;
        case '/intro':
          // 切换大屏
          qihoo.SetScreenState(true, true)
          break
      }
    }
  }
}).$mount('#app')