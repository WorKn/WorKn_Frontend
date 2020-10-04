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

export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${HOST}/api/v1/users?userType=applicant`);
    return response;
  } catch (e) {
    return e;
  }
};

export const getAllOffers = async () => {
  try {
    const response = await axios.get(`${HOST}/api/v1/offers/`);
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
    console.log("Hubo un error al crear");
    return e.response.data;
  }
};

export const sendEmail = async (user) => {
  try {
    const response = await axios.post(`${HOST}/api/v1/users/forgotPassword`, {
      email: user.email,
    });
    return response;
  } catch (e) {
    return e.response.data;
  }
};

export const sendImage = async (image) => {
  console.log(image);
  const fd = new FormData();
  fd.append("profilePicture", image);
  console.log(fd);
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  try {
    const response = await axios.patch(
      `${HOST}/api/v1/users/updateMyProfile`,
      fd,
      config
    );
    return response;
  } catch (err) {
    return err;
  }
};

//Organizations

export const getMyOrganization = async () => {
  try {
    const response = await axios.get(`${HOST}/api/v1/organizations/me`);
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

export const getOrgById = async (id) => {
  try {
    const response = await axios.get(`${HOST}/api/v1/organizations/${id}`);
    return response.data;
  } catch (e) {
    return e.response.data;
  }
};

export const signUpOrganizationMember = async (user) => {
  try {
    const response = await axios.post(
      `${HOST}/api/v1/organizations/members/signup/${user.token}`,
      {
        name: user.name,
        lastname: user.lastname,
        birthday: user.birthday,
        password: user.password,
        passwordConfirm: user.passwordConfirm,
      }
    );
    return response;
  } catch (e) {
    return e.response.data;
  }
};

export const resetPassword = async (user) => {
  console.log(user);
  try {
    const response = await axios.patch(
      `${HOST}/api/v1/users/resetPassword/${user.myToken}`,
      {
        password: user.password,
        passwordConfirm: user.passwordConfirm,
      }
    );
    return response;
  } catch (e) {
    return e.response.data;
  }
};

export const editOrganization = async (org) => {
  try {
    const response = await axios.patch(`${HOST}/api/v1/organizations/me`, {
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

export const sendInvitation = async (org) => {
  try {
    const response = await axios.post(
      `${HOST}/api/v1/organizations/members/invite`,
      {
        invitation: {
          email: org.email,
          role: org.role,
        },
      }
    );
    return response;
  } catch (e) {
    return e.response.data;
  }
};

export const getInvitationInfo = async (token) => {
  try {
    const response = await axios.get(
      `${HOST}/api/v1/organizations/invitation/${token}`
    );
    return response;
  } catch (e) {
    return e.response.data;
  }
};

export const removeMember = async (id) => {
  try {
    const response = await axios.delete(
      `${HOST}/api/v1/organizations/members/${id}`
    );
    return response;
  } catch (e) {
    return e.response.data;
  }
};

export const updateMemberRole = async (id, role) => {
  try {
    const response = await axios.patch(`${HOST}/api/v1/organizations/members`, {
      id: id,
      organizationRole: role,
    });
    return response;
  } catch (e) {
    return e.response.data;
  }
};

export const getMyOffers = async () => {
  try {
    const response = await axios.get(`${HOST}/api/v1/offers/me`);
    return response;
  } catch (e) {
    return e.response.data;
  }
};

export const editOffer = async (offer) => {
  try {
    const response = await axios.patch(`${HOST}/api/v1/offers/${offer._id}`, {
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
    return e.response.data;
  }
};
// Interactions

export const getMyInteractions = async (offer) => {
  try {
    const response = await axios.get(
      `${HOST}/api/v1/offers/interactions/me?offer=${offer}`
    );
    return response;
  } catch (e) {
    return e.response.data;
  }
};

export const createInteractionAO = async (offer) => {
  try {
    const response = await axios.post(`${HOST}/api/v1/offers/interactions`, {
      offer: offer,
    });
    return response;
  } catch (e) {
    return e.response.data;
  }
};

export const createInteractionOA = async (applicant, offer) => {
  try {
    const response = await axios.post(`${HOST}/api/v1/offers/interactions`, {
      applicant: applicant,
      offer: offer,
    });
    return response;
  } catch (e) {
    return e.response.data;
  }
};

export const acceptInteraction = async (id) => {
  try {
    const response = await axios.patch(
      `${HOST}/api/v1/offers/interactions/accept/${id}`
    );
    return response.data.status;
  } catch (e) {
    return e.response.data;
  }
};

export const rejectInteraction = async (id) => {
  try {
    const response = await axios.patch(
      `${HOST}/api/v1/offers/interactions/reject/${id}`
    );
    return response.data.status;
  } catch (e) {
    return e.response.data;
  }
};

export const cancelInteraction = async (id) => {
  try {
    const response = await axios.delete(
      `${HOST}/api/v1/offers/interactions/${id}`
    );
    return response.data.status;
  } catch (e) {
    return e.response.data;
  }
};

export const deleteOffer = async (id) => {
  try {
    const response = await axios.delete(`${HOST}/api/v1/offers/${id}`);
    return response;
  } catch (e) {
    return e.response.data;
  }
};
