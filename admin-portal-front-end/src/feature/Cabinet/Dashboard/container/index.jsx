import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { requestsFetchRequest } from '../../Requests/actions';
import GridItem from '../../../../components/Grid/GridItem';
import Card from '../../../../components/Card/Card';
import CardHeader from '../../../../components/Card/CardHeader';
import CardIcon from '../../../../components/Card/CardIcon';
import Icon from '@material-ui/core/Icon';
import CardFooter from '../../../../components/Card/CardFooter';
import Store from '@material-ui/icons/Store';
import Accessibility from '@material-ui/icons/Accessibility';
import GridContainer from '../../../../components/Grid/GridContainer';

import styles from 'assets/jss/material-dashboard-react/views/dashboardStyle.js';
import { ProfileStatuses } from '../../../../constants';

const useStyles = makeStyles(styles);

export const Dashboard = (props) => {
    const classes = useStyles();

    useEffect(() => {
        props.requestsFetchRequest();
        // eslint-disable-next-line
    }, [props.requestsFetchRequest]);

    const getRequestsCountByStatus = (status) => {
        if (props.requests && !!props.requests.length) {
            if(!!status) {
                const length = props.requests.filter(item => item.status === status).length;
                return !!length ? length : 0;
            } else {
                return props.requests.length;
            }
        } else {
            return 0;
        }
    }

    return (
        <Container>
            <GridContainer>
                <GridItem xs={12} sm={6} md={4}>
                    <Card>
                        <CardHeader color="info" stats icon>
                            <CardIcon color="info">
                                <Accessibility/>
                            </CardIcon>
                            <p className={classes.cardCategory}>Total Requests</p>
                            <h3 className={classes.cardTitle}>{getRequestsCountByStatus()}</h3>
                        </CardHeader>
                        <CardFooter stats>
                            <div className={classes.stats}>
                                Total requests by users
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={4}>
                    <Card>
                        <CardHeader color="success" stats icon>
                            <CardIcon color="success">
                                <Store/>
                            </CardIcon>
                            <p className={classes.cardCategory}>Approved</p>
                            <h3 className={classes.cardTitle}>{getRequestsCountByStatus(ProfileStatuses.APPROVED)}</h3>
                        </CardHeader>
                        <CardFooter stats>
                            <div className={classes.stats}>
                                Approved forms by admin
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>
                <GridItem xs={12} sm={6} md={4}>
                    <Card>
                        <CardHeader color="danger" stats icon>
                            <CardIcon color="danger">
                                <Icon>info_outline</Icon>
                            </CardIcon>
                            <p className={classes.cardCategory}>Rejected</p>
                            <h3 className={classes.cardTitle}>{getRequestsCountByStatus(ProfileStatuses.REJECTED)}</h3>
                        </CardHeader>
                        <CardFooter stats>
                            <div className={classes.stats}>
                                Rejected forms by admin
                            </div>
                        </CardFooter>
                    </Card>
                </GridItem>
            </GridContainer>
        </Container>
    );
};

Dashboard.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    requests: PropTypes.array,
};

const mapStateToProps = (state) => ({
    isLoading: state.cabinet.users.isLoading,
    requests: state.cabinet.requests.data,
});

const mapDispatchToProps = {
    requestsFetchRequest
};

export const DashboardContainer = withRouter(
    connect(mapStateToProps, mapDispatchToProps)(Dashboard)
);
