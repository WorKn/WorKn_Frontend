import axios from "axios";
require("dotenv").config({ path: "./.env" });

let HOST = "";

if (process.env.REACT_APP_ENV === "staging") {
  HOST = process.env.REACT_APP_STAGING_HOST;
}

export const testing = async () => {
  try {
    const response = await axios.get(`${HOST}`);
    return response;
  } catch (e) {
    return e;
  }
};

export const userLogin = async (user) => {
  console.log(user);
  try {
    const response = await axios.post(`${HOST}/api/v1/users/login`, {
      email: user.email,
      password: user.password,
    });
    return response;
  } catch (e) {
    return e.response.data;
  }
};

export const userSignup = async (user) => {
  console.log(user);
  try {
    const response = await axios.post(`${HOST}/api/v1/users/signup`, {
      name: user.name,
      email: user.email,
      birthday: user.birthday,
      password: user.password,
      passwordConfirm: user.passwordConfirm,
      userType: user.userType,
    });
    return response;
  } catch (e) {
    return e.response.data;
  }
};
