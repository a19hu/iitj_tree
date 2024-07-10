import React from 'react'
import '../Style/profile.css'
import { Link } from "react-router-dom";
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FaLinkedin } from 'react-icons/fa';
import { useQuery, gql } from "@apollo/client";
import { FaChevronRight } from 'react-icons/fa';
import { useData } from '../context/DataContext';
function Profile({ toggleModal, searchId }) {
  const { updatesearch } = useData()
   const FILMS_QUERY = gql`
    query Query($searchId: String!) {
      studentSearch(searchQuery: $searchId) {
        name
        rollNo
        year
        picture
        
      }
        }
      `;
  var { loading, error, data } = useQuery(FILMS_QUERY, {
    variables: { searchId },
  });
  if (error) return <p>Connection Error..</p>;
  const toggleModals = (Id) => {
    updatesearch(Id)
  }
  if(!loading){

    data = data.studentSearch[0]
  }
  return (
    <div className="modalprofile">
      <div className="modal-contentprofile">
        {!loading ? 
        <>
        <AiOutlineCloseCircle  onClick={toggleModal} className='closespro' />

            <img src={data.picture ? data.picture : ''} alt="" className='imagepro' />
        <p><span>Name:</span> {data.name}</p>
        <p><span>ROLL NUMBER : </span>{data.rollNo}</p>
        <p><span>BATCH OF {parseInt(data.year)+4} </span></p>

        <Link to={data.linkedIn} target='_blank' >
        <FaLinkedin  className='linkedicon' />
        </Link>
        <Link to='/search' onClick={toggleModal}>
                <FaChevronRight onClick={() => toggleModals(data.rollNo)} className='iconbutton' />
        </Link>
          </>
        :
"loading"}
      </div>
    </div>
  )
}

export default Profile
