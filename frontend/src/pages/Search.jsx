import React from 'react';
import { useQuery, gql, } from "@apollo/client";
import IitjTree from './IitjTree';
import { useNavigate,useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Search = () => {
  // const { searchtexts } = useData()
  const navigate = useNavigate();
  var { id } = useParams();
  const searchtexts=id.toUpperCase();
  // console.log(searchtexts)
  const FILMS_QUERY = gql`
 query Query($searchtexts: String!) {

  studentSearch(searchQuery: $searchtexts) {
        name
        rollNo
        year
        picture
        parentId
      }
  
      
      children(rollNumber:$searchtexts) {
     name
        rollNo
        year
        picture
  }
  parent(rollNumber:$searchtexts) {
      name
        rollNo
        year
        picture
  }
  sibling(rollNumber:$searchtexts) {
     name
        rollNo
        year
        picture
  }
  student(rollNumber:$searchtexts) {
      name
        rollNo
        year
        picture
  }

  
    }
  `;
  
  const { loading, error, data } = useQuery(FILMS_QUERY, {
    variables: { searchtexts},
  });
  console.log(data)
  if(!loading){
    const datas = data.studentSearch[0].parentId
    if(datas == null || data.parent == null){
      // navigate('/');
    //  return  navigate('/');
    }
  }
  if (error) return <p> connection error...</p>;
  return (
    <div className='topmargin'>
      <div className="text">
        <div className='treediv'>
          {loading ? <p>Loading...</p> : data.studentSearch[0].parentId == null || data.parent == null ? navigate('/') : <IitjTree data={data} />}
              </div>
        <ToastContainer />

      </div>

    </div>
  )
}

export default Search
