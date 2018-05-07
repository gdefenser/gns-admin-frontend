//const NotFound = () => import(/* webpackChunkName: "group-pub" */'../components/page/NotFound.vue')
//const App = () => import(/* webpackChunkName: "group-pub" */'../App.vue')
//const Dashboard = () => import(/* webpackChunkName: "group-pub" */'../pages/Dashboard.vue')
import NotFound from '../components/page/NotFound'
import App from '../App'
import Dashboard from '../pages/Dashboard'
// Routes
const routes = [

  {
    path: '',
    component: App,
    children: [
      { path: '/dashboard', name: 'Dashboard', component: Dashboard },
      { path: '/', name: 'MainPage', component: Dashboard },

     
    ]
  },
  { path: '*', component: NotFound }
]


export default routes

