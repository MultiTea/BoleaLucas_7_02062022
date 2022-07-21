import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Comment from '../../img/comment.png';
import Share from '../../img/share.png';
import Heart from '../../img/like.png';
import NotLike from '../../img/notlike.png';
import { UilPen, UilTimes } from '@iconscout/react-unicons';
import { likePost } from '../../api/PostRequest';
import UpdatePost from './UpdatePost';
import { deletePost } from '../../actions/PostAction';
import { useDispatch } from 'react-redux';
import * as UserApi from '../../api/UserRequest';

const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const [person, setPerson] = useState([]);

  useEffect(() => {
    const fetchProfile = () => {
      const person = UserApi.getUser(data.userId);
      setPerson(person);
      console.log(person);
    };
    fetchProfile(person);
  }, []);

  const [modalOpened, setModalOpened] = useState(false);

  const dispatch = useDispatch();

  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  return (
    <div className="Post">
      <div className="postHeader">
        <div className="profileName">
          <img src={person.profileImage} className="profileImg" />
          <span>{person.firstname + ' ' + person.lastname}</span>
        </div>
        {user._id === data.userId || user.isAdmin ? (
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
              onClick={() => dispatch(deletePost(data._id, data.userId))}
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
