import React from 'react';
import { Loader } from '../../../Common/Loader';
import { Table } from 'antd';
import style from './index.module.scss';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import config from 'config/app';
import { format } from 'date-fns';
import { ProfileStatusesVisualization } from '../../../../constants';

export const IndividualHistory = (props) => {
    const renderLink = (text) => {
        return (
            <GridContainer>
                {text && text.length && (
                    <>
                        {text.map((link, index) => (
                            <GridItem key={index}>
                                <a
                                    href={`${config.API_BASE_URL}/download?location=${link}`}
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

    const renderAdminsList = (admins) => {
        if (!admins || (admins && !admins.length)) {
            return null;
        }

        return (
            <GridContainer>
                <GridItem>
                    {admins.join('; ')}
                </GridItem>
            </GridContainer>
        );
    };

    const renderStatus = (status) => {
        if (!status) {
            return null
        }

        return (
            <GridContainer>
                <GridItem>
                    {ProfileStatusesVisualization[status]}
                </GridItem>
            </GridContainer>
        );
    };

    const renderDate = (date) => {
        if (!date) {
            return null;
        }

        return (
            <GridContainer>
                <GridItem>
                    {format(new Date(date), 'MM-dd-yyyy HH:mm:ss')}
                </GridItem>
            </GridContainer>
        )
    }

    const columns = [
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: renderDate
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
        },
        {
            title: 'LastName',
            dataIndex: 'lastName',
            key: 'lastName',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Admins',
            dataIndex: 'admins',
            key: 'admins',
            render: renderAdminsList
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: renderStatus
        },
        {
            title: 'Reject Reason',
            dataIndex: 'rejectReason',
            key: 'rejectReason'
        },
        {
            title: 'Passport',
            dataIndex: 'passportFilePath',
            key: 'passportFilePath',
            render: renderLink,
        },
        {
            title: 'Driving License',
            dataIndex: 'drivingLicenseFilePath',
            key: 'drivingLicenseFilePath',
            render: renderLink,
        },
        {
            title: 'Others',
            dataIndex: 'otherFilePath',
            key: 'otherFilePath',
            render: renderLink,
        },
    ];

    return (
        <div>
            <h1>History ({props.history.length})</h1>
            <div className={style.usersList}>
                <Loader isLoading={props.isLoading}>
                    <Table columns={columns} dataSource={props.history} rowKey="_id"/>
                </Loader>
            </div>
        </div>
    );
};
