import "./Message.css"
import defaultImg from "../../images/default_profile.png"
import Moment from "react-moment";

const Message = ({message,own}) => {
  // console.log(message,"message");
  // console.log(own,"own");
  return (
    <div className={`message ${own}`}>
        <div className="messageTop">
            <img src={defaultImg} alt="" className="messageImg" />
            <p className="messageText">{message.text}</p>
        </div>
        <div className="messageBottom">
        <Moment fromNow interval={30}>
          {message.createdAt}
        </Moment>
          </div>
    </div>
  )
}

export default Message