import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Rank from '../views/Rank.vue'
import Answer from '../views/Answer.vue'
import Person from '@/components/person.vue'
import Society from '@/components/society.vue'
import Country from '@/components/country.vue'
import Thanks from '@/components/thanks.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/rank',
    name: 'Rank',
    component: Rank
  },
  {
    path: '/thanks/:grade',
    name: 'Thanks',
    component: Thanks
  },
  {
    path: '/answer',
    name: 'Answer',
    component:Answer,
    children:[
      {
        path:'person',
        component:Person
      },
      {
        path:'society',
        component:Society
      },
      {
        path:'country',
        component:Country
      }
    ]
  }
]
const router = new VueRouter({
  routes
})
export default router
