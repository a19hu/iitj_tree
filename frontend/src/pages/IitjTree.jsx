import '../Style/tree.css'
import React, { useState } from 'react'
import Profile from "../component/Profile";
import profileimg from '../image/download.jpeg'
import { useNavigate } from 'react-router-dom';



const IitjTree = ({ data }) => {
  const navigate = useNavigate();
  // if (data.parentid === null) {
  //   return navigate('/');

  // }
  // console.log(data)
  const studentid = data.student
  const parentid = data.parent
  const children = data.children
  const siblings = data.sibling
  const treeDatas = [];
 
  const parentNode = {
    name:parentid.name,
    rollNo: parentid.roll_no,
    picture: parentid.picture,
    children: []
  };
  const studentNode = {
    name:studentid.name,
    rollNo: studentid.roll_no,
    picture: studentid.picture,
    children: []
  };
  parentNode.children.push(studentNode);
  siblings.forEach(sibling => {
    const siblingNode = {
    name:sibling.name,
      rollNo: sibling.roll_no,
      picture: sibling.picture,
      children: []
    };
    parentNode.children.push(siblingNode);
  });
  children.forEach(child => {
    const childNode = {
    name:child.name,
      rollNo: child.roll_no,
      picture: child.picture,
    };
    studentNode.children.push(childNode);
  });

  treeDatas.push(parentNode);
  // console.log(treeDatas)
  const [searchId, setSearchId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = (Id) => {
    console.log(Id)
    setShowModal(true)
    setSearchId(Id)
  };
  const toggleModals = (Id) => {
    setShowModal(false)
  };


  const Familytree = (treeDatas) => {
    return (
      <>
        <ul>
          {treeDatas.map((item, index) =>
            <li className={item.name + index} key={index}>
              <div className="container" >

                <div className="container_info">
                  <div className="hovertext" onClick={() => toggleModal(item.rollNo)}>{item.name.slice(0,15) + ''}</div>
                  <div className="info">
                    <img src={item.picture ? item.picture.replace('open', 'thumbnail') : profileimg } onClick={() => toggleModal(item.rollNo)} alt=""  />
                  </div>


              </div>
              </div>
                  {showModal && (
                    <Profile toggleModal={toggleModals} searchId={searchId} />
                  )}


              {
                item.children && item.children.length ?
                  Familytree(item.children)
                  : ''
              }
            </li>

          )}

        </ul>
      </>
    )
  }
  return (

    <div className="tree">

      {
        Familytree(treeDatas)
      }
    </div>
  )
}



export default IitjTree
