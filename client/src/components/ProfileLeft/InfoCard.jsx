import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import * as UserApi from '../../api/UserRequest';
import { UilPen } from '@iconscout/react-unicons';
import ProfileModal from '../ProfileLeft/ProfileModal';

const InfoCard = () => {
  const [modalOpened, setModalOpened] = useState(false);

  const params = useParams();

  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});

  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
      } else {
        console.log('fetching');
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
        console.log(profileUser);
      }
    };
    fetchProfileUser();
  }, [user]);

  return (
    <div className="InfoCard">
      <div>
        <div className="infoHead">
          <h3>Éditer le profil</h3>
          {user._id === profileUserId ? (
            <div>
              <UilPen
                width="1.2rem"
                height="1.2rem"
                onClick={() => setModalOpened(true)}
              />
              <ProfileModal
                modalOpened={modalOpened}
                setModalOpened={setModalOpened}
                data={user}
              />
            </div>
          ) : (
            ''
          )}
        </div>

        <div className="info">
          <span>
            <b>Bio </b>
          </span>
          <span>{profileUser.about}</span>
        </div>

        <div className="info">
          <span>
            <b>Habite à</b>
          </span>
          <span>{profileUser.livesIn}</span>
        </div>

        <div className="info">
          <span>
            <b>Poste </b>
          </span>
          <span>{profileUser.worksAt}</span>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
