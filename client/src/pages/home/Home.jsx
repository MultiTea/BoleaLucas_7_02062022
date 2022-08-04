import React from 'react';
import PostSide from '../../components/PostSide/PostSide';
import ProfileSide from '../../components/ProfileSide/ProfileSide';
import RightSide from '../../components/RightSide/RightSide';
import './Home.scss';
import { useMediaQuery } from 'react-responsive';
import LogoSearch from '../../components/ProfileSide/LogoSearch';

const Home = () => {
  const isMobileDevice = useMediaQuery({ minDeviceWidth: 768 });
  return (
    <div className="Home">
      {!isMobileDevice && (
        <div className="Top">
          <LogoSearch />
        </div>
      )}
      <div className="flexLSide">
        <ProfileSide />
      </div>
      <div className="flexMain">
        <PostSide />
      </div>
      <div className="flexRSide">
        <RightSide />
      </div>
    </div>
  );
};

export default Home;
