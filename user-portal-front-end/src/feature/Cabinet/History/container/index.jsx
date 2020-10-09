import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { historyFetchRequest } from '../actions';
import { IndividualHistory } from './individualHistory';
import { NonIndividualHistory } from './nonIndividualHistory';

export const History = (props) => {
    const type = useSelector((state) => state.auth.signin.user.type);
    useEffect(() => {
        props.historyFetchRequest();
        // eslint-disable-next-line
    }, [props.historyFetchRequest]);

    return (
        <div>
            {type === 'INDIVIDUAL' ? (
                <IndividualHistory history={props.history} isLoading={props.isLoading}/>
            ) : (
                <NonIndividualHistory history={props.history} isLoading={props.isLoading}/>
            )}
        </div>
    );
};

History.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    history: PropTypes.array,
    historyFetchRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    isLoading: state.cabinet.history.isLoading,
    history: state.cabinet.history.data,
});

export const HistoryContainer = withRouter(
    connect(mapStateToProps, {historyFetchRequest})(History)
);
