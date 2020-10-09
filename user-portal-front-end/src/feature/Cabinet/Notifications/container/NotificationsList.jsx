import React, { useEffect } from 'react';
import GridItem from 'components/Grid/GridItem.js';
import GridContainer from 'components/Grid/GridContainer.js';
import SnackbarContent from 'components/Snackbar/SnackbarContent.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import useStyles from './styles';
import { ProfileStatuses } from '../../../../constants';
import Snackbar from '../../../../components/Snackbar/Snackbar';

export const NotificationsList = (props) => {
    const classes = useStyles();

    const test = (e) => {
        e.stopPropagation();
        console.log('test');
    }
    return (
        <Card>
            <CardBody>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                        {props.notifications && !!props.notifications.length && (
                            props.notifications.map(notification => (
                                <div key={notification._id}
                                     onClick={() => props.handleNotificationClick(notification._id)}
                                     className={classes.snackbarWrapper}
                                >
                                    <SnackbarContent
                                        message={
                                            `${!!notification.seen ? 'VIEWED -' : ''} ${notification.description}`
                                        }
                                        color={
                                            notification.status === ProfileStatuses.APPROVED
                                                ? 'success' : 'danger'
                                        }
                                    />
                                    <Snackbar
                                        place="tl"
                                        message={
                                            `${!!notification.seen ? 'VIEWED -' : ''} ${notification.description}`
                                        }
                                        color={
                                            notification.status === ProfileStatuses.APPROVED
                                                ? 'success' : 'danger'
                                        }
                                        closeNotification={test}
                                    />
                                </div>
                            ))
                        )}
                    </GridItem>
                </GridContainer>
            </CardBody>
        </Card>
    );
}
