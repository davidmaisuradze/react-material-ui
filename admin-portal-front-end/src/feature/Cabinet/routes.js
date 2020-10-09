import { RequestsContainer } from './Requests';
import { ChangePasswordContainer } from './ChangePassword';
import { DashboardContainer } from './Dashboard';
import { NotificationsContainer } from './Notifications';
import Dashboard from '@material-ui/icons/Dashboard';
import History from '@material-ui/icons/History';
import Settings from '@material-ui/icons/Settings';
import Notifications from '@material-ui/icons/Notifications';

const routes = [
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardContainer,
        layout: '/cabinet',
        icon: Dashboard,
        rtlName: '',
    },
    {
        path: '/requests',
        name: 'Requests',
        component: RequestsContainer,
        layout: '/cabinet',
        icon: History,
        rtlName: '',
    },
    {
        path: '/notifications',
        name: 'Notifications',
        component: NotificationsContainer,
        layout: '/cabinet',
        icon: Notifications,
        rtlName: ''
    },
    {
        path: '/settigns',
        name: 'Settings',
        component: ChangePasswordContainer,
        layout: '/cabinet',
        icon: Settings,
        rtlName: '',
    }
];

export default routes;
