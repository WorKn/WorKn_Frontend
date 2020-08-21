import axios from "axios";
import Cookies from "js-cookie";

require("dotenv").config({ path: "./.env" });

let HOST = "";

if (process.env.REACT_APP_ENV === "staging") {
  HOST = process.env.REACT_APP_STAGING_HOST;
}
// const { action, state } = useStateMachine(updateAction);

const accessToken = Cookies.get("jwt");
// console.log(
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmM2Y0ZjQ3MTJlN2YzMjE0NmM1Y2JjOCIsImlhdCI6MTU5ODAzNTAwMSwiZXhwIjoxNjA1ODExMDAxfQ.vdxWNJsZZp_7byenl3QWJ-BVh1VZPslhXzG7pQScL7c"
// );
// console.log(accessToken);

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
  // console.log(user);
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
  // console.log(user);
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
  // console.log(user);
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

export const updatePassword = async (user) => {
  console.log(user);
  try {
    const response = await axios.patch(
      `${HOST}/api/v1/users/updateMyPassword`,
      {
        currentPassword: user.currentPassword,
        newPassword: user.newPassword,
        newPasswordConfirm: user.newPasswordConfirm,
      }
    );
    return response;
  } catch (e) {
    return e.response.data;
  }
};
