import React from 'react'
import '../Style/profile.css'
import { Link } from "react-router-dom";
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { FaLinkedin } from 'react-icons/fa';
import { useQuery, gql } from "@apollo/client";
import { FaChevronRight } from 'react-icons/fa';
function Profile({ toggleModal, searchId }) {
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
  var { loading, data } = useQuery(FILMS_QUERY, {
    variables: { searchId },
  });
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
        <a href={data.linkedIn} ><FaLinkedin  className='linkedicon' /></a>
        <Link to={`/search/${window.btoa(data.rollNo)}`} >
                <FaChevronRight  className='iconbutton' />
        </Link>
          </>
        :
"loading"}
      </div>
    </div>
  )
}

export default Profile
