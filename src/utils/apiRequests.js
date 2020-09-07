import axios from "axios";
import Cookies from "js-cookie";

require("dotenv").config({ path: "./.env" });

let HOST = "";

if (process.env.REACT_APP_ENV === "staging") {
  HOST = process.env.REACT_APP_STAGING_HOST;
}

const accessToken = Cookies.get("jwt");

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

export const getMe = async () => {
  try {
    const response = await axios.get(`${HOST}/api/v1/users/me`);
    return response;
  } catch (e) {
    return e;
  }
};

export const userLogin = async (user) => {
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

export const orgUserSignup = async (user) => {
  try {
    const response = await axios.post(`${HOST}/api/v1/users/signup`, {
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      birthday: user.birthday,
      password: user.password,
      passwordConfirm: user.passwordConfirm,
      userType: user.userType,
      organizationRole: user.organizationRole,
    });
    return response;
  } catch (e) {
    return e.response.data;
  }
};

export const invitedUserSignup = async (user) => {
  try {
    const response = await axios.post(`${HOST}/api/v1/users/signup`, {
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      birthday: user.birthday,
      password: user.password,
      passwordConfirm: user.passwordConfirm,
      userType: user.userType,
      organizationRole: user.organizationRole,
      organization: user.organization,
    });
    return response;
  } catch (e) {
    return e.response.data;
  }
};

export const updateProfile = async (user) => {
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
    return e.response.data.status;
  }
};

export const validateEmail = async (token) => {
  try {
    const response = await axios.patch(
      `${HOST}/api/v1/users/validateEmail/${token}`
    );
    return response.data.status;
  } catch (e) {
    console.log("kattia");
    return false;
  }
};

export const createOffer = async (offer) => {
  try {
    const response = await axios.post(`${HOST}/api/v1/offers`, {
      title: offer.title,
      description: offer.description,
      offerType: offer.offerType,
      location: offer.location,
      category: offer.category,
      tags: offer.tags,
      salaryRange: offer.salaryRange,
      closingDate: offer.closingDate,
    });
    return response.data.status;
  } catch (e) {
    console.log("Hubo un error NIGGER");
    return e.response.data;
  }
};

//Organizations

export const getMyOrganization = async () => {
  try {
    const response = await axios.get(
      `${HOST}/api/v1/organizations/myOrganization`
    );
    return response;
  } catch (e) {
    return e;
  }
};

export const createOrganization = async (org) => {
  try {
    const response = await axios.post(`${HOST}/api/v1/organizations`, {
      name: org.name,
      RNC: org.RNC,
      bio: org.bio,
      location: org.location,
      phone: org.phone,
      email: org.email,
    });
    return response;
  } catch (e) {
    return e.response.data;
  }
};

export const editOrganization = async (org) => {
  try {
    const response = await axios.patch(
      `${HOST}/api/v1/organizations/${org.id}`,
      {
        name: org.name,
        RNC: org.RNC,
        bio: org.bio,
        location: org.location,
        phone: org.phone,
        email: org.email,
      }
    );
    return response;
  } catch (e) {
    return e.response.data;
  }
};

export const sendInvitation = async (org) => {
  try {
    const response = await axios.post(
      `${HOST}/api/v1/organizations/${org.id}/members/invite`,
      {
        members: [org.email],
      }
    );
    return response;
  } catch (e) {
    return e.response.data;
  }
};

export const removeMember = async (org) => {
  try {
    const response = await axios.delete(
      `${HOST}/api/v1/organizations/${org.OrgId}/members`,
      {
        id: org.id,
      }
    );
    return response;
  } catch (e) {
    return e.response.data;
  }
};
