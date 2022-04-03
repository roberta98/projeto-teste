import React from "react";

import { Field as FormikField } from "formik";

import MessageError from "../MessageError";

const Field = ({ name, type }) => {
  return (
    <>
      <label htmlFor={name}>Nome</label>
      <FormikField type={type} name={name} className="col-xs-12" />
      <MessageError name={name} />
    </>
  );
};

export default Field;
