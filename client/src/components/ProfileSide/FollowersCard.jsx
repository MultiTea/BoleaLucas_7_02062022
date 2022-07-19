import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAllUser } from '../../api/UserRequest';
import User from '../User/User';

const FollowersCard = () => {
  const [persons, setPersons] = useState([]);
  const { user } = useSelector((state) => state.authReducer.authData);

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data);
    };
    fetchPersons(0);
  }, []);

  return (
    <div className="FollowersCard">
      <h3>Suggestions</h3>

      {persons.map((person, id) => {
        if (person._id !== user._id) {
          return <User person={person} key={id} />;
        }
      })}
    </div>
  );
};

export default FollowersCard;
