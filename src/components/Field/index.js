import React from "react";

import { Field as FormikField, ErrorMessage } from "formik";

const Field = ({ name, type }) => {
  const renderError = (message) => <p className="errorMessage">{message}</p>;

  return (
    <>
      <label htmlFor={name}>Nome</label>
      <FormikField type={type} name={name} className="col-xs-12" />
      <ErrorMessage name={name} render={renderError} />
    </>
  );
};

export default Field;
