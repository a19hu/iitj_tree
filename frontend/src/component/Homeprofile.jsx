import React from 'react'
import '../Style/profile.css'
import { useQuery, gql, } from "@apollo/client";
import demo from '../image/download.jpeg'
const Homeprofile = ({rollNo}) => {

  const FILMS_QUERY = gql`
 query Query($rollNo: String!) {

  studentSearch(searchQuery: $rollNo) {
        name
        rollNo
        year
        picture
      }
    }`;

  var { loading, data } = useQuery(FILMS_QUERY, {
    variables: { rollNo },
  });
  if (!loading) {
    data = data.studentSearch[0]
  }
  return (
     <div className="modalprofile">
      <div className="modal-contentprofile">
              {loading ? <p>Loading...</p> : 
              <>
            <div className='containerimag'>
              <img src={data.picture ? data.picture : demo} alt="" />
            </div>
            <div className='detailcontainer'> 

            <p><span>NAME : </span>{data.name}</p>
            <p><span>ROLL NUMBER :</span> {data.rollNo}</p>
            <p><span>BATCH OF {parseInt(data.year)+4}</span></p>
             </div>
            </>
              }

          </div>
        </div>
  )
}

export default Homeprofile
