import Dashboard from './views/Dashboard'
import Systems from './views/Systems'
import SystemCreate from './views/Systems/SystemCreate'
import HoisterDetail from './views/Hoister'
import hoisterProfileSettings from './views/Hoister/ProfileSettings'
import HoisterStateSettings from './views/Hoister/StateSettings'
import HoisterCommandSettings from './views/Hoister/CommandSettings'

export default [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/systems',
    name: 'systems',
    component: Systems,
    children: [
      {
        path: 'create',
        name: 'system create',
        component: SystemCreate
      }
    ]
  },
  {
    path: '/systems/hoisters/:hoister_id',
    name: 'hoister detail',
    props: true,
    component: HoisterDetail,
    children: [
      {
        path: 'profile',
        alias: '',
        name: 'hoister profile settings',
        component: hoisterProfileSettings
      },
      {
        path: 'states',
        name: 'hoister state settings',
        component: HoisterStateSettings
      },
      {
        path: 'commands',
        name: 'hoister command settings',
        component: HoisterCommandSettings
      }
    ]
  }
]
