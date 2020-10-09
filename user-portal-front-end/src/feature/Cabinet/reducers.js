import { combineReducers } from 'redux';

import { usersReducer as users } from './Users';
import { historyReducer as history } from './History';
import { notificationReducer as notification } from './Notifications';
import { profileReducer as profile, fileReducer as files } from './Profile';
import { changePasswordReducer as changePassword } from './ChangePassword';

export const reducers = combineReducers({
    users, history, changePassword, profile, files, notification
});
