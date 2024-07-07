import React,{useEffect,useState} from 'react'
import '../Style/profile.css'
import '../Style/homeprofile.css'
import { useQuery, gql, } from "@apollo/client";
import demo from '../image/download.jpeg'
const Homeprofile = ({rollNo}) => {
  const [imageUrl, setImageUrl] = useState(demo);

  const FILMS_QUERY = gql`
 query Query($rollNo: String!) {

  studentSearch(searchQuery: $rollNo) {
        name
        roll_no
        year
        picture
      }
    }`;

  var { loading, error, data } = useQuery(FILMS_QUERY, {
    variables: { rollNo },
  });
  console.log(data)
  // if (!loading) {
  //   data = data.studentsearch[0]
  // }
  useEffect(() => {
    // if (!loading && data.picture != null) {
    //   const formattedUrl = data.picture.replace('open', 'thumbnail');

    //   setImageUrl(formattedUrl);
    //   console.log('this is image',data.picture)
    // }

  }, [data]);
  return (
     <div className="modalhprop">
          <div className="modal-contenthomeprofile">
              {loading ? <p>Loading...</p> : 
              <>
            <div className='containerimag'>
              <img src={imageUrl} alt="" />
            </div>
            {/* <div className='detailcontainer'> 

            <p><span>NAME : </span>{data.name}</p>
            <p><span>ROLL NUMBER :</span> {data.roll_no}</p>
            <p><span>BATCH OF {parseInt(data.year)+4}</span></p> */}
            {/* </div> */}
            </>
              }

          </div>
        </div>
  )
}

export default Homeprofile
