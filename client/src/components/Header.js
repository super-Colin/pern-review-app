import React from 'react'
import {useHistory} from 'react-router-dom';

const Header = () => {
  let history = useHistory();

  const sendHome = (e)=>{
    e.preventDefault();
    // window.location.href = '/';
    history.push('/');
  }

  return (
    <div>
      <h1 onClick={sendHome} className="font-weight-light display-1 text-center">Restaurant Finder</h1>
    </div>
  )
}

export default Header
