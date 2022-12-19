
import "./Blocked.css"
import blockedImg from "../../images/block.png"
const Blocked = () => { 
  return (
    <div id='BlockPage'>
      <div id="BlockPagContainer">
       <img src={blockedImg} alt="" srcset="" />
       You are Blocked 
      </div>
    </div>
  )
}

export default Blocked