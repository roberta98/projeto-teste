import React, { useState } from "react";

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

  const [isValidate, setIsValidate] = useState(false);
  const [message, setMessage] = useState("");
  const [sucessMessage, setSucessMessage] = useState("");

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

  function validatePassword(values) {
    let data = Object.values(values);
    let password = data[2];
    let itsValid;
    let itsValidBetween = true;
    let passwordArray = [];
    passwordArray = password.split("");

    if (password < 184759 || password > 856920) {
      setMessage("Senha deve estar entre os números 184759 e 856920");
      itsValidBetween = false;
    }

    for (let i = 0; i < passwordArray.length; i++) {
      let j = 1 + i;
      if (j <= 5) {
        if (passwordArray[i] <= passwordArray[j]) {
          itsValid = true;
          setMessage("");
        } else {
          itsValid = false;
          setMessage(
            "Senha deve conter dígitos numa sequência crescente ou de mesmo valor"
          );
        }
      }
    }
    let ok = itsValidBetween && itsValid ? true : false;
    setIsValidate(ok);
    return itsValid;
  }

  async function handleSubmit(values, { setSubmitting }) {
    let validate = validatePassword(values);
    if (validate) {
      const { data } = await validateLogin(values);
      if (typeof data.requestId === "string") {
        setMessage("Senha Válida");
        setSucessMessage("Resultado enviado com sucesso!");
        setIsValidate(true);
      }
    }
    setSubmitting(false);
    setTimeout(() => {
      setSucessMessage("");
    }, 5000);
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <FormFormik className="col-xs-12">
          <Field type="text" name="name" />
          <Field type="email" name="email" />
          <Field type="password" name="password" />
          {!isValidate && <p className="errorMessage">{message}</p>}
          {isValidate && <p className="successMessage">{message}</p>}
          <div className="containerButton">
            <button
              type="submit"
              disabled={isSubmitting}
              className="button col-xs-12"
            >
              Entrar
            </button>
            {isValidate && <p className="successMessage">{sucessMessage}</p>}
          </div>
        </FormFormik>
      )}
    </Formik>
  );
};

export default Form;
