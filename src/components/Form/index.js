import React, { useState, useEffect } from "react";

import Field from "../Field";

import { Formik, Form as FormFormik } from "formik";
import * as Yup from "yup";

import validateLogin from "../../services/auth";

const Form = () => {
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const campoObrigatorio = "O campo é obrigatório";
  const sixNumbers = "A senha tem que ter 6 números";

  const validationSchema = Yup.object({
    name: Yup.string().required(campoObrigatorio),
    email: Yup.string().email("E-mail inválido").required(campoObrigatorio),
    password: Yup.string()
      .required(campoObrigatorio)
      .min(6, sixNumbers)
      .max(6, sixNumbers)
      .matches(/^\d+$/, "Esse campo só pode conter números")
      .matches(/(.)\1/, "É necessario ter 2 números adjacentes"),
  });

  async function handleSubmit(values, { setSubmitting }) {
    const res = await validateLogin(values);
    setSubmitting(false);
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, isSubmitting }) => (
        <FormFormik className="col-xs-12">
          <Field type="text" name="name" />
          <Field type="email" name="email" />
          <Field type="password" name="password" />
          <button
            type="submit"
            disabled={isSubmitting}
            className="button col-xs-12"
          >
            Entrar
          </button>
        </FormFormik>
      )}
    </Formik>
  );
};

export default Form;
