import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { followUser, unfollowUser } from '../../actions/UserAction';

const User = ({ person }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  );

  const handleFollow = () => {
    following
      ? dispatch(unfollowUser(person._id, user))
      : dispatch(followUser(person._id, user));
    setFollowing((prev) => !prev);
  };

  return (
    <div className="follower">
      <div>
        <img
          src={
            person.profileImage
              ? serverPublic + person.profileImage
              : serverPublic + 'defaultProfile.png'
          }
          alt=""
          className="followerImg"
        />
        <div className="name">
          <span>{person.firstname + ' ' + person.lastname}</span>
        </div>
      </div>

      <button
        className={
          following ? 'button fc-button UnfollowButton' : 'button fc-button'
        }
        onClick={handleFollow}
      >
        {following ? 'Se désabonner' : 'Suivre'}
      </button>
    </div>
  );
};

export default User;
