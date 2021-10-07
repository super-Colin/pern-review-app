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
      <h2 onClick={sendHome} className="pointerCursor bg-primary text-white font-weight-light display-4 text-center">Restaurant Finder</h2>
    </div>
  )
}

export default Header
