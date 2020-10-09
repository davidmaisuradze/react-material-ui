import React from 'react';
import AddressForm from "./Forms/AddressForm";
import UploadForm from "./Forms/UploadForm";
import ReviewOrder from "./Review/ReviewOrder";


const StepContent = ({
  step,
  profile,
  files,
  uploadFormAddFiles,
  uploadFormAddError
}) => {
  switch (step) {
    case 0:
      return <AddressForm profile={profile} />;
    case 1:
      return (
        <UploadForm
          profile={profile}
          files={files}
          addFiles={uploadFormAddFiles}
          addError={uploadFormAddError}
        />
      );
    case 2:
      return <ReviewOrder filePreviews={files} />;
    default:
      return <div>Not Found</div>;
  }
};

export default StepContent;