import React from 'react';
import FollowersCard from './FollowersCard';
import LogoSearch from './LogoSearch';
import ProfileCard from './ProfileCard';
import './ProfileSide.scss';

const profileSide = () => {
  return (
    <div>
      <div className="Top">
        <LogoSearch />
      </div>
      <div className="ProfileSide">
        <ProfileCard location="homepage" />
        <FollowersCard />
      </div>
    </div>
  );
};

export default profileSide;
