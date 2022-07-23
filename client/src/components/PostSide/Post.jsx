import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import Heart from '../../img/like.png';
import NotLike from '../../img/notlike.png';
import {
  UilPen,
  UilTimes,
  UilCommentDots,
  UilMessage,
} from '@iconscout/react-unicons';

import { likePost } from '../../api/PostRequest';
import UpdatePost from './UpdatePost';
import { deletePost } from '../../api/PostRequest';
import { useDispatch } from 'react-redux';
import * as UserApi from '../../api/UserRequest';

const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const [persons, setPersons] = useState([]);

  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await UserApi.getAllUser();
      setPersons(data);
    };
    fetchPersons(0);
  }, []);

  const [modalOpened, setModalOpened] = useState(false);

  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  return (
    <div className="Post" key={data._id}>
      <div className="postHeader">
        <div>
          {persons.map((person) => {
            if (person._id === data.userId) {
              return (
                <div className="postHeaderAlign">
                  <img
                    className="profileImg"
                    src={
                      person.profileImage
                        ? process.env.REACT_APP_PUBLIC_FOLDER +
                          person.profileImage
                        : process.env.REACT_APP_PUBLIC_FOLDER +
                          'defaultProfile.png'
                    }
                    alt={"Emplacement de l'image de profil"}
                  />
                  <div className="profileName">
                    <span>{person.firstname + ' ' + person.lastname}</span>
                    <span>{person.worksAt}</span>
                  </div>
                </div>
              );
            }
          })}
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
              onClick={() => {
                if (window.confirm('Voulez-vous supprimer cet article?')) {
                  deletePost(data._id, data.userId);
                }
              }}
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
        <UilCommentDots />
        <UilMessage />
      </div>

      <span style={{ color: 'var(--gray)', fontSize: '12px' }}>
        {likes} J'aime
      </span>
    </div>
  );
};

export default Post;
