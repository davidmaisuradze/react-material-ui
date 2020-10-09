import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';
import useStyles from './styles';
import checkoutFormModel from '../FormModal/FormModel';
import { SelectField } from '../../FormFields';
import { connect, useSelector } from 'react-redux';
import { adminUsersFetchRequest } from '../../../Users/actions';

const {formField} = checkoutFormModel;

const AdminsField = (props) => {
    const {admins} = formField;
    const {adminUsersData} = useSelector((state) => state.cabinet.users);
    const [adminsCorrectedList, setAdminsCorrectedList] = useState([]);

    useEffect(() => {
        if(adminUsersData && !!adminUsersData.length) {
            const adminsList = adminUsersData.map(item => ({
                value: item.email,
                label: item.email
            }));
            console.log(adminsList, 'log');
            setAdminsCorrectedList(adminsList);
        }
    }, [adminUsersData]);

    return (
        <SelectField
            className={props.className}
            name={admins.name}
            label={admins.label}
            data={adminsCorrectedList}
            fullWidth
            multiple={true}
        />
    );
};

const ProductDetails = (props) => {
    const classes = useStyles();
    console.log(props, '-=--==-=-=-=-=-=-==- at details');

    useEffect(() => {
        props.adminUsersFetchRequest();
        // eslint-disable-next-line
    }, [props.adminUsersFetchRequest]);

    return (
        <List disablePadding>
            {/* {products.map(product => (
        <ListItem className={classes.listItem} key={product.name}>
          <ListItemText primary={product.name} secondary={product.desc} />
          <Typography variant="body2">{product.price}</Typography>
        </ListItem>
      ))} */}
            <ListItem className={classes.listItem}>
                <ListItemText primary="Full Name"/>
                <Typography
                    gutterBottom
                >{`${props.values.firstName} ${props.values.lastName}`}</Typography>
                <br/>
            </ListItem>
            <ListItem className={classes.listItem}>
                <ListItemText primary="Address"/>
                <Typography gutterBottom>{`${props.values.address}`}</Typography>
                <br/>
            </ListItem>
            <ListItem className={classes.listItem}>
                <ListItemText primary="City"/>
                <Typography gutterBottom>{`${props.values.city}`}</Typography>
                <br/>

                {/* <ListItemText primary="LastName" />
        <Typography variant="subtitle1" className={classes.total}>
          {props.values.Lastname}
        </Typography> */}
            </ListItem>
            <ListItem className={classes.listItem}>
                <ListItemText primary="State"/>
                <Typography gutterBottom>{`${props.values.state}`}</Typography>
                <br/>

                {/* <ListItemText primary="LastName" />
        <Typography variant="subtitle1" className={classes.total}>
          {props.values.Lastname}
        </Typography> */}
            </ListItem>
            <ListItem className={classes.listItem}>
                <ListItemText primary="Country"/>
                <Typography gutterBottom>{`${props.values.country}`}</Typography>
                <br/>
            </ListItem>
            <ListItem className={classes.listItem}>
                <ListItemText primary="Zipcode"/>
                <Typography gutterBottom>{`${props.values.zipcode}`}</Typography>
                <br/>
            </ListItem>
            {Object.keys(props.filePreviews).map((fileName, index) => (
                <>
                    {props.filePreviews[fileName].length > 0 && (
                        <>
                            <ListItem className={classes.listItem} key={index}>
                                <ListItemText
                                    primary={fileName.slice(0, fileName.length - 1)}
                                />
                                {props.filePreviews[fileName].map((file, anotherIndex) => (
                                    <img
                                        key={anotherIndex}
                                        alt="example"
                                        style={{width: '100px'}}
                                        src={file.preview}
                                    />
                                ))}
                            </ListItem>
                        </>
                    )}
                </>
            ))}
            <ListItem className={classes.listItem}>
                <ListItemText primary="Select Admins"/>
                <AdminsField className={classes.admins}/>
            </ListItem>
        </List>
    );
}

ProductDetails.propTypes = {
    adminUsersFetchRequest: PropTypes.func.isRequired
}

export default connect(null, {adminUsersFetchRequest})(ProductDetails);
