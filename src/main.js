import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './utils/axios'
import 'babel-polyfill'
import 'normalize.css/normalize.css'
import '@/assets/less/common.less'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/fontIcon/iconfont.css'

import { Carousel,
  CarouselItem,
  Button,
  Steps,
  Step,
  Table,
  TableColumn,
  RadioGroup,
  Radio,
  Dialog,
  Checkbox,
  Menu,
  Submenu,
  MenuItem,
  Breadcrumb,
  BreadcrumbItem,
  Input,
  Pagination
} from 'element-ui'

Vue.config.productionTip = false

Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(Button)
Vue.use(Steps)
Vue.use(Step)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(RadioGroup)
Vue.use(Radio)
Vue.use(Dialog)
Vue.use(Checkbox)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Input)
Vue.use(Pagination)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
