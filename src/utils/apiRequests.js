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
