import React, {useState} from 'react'
import background from "../image/background.jpeg";
import '../Style/home.css'
import { IoIosInformationCircle } from 'react-icons/io';
import Help from '../component/Help';
import DTree from './DTree';
import Team from './Team';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [teamshow,setteamshow] = useState(false)
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const team=()=>{
    setteamshow(!teamshow)
  }

   const mystyle={
    backgroundImage: `url(${background})`,
    backdropFilter: "blur(6px)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    height: "100vh",
    opacity: '0.8',
   };
  
  return (
    <>
    <div className="home" style={mystyle} >
      </div>
      <div className="typewriterStyle" >
      <div className="help">
      <IoIosInformationCircle style={{ fontSize: '2.5rem', color: 'white' }} onClick={toggleModal} />
      {showModal && (
                                <Help toggleModal={toggleModal} showModal={showModal}/>
                            )}
       <div className='team' onClick={team}>Team</div> 
       {teamshow && (
        <Team team={team} teamshow={teamshow}/>
       )}                    
      </div>
        <DTree/>
        {/* <img src="https://picsur.org/i/c4ed4a18-b261-426d-a7d1-586d1a451c0b.png" alt="" /> */}
       </div>
    </>
  )
}

export default Home
