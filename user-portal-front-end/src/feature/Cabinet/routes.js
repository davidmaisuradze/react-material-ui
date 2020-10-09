import { HistoryContainer } from './History';
import { ChangePasswordContainer } from './ChangePassword';
import { ProfileContainer } from './Profile';
import { NotificationsContainer } from './Notifications';
import Person from '@material-ui/icons/Person';
import History from '@material-ui/icons/History';
import Settings from '@material-ui/icons/Settings';
import Notifications from '@material-ui/icons/Notifications';

const routes = [
    {
        path: '/profile',
        name: 'Profile',
        component: ProfileContainer,
        layout: '/cabinet',
        icon: Person,
        rtlName: '',
    },
    {
        path: '/history',
        name: 'History',
        component: HistoryContainer,
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
