import React, { useState, useRef } from 'react';

import { UilScenery } from '@iconscout/react-unicons';
import { UilPlayCircle } from '@iconscout/react-unicons';
import { UilLocationPoint } from '@iconscout/react-unicons';
import { UilSchedule } from '@iconscout/react-unicons';
import { UilTimes } from '@iconscout/react-unicons';

import { useDispatch, useSelector } from 'react-redux';
import { uploadImage, uploadPost } from '../../actions/UploadAction';

import TextareaAutosize from 'react-textarea-autosize';

const PostShare = () => {
  const loading = useSelector((state) => state.postReducer.uploading);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  const [image, setImage] = useState(null);
  const desc = useRef();

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  // handle Image Change
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setImage(img);
    }
  };

  const imageRef = useRef();

  const reset = () => {
    setImage(null);
    desc.current.value = '';
  };

  // handle post upload
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!image && desc.current.value == '') {
      window.alert('Vous devez au moins poster une image ou un texte.');
    } else if (desc.current.value || image) {
      //post data
      const newPost = {
        userId: user._id,
        desc: desc.current.value,
      };

      // if there is an image with post
      if (image) {
        const data = new FormData();
        const fileName = Date.now() + image.name;
        data.append('name', fileName);
        data.append('file', image);
        newPost.image = fileName;
        try {
          dispatch(uploadImage(data));
        } catch (err) {
          console.log(err);
        }
      }
      dispatch(uploadPost(newPost));
      reset();
    }
  };

  return (
    <div>
      <div className="PostShare">
        <div className="inputField">
          <img
            src={
              user.profileImage
                ? serverPublic + user.profileImage
                : serverPublic + 'defaultProfile.png'
            }
            alt=""
          />
          <TextareaAutosize ref={desc} required placeholder="Quoi de neuf ?" />
        </div>

        <div>
          <div className="PostOptions">
            <div
              className="option photo"
              onClick={() => imageRef.current.click()}
            >
              <UilScenery />
              Photo
            </div>
            <div className="option video">
              <UilPlayCircle />
              Video
            </div>{' '}
            <div className="option location">
              <UilLocationPoint />
              Je suis là
            </div>{' '}
            <div className="option shedule">
              <UilSchedule />
              Événement
            </div>
            <button
              className="button ps-button"
              onClick={handleUpload}
              disabled={loading}
            >
              {loading ? 'Chargement' : 'Publier'}
            </button>
            <div style={{ display: 'none' }}>
              <input
                type="file"
                name="myImage"
                ref={imageRef}
                onChange={onImageChange}
              />
            </div>
          </div>

          {image && (
            <div className="previewImage">
              <UilTimes onClick={() => setImage(null)} />
              <img src={URL.createObjectURL(image)} alt="" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostShare;
