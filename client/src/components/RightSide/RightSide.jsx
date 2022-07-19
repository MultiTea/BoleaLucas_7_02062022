import React, { useState } from 'react';
import './RightSide.scss';
import { UilEstate } from '@iconscout/react-unicons';
import { UilBell } from '@iconscout/react-unicons';
import { UilCommentAltLines } from '@iconscout/react-unicons';
import { UilSetting } from '@iconscout/react-unicons';
import TrendCard from './TrendCard';
import ShareModal from '../PostSide/ShareModal';
import { Link } from 'react-router-dom';

const RightSide = () => {
  const [modalOpened, setModalOpened] = useState(false);
  return (
    <div className="rightSide">
      <div className="navIcons">
        <Link to="../home">
          <UilEstate />
        </Link>
        <UilSetting />
        <UilBell />
        <UilCommentAltLines />
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
