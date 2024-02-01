import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

export default function Profile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`votre_api_url/api/users/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error(
          "user profile page: error while fetching user data",
          error
        );
      });
  }, [userId]);

  if (!user) {
    return <div>You must be logged in to have acces here</div>;
  }

  return (
    <div>
      <h1>My Account</h1>
      <div>
        <h2>User Information</h2>
        <p>
          <strong>First Name:</strong> {user.firstname}
        </p>
        <p>
          <strong>Last Name:</strong> {user.lastname}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
      </div>
    </div>
  );
}
Profile.propTypes = {
  userId: PropTypes.number.isRequired,
};
