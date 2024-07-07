import "../Style/navbar.css";
import '../Style/searchsugg.css'
import { Link } from "react-router-dom";
import logo from "../image/logo.png";
import React,{useState} from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import { useQuery, gql } from "@apollo/client";
import { useNavigate } from 'react-router-dom';
import { useData } from "../context/DataContext";
import 'react-toastify/dist/ReactToastify.css';
function Navbar() {
  const navigate = useNavigate();
  const { setSearchtext, updateDataId } = useData();
  const [show, setShow] = useState(true);
  const [parentId, setParentId] = useState('');
  
  const handleback=()=>{
    setParentId('')
    setShow(!show) 
  }

  const FILMS_QUERY = gql`
    query Query($parentId: String!) {
      studentSearch(searchQuery: $parentId) {
        name
        rollNo
      }
        }
      `;
  const data = useQuery(FILMS_QUERY, {
    variables: { parentId },
  });
  console.log(data.data)
  // if (error) return <p>Error </p>;
  const toggleModal=(Id)=>{
    // toast.success("Successfully email send",
    //   {
    //     position: "top-center",
    //     autoClose: 5000,
    //     closeOnClick: true,
    //     progress: undefined,
    //     hideProgressBar: false,
    //     pauseOnHover: true,
    //   }
    // ); 
    updateDataId(Id)
    navigate('/search');
    setParentId('')
    setShow(!show)
     
  }
  return (
    <>{
      show ? 
    <div className="header">
      <div className="logo">
            <Link to='/'>

              <img src={logo} alt="Logo" />
            </Link>
            <div className="logotexts">
              <p>Indian Institute Of Technology Jodhpur</p>
              <p>भारतीय प्रौद्योगिकी संस्थान जोधपुर</p>
            </div>
      </div>
      <div className="app_link">
          <div className="treeD">
            <Link to="/">
              Home
            </Link>
          </div>
          <div className="treeD">
            <Link to="/ImageTree">
              Image tree
            </Link>
          </div>
          <div onClick={() => setShow(!show)} className="search">
              <IoSearch size={20} color="white" />


          </div>
         
          <ToastContainer />
      </div>

    </div>
    :
    <>
    <div className=" header_search">
            <IoMdArrowRoundBack onClick={handleback} color="white" size={20}   style={{cursor:"pointer"}}/>

        <div>
         
            <input
              type="text"
              className="searchInput"
              placeholder="Search ..."
              value={parentId}
              onChange={(e) => setParentId(e.target.value)}
            />
        </div>

    </div>
    {parentId ? 
          <div className='modalresult'>
            <div className="modal-contenthelpsu">

              <div className='searchtext'>
                {/* {
                  loading ? <p>Loading...</p> :
                       data.studentSearch.length > 0  ?
              data.studentSearch.slice(0,5).map((student, index) => (
                <div key={index}
                  onClick={() => toggleModal(student.roll_no)}
                >
                 
                    {student.name} ({student.roll_no})
                </div>
              )) : 'No match with your name or roll number'
            
                } */}
                
              </div>

            </div>
          </div>

          : <div></div>
}
    </>
    }
      

    </>
  );
}

export default Navbar;
