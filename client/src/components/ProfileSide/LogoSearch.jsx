import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../../img/logo.svg';
import { UilSearch } from '@iconscout/react-unicons';
import { UilBell } from '@iconscout/react-unicons';
import { UilCommentAltLines } from '@iconscout/react-unicons';
import { UilSetting } from '@iconscout/react-unicons';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/AuthAction';
import { useMediaQuery } from 'react-responsive';

const LogoSearch = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleLogOut = () => {
    dispatch(logout());
  };

  const isMobileDevice = useMediaQuery({ minDeviceWidth: 768 });
  const isSmallMobile = useMediaQuery({ minDeviceWidth: 530 });

  return (
    <div className="LogoSearch">
      <Link to="../home">
        <img src={Logo} alt="" />
      </Link>
      {isMobileDevice && (
        <div className="Search">
          <input type="text" placeholder="Rechercher" />
          <div className="s-icon">
            <UilSearch />
          </div>
        </div>
      )}
      {!isMobileDevice && (
        <div className="navIcons">
          <Link
            to={`/profile/${user._id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className="MobileProfileImage">
              <img
                src={
                  user.profileImage
                    ? serverPublic + user.profileImage
                    : serverPublic + 'defaultProfile.png'
                }
                alt="ProfileImage"
                className="profileImage"
              />
              <span>Mon profil</span>
            </div>
          </Link>
          {isSmallMobile && <UilBell />}
          {isSmallMobile && <UilCommentAltLines />}
          {isSmallMobile && <UilSetting />}
          <button className="button logout-button" onClick={handleLogOut}>
            Déconnexion
          </button>
        </div>
      )}
    </div>
  );
};

export default LogoSearch;
