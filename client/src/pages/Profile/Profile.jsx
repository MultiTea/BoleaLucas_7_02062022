import React from 'react';
import PostSide from '../../components/PostSide/PostSide';
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft';
import ProfileCard from '../../components/ProfileSide/ProfileCard';
import RightSide from '../../components/RightSide/RightSide';
import './Profile.scss';
const Profile = () => {
  return (
    <div className="Profile">
      <div className="flexSide">
        <ProfileLeft />
      </div>
      <div className="profileCenter flexMain">
        <ProfileCard location="profilePage" />
        <PostSide />
      </div>
      <div className="flexSide">
        <RightSide />
      </div>
    </div>
  );
};

export default Profile;
