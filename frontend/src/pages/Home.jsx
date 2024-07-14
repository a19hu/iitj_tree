import React, {useState} from 'react'
import '../Style/home.css'
import { IoIosInformationCircle } from 'react-icons/io';
import Help from '../component/Help';
import DTree from './DTree';
import Team from './Team';

const Home = ({data}) => {
  const [showModal, setShowModal] = useState(false);
  const [teamshow,setteamshow] = useState(false)
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const team=()=>{
    setteamshow(!teamshow)
  }

  return (
    <>
    <div className="home" >
      </div>
      <div className="typewriterStyle" >
      <div className="help">
      {/* <IoIosInformationCircle style={{ fontSize: '2.5rem', color: 'white' }} onClick={toggleModal} /> */}
      {showModal && (
                                <Help toggleModal={toggleModal} showModal={showModal}/>
                            )}
       <div className='team' onClick={team}>Team</div> 
       {teamshow && (
        <Team team={team} teamshow={teamshow}/>
       )}                    
      </div>
        <DTree data={data}/>
       </div>
    </>
  )
}

export default Home
