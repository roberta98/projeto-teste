import React from "react";

import { ErrorMessage } from "formik";

const MessageError = ({ name }) => {
  const renderError = (message) => <p className="errorMessage">{message}</p>;

  return <ErrorMessage name={name} render={renderError} />;
};

export default MessageError;
