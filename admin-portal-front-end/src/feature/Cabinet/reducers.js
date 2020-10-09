import { combineReducers } from 'redux';

import { usersReducer as users } from './Users';
import { requestsReducer as requests } from './Requests';
import { notificationReducer as notification } from './Notifications';
import { changePasswordReducer as changePassword } from './ChangePassword';

export const reducers = combineReducers({
    users, requests, changePassword, notification
});
