import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const ProfileCard = ({ location }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img
          src={
            user.coverImage
              ? serverPublic + user.coverImage
              : serverPublic + 'defaultCover.jpg'
          }
          alt="CoverImage"
        />
        <img
          src={
            user.profileImage
              ? serverPublic + user.profileImage
              : serverPublic + 'defaultProfile.png'
          }
          alt="ProfileImage"
          className="profileImage"
        />
      </div>

      <div className="ProfileName">
        <span>
          {user.firstname} {user.lastname}
        </span>
        <span>{user.worksAt ? user.worksAt : 'Écrivez à propos de vous'}</span>
      </div>

      <div className="followStatus">
        <hr />

        <div>
          <div className="flNbr">
            <span>{user.following.length}</span>
            <span>Abonnements</span>
          </div>

          <div className="vl"></div>

          <div className="flNbr">
            <span>{user.followers.length}</span>
            <span>Abonnés</span>
          </div>
        </div>
        <hr />
      </div>

      {location === 'profilePage' ? (
        ''
      ) : (
        <span>
          <Link
            to={`/profile/${user._id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            Mon profil
          </Link>
        </span>
      )}
    </div>
  );
};

export default ProfileCard;
