import { Modal, useMantineTheme } from '@mantine/core';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { uploadImage } from '../../actions/UploadAction';
import { updateUser } from '../../actions/UserAction';

function ProfileModal({ modalOpened, setModalOpened, data }) {
  const theme = useMantineTheme();

  const { password, ...other } = data;
  const [formData, setFormData] = useState(other);
  const [profileImage, setProfileImage] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const dispatch = useDispatch();
  const param = useParams();

  const [inputText, setInputText] = useState('');
  const [characterLimit] = useState(180);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setInputText(e.target.value);
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      event.target.name === 'profileImage'
        ? setProfileImage(img)
        : setCoverImage(img);
    }
  };

  // form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    let UserData = formData;
    if (profileImage) {
      const data = new FormData();
      const fileName = Date.now() + profileImage.name;
      data.append('name', fileName);
      data.append('file', profileImage);
      UserData.profileImage = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    if (coverImage) {
      const data = new FormData();
      const fileName = Date.now() + coverImage.name;
      data.append('name', fileName);
      data.append('file', coverImage);
      UserData.coverImage = fileName;
      try {
        dispatch(uploadImage(data));
      } catch (err) {
        console.log(err);
      }
    }
    dispatch(updateUser(param.id, UserData));
    setModalOpened(false);
  };

  return (
    <Modal
      overlayColor={
        theme.colorScheme === 'dark'
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      centered
      size="42.5%"
      opened={modalOpened}
      padding="md"
      onClose={() => setModalOpened(false)}
    >
      <form className="infoFormProfile" onSubmit={handleSubmit}>
        <h3>Éditer le profil</h3>

        <div>
          <div className="inputForm">
            <label htmlFor="firstname">Prénom</label>
            <input
              type="text"
              className="infoInput"
              name="firstname"
              placeholder="Prénom"
              onChange={handleChange}
              value={formData.firstname}
            />
          </div>

          <div className="inputForm">
            <label htmlFor="lastname">Nom</label>
            <input
              type="text"
              className="infoInput"
              name="lastname"
              placeholder="Nom"
              onChange={handleChange}
              value={formData.lastname}
            />
          </div>
        </div>

        <div className="inputForm">
          <label htmlFor="worksAt">Poste</label>
          <div>
            <input
              type="text"
              className="infoInput"
              name="worksAt"
              placeholder="Poste"
              onChange={handleChange}
              value={formData.worksAt}
            />
          </div>
        </div>

        <div className="inputForm">
          <label htmlFor="livesIn">Habite à</label>
          <input
            type="text"
            className="infoInput"
            name="livesIn"
            placeholder="Habite à"
            onChange={handleChange}
            value={formData.livesIn}
          />
        </div>

        <div className="inputForm">
          <label htmlFor="about">Bio</label>
          <textarea
            type="text"
            className="infoInput"
            placeholder="Bio"
            name="about"
            onChange={handleChange}
            value={formData.about}
            maxLength="180"
          />
          <div className="count">
            {inputText.length}/{characterLimit}
          </div>
        </div>

        <div className="imgUpload">
          <div className="inputForm">
            <label htmlFor="profileImage">Image de profil</label>
            <input type="file" name="profileImage" onChange={onImageChange} />
          </div>
          <div className="inputForm">
            <label htmlFor="coverImage">Bannière de profil</label>
            <input type="file" name="coverImage" onChange={onImageChange} />
          </div>
        </div>

        <button className="button infoButton">Enregistrer</button>
      </form>
    </Modal>
  );
}

export default ProfileModal;
