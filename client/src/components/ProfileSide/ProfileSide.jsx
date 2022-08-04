import React from 'react';
import FollowersCard from './FollowersCard';
import LogoSearch from './LogoSearch';
import ProfileCard from './ProfileCard';
import './ProfileSide.scss';
import { useMediaQuery } from 'react-responsive';

const ProfileSide = () => {
  const isMobileDevice = useMediaQuery({ minDeviceWidth: 768 });

  return (
    <div>
      {isMobileDevice && (
        <div className="Top">
          <LogoSearch />
        </div>
      )}
      <div className="ProfileSide">
        {isMobileDevice && <ProfileCard location="homepage" />}
        <FollowersCard />
      </div>
    </div>
  );
};

export default ProfileSide;
