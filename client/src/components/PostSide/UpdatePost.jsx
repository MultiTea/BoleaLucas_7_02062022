import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, useMantineTheme } from '@mantine/core';
import { updatePost } from '../../api/PostRequest';

function UpdatePost({ modalOpened, setModalOpened, data }) {
  const theme = useMantineTheme();
  const { user } = useSelector((state) => state.authReducer.authData);
  const { post } = useSelector((state) => state.postReducer.posts); // Récupération des informations du posttion des informations de l'utilisateur

  const [formData, setFormData] = useState();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let PostData = formData;
    try {
      dispatch(updatePost(data._id));
      setModalOpened(false);
    } catch (err) {
      console.log(err);
    }
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
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
      <form className="infoFormProfile" onSubmit={handleSubmit}>
        <h3>Éditer le post</h3>
        <div>
          <div className="inputForm">
            <label for="desc">Description</label>
            <input
              type="text"
              className="infoInput"
              name="desc"
              onChange={handleChange}
              defaultValue={0}
            ></input>
          </div>
        </div>
        <button className="button infoButton">Enregistrer</button>
      </form>
    </Modal>
  );
}

export default UpdatePost;
