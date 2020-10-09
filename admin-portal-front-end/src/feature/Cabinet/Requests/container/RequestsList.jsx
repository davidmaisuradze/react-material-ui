import React from 'react';
import { Loader } from '../../../Common/Loader';
import style from './index.module.scss';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import config from 'config/app';
import { ProfileStatuses, ProfileStatusesVisualization } from '../../../../constants';
import Button from '@material-ui/core/Button';
import MaterialTable from 'material-table';
import useStyles from './styles';

export const RequestsList = (props) => {
    const classes = useStyles();
    const renderLink = (text) => {
        return (
            <GridContainer>
                {text && text.length && (
                    <>
                        {text.map((link, index) => (
                            <GridItem key={index}>
                                <a
                                    href={`${config.API_BASE_URL}/admin/user-profile/download?location=${link}`}
                                    target="_blank" rel="noopener noreferrer"
                                    download
                                >
                                    Download
                                </a>
                            </GridItem>
                        ))}
                    </>
                )}
            </GridContainer>
        );
    };

    const renderStatus = (data) => {
        if (!data) {
            return null
        }

        return (
            <GridContainer>
                <GridItem>
                    {ProfileStatusesVisualization[data.status]}
                </GridItem>
            </GridContainer>
        );
    };

    const renderActions = (data) => {
        if (!data) {
            return null
        }

        return (
            <GridContainer>
                {data.status && data.status === ProfileStatuses.PENDING_APPROVAL ? (
                    <>
                        <GridItem key='approve'>
                            <Button color="primary"
                                    onClick={() => props.handleApproveClicked(data._id)}
                            >
                                Approve
                            </Button>
                        </GridItem>
                        <GridItem key='reject'>
                            <Button color="secondary"
                                    onClick={() => props.handleRejectClicked(data._id)}
                            >
                                Reject
                            </Button>
                        </GridItem>
                    </>
                ) : (
                    data.status === ProfileStatuses.APPROVED ? (
                        <GridItem key='approve-disabled'>
                            <Button className={classes.btnGreen}>
                                Approved
                            </Button>
                        </GridItem>
                    ) : (
                        <GridItem key='approve-disabled'>
                            <Button color="secondary">
                                Rejected
                            </Button>
                        </GridItem>
                    )
                )}
            </GridContainer>
        );
    };

    const columns = [
        {
            title: 'Created At',
            field: 'createdAt',
            key: 'createdAt',
            type: 'datetime'
        },
        {
            title: 'First Name',
            field: 'firstName',
            key: 'firstName',
        },
        {
            title: 'LastName',
            field: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Address',
            field: 'address',
            key: 'address',
        },
        {
            title: 'Gender',
            field: 'gender',
            key: 'gender',
        },
        {
            title: 'Status',
            field: 'status',
            key: 'status',
            render: renderStatus
        },
        {
            title: 'Passport',
            field: 'passportFilePath',
            key: 'passportFilePath',
            render: renderLink,
        },
        {
            title: 'Driving License',
            field: 'drivingLicenseFilePath',
            key: 'drivingLicenseFilePath',
            render: renderLink,
        },
        {
            title: 'Others',
            field: 'otherFilePath',
            key: 'otherFilePath',
            render: renderLink,
        },
        {
            title: 'Nothing',
            field: 'nothingFilePath',
            key: 'nothingFilePath',
            render: renderLink,
        },
        {
            title: 'For-Assignment',
            field: 'assignmentFilePath',
            key: 'assignementFilePath',
            render: renderLink,
        },
        {
            title: 'Another',
            field: 'anotherFilePath',
            key: 'anotherFilePath',
            render: renderLink,
        },
        {
            title: 'Actions',
            render: renderActions,
        },
    ];

    return (
        <div>
            <h1>Requests ({props.requests.length})</h1>
            <div className={style.usersList}>
                <Loader isLoading={props.isLoading}>
                    <MaterialTable
                        columns={columns}
                        data={props.requests}
                        options={{
                            search: true
                        }}
                    />
                </Loader>
            </div>
        </div>
    );
};
