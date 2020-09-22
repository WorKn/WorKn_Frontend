import React, { useState, useEffect } from "react";

import "./EmailValidation-Style.css";

import { validateEmail } from "../../utils/apiRequests";

const EmailValidation = ({
  match: {
    params: { token },
  },
}) => {
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    validateEmail(token).then((res) => {
      console.log(res);
      if (res == "success") {
        setValidated(true);
      } else {
        setValidated(false);
      }
    });
  }, []);

  return (
    <div className="email-validation__body">
      {validated ? (
        <h1 className="email-validation__title">
          Usuario validado correctamente
        </h1>
      ) : (
        <h1 className="email-validation__title">Se lo mamaste a Dracula</h1>
      )}

      <h1 className="lolxd54321">Validation Page</h1>
    </div>
  );
};

export default EmailValidation;
