
import Home from '../views/pages/home';
import Menu from '../views/pages/menu';
import Simulation from '../views/pages/simulation';
import ManagerTeam from '../views/pages/managerteam';
import Configuration from '../views/pages/configuration';
//import Login from '../views/auth/login';
//import Register from '../views/auth/register';
//import ForgetPassword from '../views/auth/forgetpassword';
//import ConfirmEmail from '../views/auth/confirmemail';

export const Screens = [
    {
        component: Home,
        route: 'Home',
        params: {},
        icon: '',
        tabBar: false,
        default: true
    },
    {
        component: Menu,
        route: 'Menu',
        params: {},
        icon: '',
        tabBar: false
    },
    {
        component: Simulation,
        route: 'Simulation',
        params: {},
        icon: '',
        tabBar: false
    },
    {
        component: ManagerTeam,
        route: 'ManagerTeam',
        params: {},
        icon: '',
        tabBar: false
    },
    {
        component: Configuration,
        route: 'Configuration',
        params: {},
        icon: '',
        tabBar: false
    }
];


//export const AuthScreens = [
//    {
//        component: Login,
//        route: 'Login',
//        params: {}
//    },
//    {
//        component: Register,
//        route: 'Register',
//        params: {}
//    },
//    {
//        component: ForgetPassword,
//        route: 'ForgetPassword',
//        params: {}
//    },
//    {
//        component: ConfirmEmail,
//        route: 'ConfirmEmail',
//        params: {}
//    },
//];
