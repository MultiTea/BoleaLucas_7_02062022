import React from 'react';

const User = ({ person }) => {
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="follower">
      <div>
        <img
          src={
            person.profilePicture
              ? serverPublic + person.profileImage
              : serverPublic + 'defaultProfile.png'
          }
          alt=""
          className="followerImg"
        />
        <div className="name">
          <span>{person.firstname + ' ' + person.lastname}</span>
        </div>
      </div>
    </div>
  );
};

export default User;
