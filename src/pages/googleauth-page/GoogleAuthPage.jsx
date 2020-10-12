import React, { useEffect } from "react";

import { googleAuth } from "../../utils/apiRequests";

import queryString from "query-string";

const GoogleAuthPage = ({ location }) => {
  useEffect(() => {
    const urlParams = queryString.parse(location.search);
    if (urlParams.error) {
      console.log("Error");
    } else {
      console.log(`The code is: ${urlParams.code}`);
      //   const redirect_uri = "http://127.0.0.1:3001/";
      const redirect_uri = "http://127.0.0.1:3001/authenticate/google/";

      googleAuth(urlParams.code, redirect_uri).then((res) => console.log(res));
    }
  }, []);

  return <div></div>;
};

export default GoogleAuthPage;
