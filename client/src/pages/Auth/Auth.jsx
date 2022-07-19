import React, { useState } from 'react';
import './Auth.scss';
import Logo from '../../img/logo.svg';
import { useDispatch, useSelector } from 'react-redux';
import { logIn, signUp } from '../../actions/AuthAction';

const Auth = () => {
  const loading = useSelector((state) => state.authReducer.loading);
  const [isSignUp, setIsSignUp] = useState(false);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    firstname: '',
    lastname: '',
    password: '',
    confirmpass: '',
    email: '',
  });

  const [confirmPass, setConfirmPass] = useState(true);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      data.password === data.confirmpass
        ? dispatch(signUp(data))
        : setConfirmPass(false);
    } else {
      dispatch(logIn(data));
    }
  };

  const resetForm = () => {
    setConfirmPass(true);
    setData({
      firstname: '',
      lastname: '',
      password: '',
      confirmpass: '',
      email: '',
    });
  };

  return (
    <div className="Auth">
      <div className="topAuth">
        <img src={Logo} alt="" />
        <h1>Groupomania</h1>
      </div>

      <div className="connexionPannel">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "S'inscrire" : 'Se connecter'}</h3>

          {isSignUp && (
            <div>
              <input
                type="text"
                placeholder="Nom"
                className="infoInput"
                name="lastname"
                onChange={handleChange}
                value={data.lastname}
              />
              <input
                type="text"
                placeholder="Prénom"
                className="infoInput"
                name="firstname"
                onChange={handleChange}
                value={data.firstname}
              />
            </div>
          )}

          <div>
            <input
              type="email"
              className="infoInput"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              value={data.email}
            />
          </div>

          <div>
            <input
              type="password"
              className="infoInput"
              name="password"
              placeholder="Mot de passe"
              onChange={handleChange}
              value={data.password}
            />

            {isSignUp && (
              <input
                type="password"
                className="infoInput"
                name="confirmpass"
                placeholder="Confirmer le mot de passe"
                onChange={handleChange}
                value={data.confirmpass}
              />
            )}
          </div>

          <span
            style={{
              display: confirmPass ? 'none' : 'block',
              color: 'red',
              fontSize: '12px',
              alignSelf: 'flex-start',
              marginTop: '5px',
              gap: 'none !important',
            }}
          >
            * Les mots de passe ne sont pas les mêmes. Veuillez réessayer.
          </span>

          <div className="bottomForm">
            <div>
              <button
                className="button infoButton"
                type="submit"
                disabled={loading}
              >
                {loading
                  ? 'Loading...'
                  : isSignUp
                  ? "S'inscrire"
                  : 'Se connecter'}
              </button>

              <span
                className="link"
                onClick={() => {
                  setIsSignUp((prev) => !prev);
                  resetForm();
                }}
              >
                {isSignUp
                  ? 'Vous avez déjà un compte ? Connectez-vous !'
                  : "Vous n'avez pas de compte? Inscrivez-vous !"}
              </span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
