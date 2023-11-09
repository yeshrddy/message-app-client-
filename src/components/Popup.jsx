import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


const Popup = ({socket}) => {

  const [roomID, setRoomID] = useState('')
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e)=> {
    e.preventDefault();
    console.log({roomID})
    if(roomID){
      socket.emit("join__room", {roomID})
      navigate(`/${roomID}`)
      setRoomID("")
      setToggle(false)
    }
  }

  return (
    <>
      {toggle &&(
        <div className="popup-container blur">
          <div className="popup">
            <h2 className="popup__title">Create a room or Join one</h2>
            <p className="popup__desc"></p>
            <form action="">
              <input 
                className='popup__input'
                type="text"
                value={roomID}
                onChange={(e) => setRoomID(e.target.value)}
              />
              <button className="popup__btn" onClick={handleSubmit}>Join</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}


export default Popup