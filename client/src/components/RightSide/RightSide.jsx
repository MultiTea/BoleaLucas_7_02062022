import React, { useState } from 'react';
import './RightSide.scss';
import { UilBell } from '@iconscout/react-unicons';
import { UilCommentAltLines } from '@iconscout/react-unicons';
import { UilSetting } from '@iconscout/react-unicons';
import TrendCard from './TrendCard';
import ShareModal from '../PostSide/ShareModal';

const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <div className="rightSide">
      <div className="navIcons">
        <UilBell />
        <UilCommentAltLines />
        <UilSetting />
      </div>
      <TrendCard />
      <button className="button r-button" onClick={() => setModalOpened(true)}>
        Publier
      </button>
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
    </div>
  );
};

export default RightSide;
