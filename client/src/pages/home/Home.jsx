import React from 'react'
import PostSide from '../../components/PostSide/PostSide';
import ProfileSide from '../../components/ProfileSide/ProfileSide';
import RightSide from '../../components/RightSide/RightSide';
import './Home.scss'

const Home = () => {
  return (
    <div className="Home">
        <div className='flexSide'><ProfileSide/></div>
        <div className='flexMain'><PostSide/></div>
        <div className='flexSide'><RightSide/></div>
    </div>
  )
}

export default Home