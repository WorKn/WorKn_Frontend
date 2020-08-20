import axios from "axios";
require("dotenv").config({ path: "./.env" });

let HOST = "";

if (process.env.REACT_APP_ENV === "staging") {
  HOST = process.env.REACT_APP_STAGING_HOST;
}

const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmM2RmNzhjMzlmZTk3NTczYzI5NTQzNiIsImlhdCI6MTU5Nzg5NjU5NSwiZXhwIjoxNjA1NjcyNTk1fQ.1yotILcnP_GQ9jt5UUfshK9ldXxsE8OaMS25XTdxMdY";

// const authAxios = axios.create({
//   baseURL: HOST,
//   headers: {
//     Authorization: `Bearer ${accessToken}`,
//   },
// });

axios.interceptors.request.use(
  (config) => {
    config.headers.authorization = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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
      lastname: user.lastname,
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

export const updateProfile = async (user) => {
  console.log(user);
  try {
    const response = await axios.patch(`${HOST}/api/v1/users/updateMyProfile`, {
      name: user.name,
      bio: user.bio,
      lastname: user.lastname,
      identificationNumber: user.identificationNumber,
      phone: user.phone,
      location: user.location,
      tags: user.tags,
      category: user.category,
    });
    return response;
  } catch (e) {
    return e.response.data;
  }
};
