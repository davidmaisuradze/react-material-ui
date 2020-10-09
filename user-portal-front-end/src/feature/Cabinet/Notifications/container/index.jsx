import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { NotificationsList } from './NotificationsList';
import { markNotificationSeenRequest, notificationFetchRequest } from '../actions';

export const Notifications = (props) => {
    useEffect(() => {
        props.notificationFetchRequest();
        // eslint-disable-next-line
    }, [props.notificationFetchRequest]);


    const onHandleNotificationClick = (id) => {
        props.markNotificationSeenRequest(id);
        props.history.push('/cabinet/history');
    };

    return (
        <div>
            <NotificationsList notifications={props.notifications}
                               isLoading={props.isLoading}
                               handleNotificationClick={onHandleNotificationClick}
            />
        </div>
    );
};

Notifications.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    notifications: PropTypes.array,
    notificationFetchRequest: PropTypes.func.isRequired,
    markNotificationSeenRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    isLoading: state.cabinet.notification.isLoading,
    notifications: state.cabinet.notification.data,
});

export const NotificationsContainer = withRouter(
    connect(mapStateToProps, {notificationFetchRequest, markNotificationSeenRequest})(Notifications)
);
