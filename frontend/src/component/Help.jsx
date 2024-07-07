import React,{useEffect} from 'react'
import '../Style/help.css'
import { AiOutlineCloseCircle } from 'react-icons/ai';


const Help = ({toggleModal,showModal}) => {
  useEffect(() => {
    const timerId = setTimeout(() => {
    }, 3000);

    return () => clearTimeout(timerId);
  }, []);
  return (
    <div  className={`modalhelp  ${showModal ? 'visible' : 'notvisible'}`}>
          <div className="modal-contenthelp">
          <AiOutlineCloseCircle style={{ fontSize: '2rem',  }} onClick={toggleModal}  className='closes'/>

            <p><span>Instructions :-</span><br />
        <span>1. Search for any Roll Number or Name. If multiple options are presented select one among them.<br />
2. Hovering on name shows the student's image. <br />
 3. Drag empty screen area for panning. <br />
   4. Scroll mouse for zooming. <br />
   5. Click on student to toggle his mentees. <br />
   6. In case of any discrepancy, please click on "Report an Error" at bottom-left of this page.</span> </p>
          </div>
        </div>
  )
}

export default Help
