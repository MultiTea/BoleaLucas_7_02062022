import React from 'react';
import FollowersCard from '../../components/ProfileSide/FollowersCard';
import LogoSearch from '../../components/ProfileSide/LogoSearch';
import '../ProfileSide/ProfileSide.scss';
import InfoCard from './InfoCard';

const ProfileLeft = () => {
  return (
    <div>
      <div className="Top">
        <LogoSearch />
      </div>
      <div className="ProfileSide">
        <InfoCard />
        <FollowersCard />
      </div>
    </div>
  );
};

export default ProfileLeft;
