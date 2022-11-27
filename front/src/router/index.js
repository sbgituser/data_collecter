import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import BookInfoInput from '../views/BookInfoInput.vue'
import BookTitleEditor from '../views/BookTitleEditor.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/book-info-input',
    name: 'BookInfoInput',
    component: BookInfoInput
  },
  {
    path: '/book-title-editor',
    name: 'BookTitleEditor',
    component: BookTitleEditor
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
