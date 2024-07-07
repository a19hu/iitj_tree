import React from 'react';
import { useQuery, gql, } from "@apollo/client";
import "../Style/serachreasult.css";
import IitjTree from './IitjTree';
import { useData } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Search = () => {
  const { searchtexts } = useData()
  const navigate = useNavigate();

  
  const FILMS_QUERY = gql`
 query ($searchtexts: String!) {

  studentSearch(searchQuery: $searchtexts) {
        name
        roll_no
        year
        picture
        parentId
      }
  
      
      children(rollNumber:$searchtexts) {
     name
        roll_no
        year
        picture
  }
  parent(rollNumber:$searchtexts) {
      name
        roll_no
        year
        picture
  }
  sibling(rollNumber:$searchtexts) {
     name
        roll_no
        year
        picture
  }
  student(rollNumber:$searchtexts) {
      name
        roll_no
        year
        picture
  }

  
    }
  `;

  const { loading, error, data } = useQuery(FILMS_QUERY, {
    variables: { searchtexts},
  });
  if(!loading){

    const datas = data.studentSearch[0].parentId
    if(datas == null || data.parent == null){
      toast.success("Successfully email send",
        {
          position: "top-center",
          autoClose: 5000,
          closeOnClick: true,
          progress: undefined,
          hideProgressBar: false,
          pauseOnHover: true,
        }
      );  
      // navigate('/');
    //  return  navigate('/');
    }
  }


  // if (loading) return <p>Loading...</p>; 
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
