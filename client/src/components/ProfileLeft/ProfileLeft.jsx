import React from 'react';
import FollowersCard from '../../components/ProfileSide/FollowersCard';
import LogoSearch from '../../components/ProfileSide/LogoSearch';
import '../ProfileSide/ProfileSide.scss';
import InfoCard from './InfoCard';
import { useMediaQuery } from 'react-responsive';

const ProfileLeft = () => {
  const isMobileDevice = useMediaQuery({ minDeviceWidth: 768 });
  return (
    <div>
      {isMobileDevice && (
        <div className="Top">
          <LogoSearch />
        </div>
      )}
      <div className="ProfileSide">
        {isMobileDevice && <InfoCard />}
        <FollowersCard />
      </div>
    </div>
  );
};

export default ProfileLeft;
