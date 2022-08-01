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
import { updatePost, deletePost } from '../../api/PostRequest';
import { useDispatch } from 'react-redux';
import * as UserApi from '../../api/UserRequest';
import { uploadImage } from '../../api/UploadRequest';

const Post = ({ data }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [liked, setLiked] = useState(data.likes.includes(user._id));
  const [likes, setLikes] = useState(data.likes.length);
  const [persons, setPersons] = useState([]);

  const [isUpdated, setIsUpdated] = useState(false);
  const [image, setImage] = useState(null);
  const [desc, setDesc] = useState(data?.desc || '');

  const dispatch = useDispatch();

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  const updateItem = async (e) => {
    e.preventDefault();

    const post = {
      ...data,
      desc,
    };

    try {
      if (image) {
        const data = new FormData();
        const fileName = Date.now() + image.name;
        data.append('name', fileName);
        data.append('file', image);
        post.image = fileName;
        uploadImage(data);
      }
      dispatch(updatePost(data._id, post));
      setIsUpdated(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await UserApi.getAllUser();
      setPersons(data);
    };
    fetchPersons(0);
  }, []);

  const handleLike = () => {
    likePost(data._id, user._id);
    setLiked((prev) => !prev);
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1);
  };

  const handleDeletePost = (id, data) => {
    if (window.confirm('Voulez-vous supprimer ce post ?')) {
      dispatch(deletePost(id, data));
    }
  };

  return (
    <div className="Post" key={data._id}>
      <div className="postHeader">
        <div>
          {persons.map((person) => {
            if (person._id === data.userId) {
              return (
                <div className="postHeaderAlign" key={person._id}>
                  <img
                    className="profileItem"
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
            } else {
              return null;
            }
          })}
        </div>
        {user._id === data.userId || user.isAdmin === true ? (
          <div className="editPost">
            <UilPen
              width="1.2rem"
              height="1.2rem"
              onClick={() => setIsUpdated(!isUpdated)}
            />
            <UilTimes
              width="1.5rem"
              height="1.5rem"
              onClick={() => {
                handleDeletePost(data._id, {
                  userId: data.userId,
                  isAdmin: user.isAdmin,
                });
              }}
            />
          </div>
        ) : (
          ''
        )}
      </div>
      <div className="detail">
        {!isUpdated && <span>{data.desc}</span>}
        {isUpdated && (
          <div>
            <textarea
              onChange={(e) => setDesc(e.target.value)}
              defaultValue={data.desc}
            />
          </div>
        )}
      </div>

      {isUpdated === false ? (
        <img
          src={
            data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : ''
          }
          alt=""
        />
      ) : (
        <img
          src={image ? '' : process.env.REACT_APP_PUBLIC_FOLDER + data.image}
          alt=""
        />
      )}

      {image && (
        <div className="previewImage">
          <UilTimes onClick={() => setImage(null)} />
          <img src={URL.createObjectURL(image)} alt="" />
        </div>
      )}

      {isUpdated && (
        <div className="button-container">
          <div className="inputForm">
            <label htmlFor="profileImage">Modifier l'image</label>
            <input type="file" onChange={onImageChange} />
          </div>
          <button className="button ps-button" onClick={updateItem}>
            Enregistrer
          </button>
        </div>
      )}

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
