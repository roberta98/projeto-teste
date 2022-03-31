const axios = require("axios");

const baseURL = "https://61e036950f3bdb0017934eb0.mockapi.io";

const validateLogin = (data) =>
  axios.post(`${baseURL}/api/valid-passwords/results`, data);

export default validateLogin;
