import React from 'react';
import PostSide from '../../components/PostSide/PostSide';
import ProfileLeft from '../../components/ProfileLeft/ProfileLeft';
import ProfileCard from '../../components/ProfileSide/ProfileCard';
import RightSide from '../../components/RightSide/RightSide';
import './Profile.scss';
import { useMediaQuery } from 'react-responsive';
import LogoSearch from '../../components/ProfileSide/LogoSearch';
import InfoCard from '../../components/ProfileLeft/InfoCard';

const Profile = () => {
  const isMobileDevice = useMediaQuery({ minDeviceWidth: 768 });
  return (
    <div className="Profile">
      <div className="flexLSide">
        <ProfileLeft />
      </div>
      <div className="profileCenter flexMain">
        {!isMobileDevice && (
          <div className="Top">
            <LogoSearch />
          </div>
        )}
        <ProfileCard location="profilePage" />
        {!isMobileDevice && (
          <div className="Top">
            <InfoCard />
          </div>
        )}
        <PostSide />
      </div>
      {isMobileDevice && (
        <div className="flexRSide">
          <RightSide />
        </div>
      )}
    </div>
  );
};

export default Profile;
