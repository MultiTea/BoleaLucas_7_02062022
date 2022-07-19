import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Comment from '../../img/comment.png';
import Share from '../../img/share.png';
import Heart from '../../img/like.png';
import NotLike from '../../img/notlike.png';
import { UilPen, UilTimes } from '@iconscout/react-unicons';
import { likePost } from '../../api/PostRequest';
import UpdatePost from './UpdatePost';
import * as UserApi from '../../api/UserRequest';
import { deletePost } from '../../actions/PostAction';
import { useDispatch } from 'react-redux';

const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);

  const dispatch = useDispatch();

  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const [modalOpened, setModalOpened] = useState(false);

  const params = useParams();
  const profileUserId = params.id;

  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  return (
    <div className="Post">
      <div className="postHeader">
        <div className="profileName">
          <img
            src={
              user.profilePicture
                ? serverPublic + user.profilePicture
                : serverPublic + 'defaultProfile.png'
            }
            alt="ProfileImage"
            className="profileImg"
          />
          <span>
            {user.firstname} {user.lastname}
          </span>
        </div>
        {user._id === profileUserId ? (
          <div className="editPost">
            <UilPen
              width="1.2rem"
              height="1.2rem"
              onClick={() => setModalOpened(true)}
            />
            <UpdatePost
              modalOpened={modalOpened}
              setModalOpened={setModalOpened}
              data={user}
            />
            <UilTimes
              width="1.4rem"
              height="1.4rem"
              onClick={() => dispatch(deletePost(data._id))}
            />
          </div>
        ) : (
          ''
        )}
      </div>

      <div className="detail">
        <span>{data.desc}</span>
      </div>

      <img
        src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ''}
        alt=""
      />

      <div className="postReact">
        <img
          src={liked ? Heart : NotLike}
          alt=""
          style={{ cursor: 'pointer' }}
          onClick={handleLike}
        />
        <img src={Comment} alt="" />
        <img src={Share} alt="" />
      </div>

      <span style={{ color: 'var(--gray)', fontSize: '12px' }}>
        {likes} J'aime
      </span>
    </div>
  );
};

export default Post;
