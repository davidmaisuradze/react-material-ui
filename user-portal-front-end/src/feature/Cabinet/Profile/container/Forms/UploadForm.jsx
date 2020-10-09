import React from "react";
import { Grid, Typography } from "@material-ui/core";
import UploadField from "../../FormFields/UploadField";
import { userType } from "config/constants";

export default function PaymentForm(props) {
  const { profile, files, addFiles, addError } = props;
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom></Typography>
      <Grid container spacing={3}>
        {profile.type === userType.individual && (
          <>
            <Grid item xs={12}>
              <Typography variant="h5" paragraph={true} gutterBottom>
                Passport
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <UploadField
                name="passportFile"
                files={files["passportFiles"]}
                addFiles={addFiles}
                addError={addError}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h5" paragraph={true} gutterBottom>
                Driving License
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <UploadField
                name="drivingLicenseFile"
                files={files["drivingLicenseFiles"]}
                addFiles={addFiles}
                addError={addError}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h5" paragraph={true} gutterBottom>
                Others
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <UploadField
                name="otherFile"
                files={files["otherFiles"]}
                addFiles={addFiles}
                addError={addError}
              />
            </Grid>
          </>
        )}

        {profile.type === userType.nonIndividual && (
          <>
            <Grid item xs={12}>
              <Typography variant="h5" paragraph={true} gutterBottom>
                Nothing
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <UploadField
                name="nothingFile"
                files={files["nothingFiles"]}
                addFiles={addFiles}
                addError={addError}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h5" paragraph={true} gutterBottom>
                For-Assignment
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <UploadField
                name="assignmentFile"
                files={files["assignmentFiles"]}
                addFiles={addFiles}
                addError={addError}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h5" paragraph={true} gutterBottom>
                Other
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <UploadField
                name="otherFile"
                files={files["otherFiles"]}
                addFiles={addFiles}
                addError={addError}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h5" paragraph={true} gutterBottom>
                Another
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <UploadField
                name="anotherFile"
                files={files["anotherFiles"]}
                addFiles={addFiles}
                addError={addError}
              />
            </Grid>
          </>
        )}
      </Grid>
    </React.Fragment>
  );
}
