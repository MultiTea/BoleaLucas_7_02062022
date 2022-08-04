import React, { useState } from 'react';
import './RightSide.scss';
import { useDispatch } from 'react-redux';
import { UilBell } from '@iconscout/react-unicons';
import { UilCommentAltLines } from '@iconscout/react-unicons';
import { UilSetting } from '@iconscout/react-unicons';
import TrendCard from './TrendCard';
import ShareModal from '../PostSide/ShareModal';
import { logout } from '../../actions/AuthAction';
import { useMediaQuery } from 'react-responsive';

const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logout());
  };

  const isMobileDevice = useMediaQuery({ minDeviceWidth: 768 });

  return (
    <div className="rightSide">
      {isMobileDevice && (
        <div className="navIcons">
          <UilBell />
          <UilCommentAltLines />
          <UilSetting />
          <button className="button logout-button" onClick={handleLogOut}>
            Déconnexion
          </button>
        </div>
      )}
      <TrendCard />
      {isMobileDevice && (
        <button
          className="button r-button"
          onClick={() => setModalOpened(true)}
        >
          Publier
        </button>
      )}
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  );
};

export default RightSide;
