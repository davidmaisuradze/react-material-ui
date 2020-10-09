import React from 'react';
import { useFormikContext } from "formik";
import { Typography } from "@material-ui/core";
import ProductDetails from "./ProductDetails";

export default function ReviewOrder(props) {
  const { values: formValues } = useFormikContext();
  console.log(formValues, "=============");
  return (
    <React.Fragment>
      <Typography variant="h6" align={"center"} gutterBottom>
        Summary
      </Typography>
      <ProductDetails filePreviews={props.filePreviews} values={formValues} />
      {/* <Grid container spacing={2}>
        <ShippingDetails formValues={formValues} />
        <PaymentDetails formValues={formValues} />
      </Grid> */}
    </React.Fragment>
  );
}
