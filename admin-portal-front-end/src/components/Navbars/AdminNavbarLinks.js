import React, { useEffect } from 'react';
import classNames from 'classnames';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Hidden from '@material-ui/core/Hidden';
import Poppers from '@material-ui/core/Popper';
import Divider from '@material-ui/core/Divider';
// @material-ui/icons
import Person from '@material-ui/icons/Person';
import Notifications from '@material-ui/icons/Notifications';
import Button from 'components/CustomButtons/Button.js';
import styles from 'assets/jss/material-dashboard-react/components/headerLinksStyle.js';

import { connect } from 'react-redux';
import { logoutHandler } from 'feature/Auth/Signin/actions.js';
import { Link } from 'react-router-dom';
import { markNotificationSeenRequest, notificationFetchRequest } from '../../feature/Cabinet/Notifications/actions';
import PropTypes from 'prop-types';

const useStyles = makeStyles(styles);

function AdminNavbarLinks({logoutHandler, notificationFetchRequest, notifications, history, markNotificationSeenRequest}) {
    const classes = useStyles();
    const [openNotification, setOpenNotification] = React.useState(null);
    const [openProfile, setOpenProfile] = React.useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            notificationFetchRequest();
        }, 5000);
        return () => clearInterval(interval);
    }, [notificationFetchRequest]);

    const handleClickNotification = event => {
        if (openNotification && openNotification.contains(event.target)) {
            setOpenNotification(null);
        } else {
            setOpenNotification(event.currentTarget);
        }
    };
    const handleCloseNotification = () => {
        setOpenNotification(null);
    };

    const handleCloseNotificationForItem = (id) => {
        markNotificationSeenRequest(id);
        setOpenNotification(null);
        history.push('/cabinet/notifications');
    };

    const handleClickProfile = event => {
        if (openProfile && openProfile.contains(event.target)) {
            setOpenProfile(null);
        } else {
            setOpenProfile(event.currentTarget);
        }
    };
    const handleCloseProfile = () => {
        setOpenProfile(null);
    }

    return (
        <div>
            <div className={classes.manager}>
                <Button
                    color={window.innerWidth > 959 ? 'transparent' : 'white'}
                    justIcon={window.innerWidth > 959}
                    simple={!(window.innerWidth > 959)}
                    aria-owns={openNotification ? 'notification-menu-list-grow' : null}
                    aria-haspopup="true"
                    onClick={handleClickNotification}
                    className={classes.buttonLink}
                >
                    <Notifications className={classes.icons}/>
                    <span className={classes.notifications}>
                        {
                            notifications && !!notifications.length
                                ? notifications.filter(item => !item.seen).length : 0
                        }
                    </span>
                    <Hidden mdUp implementation="css">
                        <p onClick={handleCloseNotification} className={classes.linkText}>
                            Notification
                        </p>
                    </Hidden>
                </Button>
                <Poppers
                    open={Boolean(openNotification)}
                    anchorEl={openNotification}
                    transition
                    disablePortal
                    className={
                        classNames({[classes.popperClose]: !openNotification}) +
                        ' ' +
                        classes.popperNav
                    }
                >
                    {({TransitionProps, placement}) => (
                        <Grow
                            {...TransitionProps}
                            id="notification-menu-list-grow"
                            style={{
                                transformOrigin:
                                    placement === 'bottom' ? 'center top' : 'center bottom'
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleCloseNotification}>
                                    <MenuList role="menu">
                                        {notifications && !!notifications.length && (
                                            notifications.filter(item => !item.seen).map(notification => (
                                                <MenuItem
                                                    key={notification._id}
                                                    onClick={() => handleCloseNotificationForItem(notification._id)}
                                                    className={classes.dropdownItem}
                                                >
                                                    You have new profile request from: {notification.userName}
                                                </MenuItem>
                                            ))
                                        )}
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Poppers>
            </div>
            <div className={classes.manager}>
                <Button
                    color={window.innerWidth > 959 ? 'transparent' : 'white'}
                    justIcon={window.innerWidth > 959}
                    simple={!(window.innerWidth > 959)}
                    aria-owns={openProfile ? 'profile-menu-list-grow' : null}
                    aria-haspopup="true"
                    onClick={handleClickProfile}
                    className={classes.buttonLink}
                >
                    <Person className={classes.icons}/>
                    <Hidden mdUp implementation="css">
                        <p className={classes.linkText}>Profile</p>
                    </Hidden>
                </Button>
                <Poppers
                    open={Boolean(openProfile)}
                    anchorEl={openProfile}
                    transition
                    disablePortal
                    className={
                        classNames({[classes.popperClose]: !openProfile}) +
                        ' ' +
                        classes.popperNav
                    }
                >
                    {({TransitionProps, placement}) => (
                        <Grow
                            {...TransitionProps}
                            id="profile-menu-list-grow"
                            style={{
                                transformOrigin:
                                    placement === 'bottom' ? 'center top' : 'center bottom'
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleCloseProfile}>
                                    <MenuList role="menu">
                                        <MenuItem
                                            onClick={handleCloseProfile}
                                            className={classes.dropdownItem}
                                        >
                                            <Link to="/cabinet/dashboard">Profile</Link>
                                        </MenuItem>
                                        <Divider light/>
                                        <MenuItem
                                            onClick={logoutHandler}
                                            className={classes.dropdownItem}
                                        >
                                            Logout
                                        </MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Poppers>
            </div>
        </div>
    );
}

AdminNavbarLinks.propTypes = {
    history: PropTypes.object,
    notifications: PropTypes.array,
    logoutHandler: PropTypes.func.isRequired,
    notificationFetchRequest: PropTypes.func.isRequired,
    markNotificationSeenRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    notifications: state.cabinet.notification.data,
});

export default connect(mapStateToProps, {logoutHandler, notificationFetchRequest, markNotificationSeenRequest})(AdminNavbarLinks);
