import { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";
import { useSelector } from "react-redux";
import defaultProfilePic from "../../images/default_profile.png"
import useInstance from "../../axios/axiosInstance";

export default function CreateComment({post,setReloadPost,setShowComment}) {
  const instance = useInstance() 
  const { user } = useSelector((user) => ({ ...user }));
  const [picker, setPicker] = useState(false);
  const [text, setText] = useState("");
  const [error, setError] = useState("");
  const [commentImage, setCommentImage] = useState("");
  const [cursorPosition, setCursorPosition] = useState();
  const textRef = useRef(null);
  const imgInput = useRef(null);
  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;
  }, [cursorPosition]);
  const handleEmoji = (e, { emoji }) => {
    const ref = textRef.current;
    ref.focus();
    const start = text.substring(0, ref.selectionStart);
    const end = text.substring(ref.selectionStart);
    const newText = start + emoji + end;
    setText(newText);
    setCursorPosition(start.length + emoji.length);
  };
  const handleImage = (e) => {
    let file = e.target.files[0];
    if (
      file.type !== "image/jpeg" &&
      file.type !== "image/png" &&
      file.type !== "image/webp" &&
      file.type !== "image/gif"
    ) {
      setError(`${file.name} format is not supported.`);
      return;
    } else if (file.size > 1024 * 1024 * 5) {
      setError(`${file.name} is too large max 5mb allowed.`);
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      setCommentImage(event.target.result);
    };
  };

  async function handleMsgUpload(){
      try {
        if(text.trim()==="") return ; //need to show empty error msg
          let result = await instance.post(`/comment/${post._id}`,{ "comment":text })
            if(result?.data?.status){
              setText("")
              setReloadPost(prev => !prev)
              setShowComment(true)
              // need to show success message 
            }
      } catch (error) {
        console.log(error);
      }
  }

  return (
    <div className="create_comment_wrap">
      <div className="create_comment">
        <img src={user?.picture}
        onError={(e) => {
          e.target.src = defaultProfilePic;
        }}
        alt="command profile" />
        <div className="comment_input_wrap">
          {picker && (
            <div className="comment_emoji_picker">
              <Picker onEmojiClick={handleEmoji} />
            </div>
          )}
          <input
            type="file"
            hidden
            ref={imgInput}
            accept="image/jpeg,image/png,image/gif,image/webp"
            onChange={handleImage}
          />
          {error && (
            <div className="postError comment_error">
              <div className="postError_error">{error}</div>
              <button className="blue_btn" onClick={() => setError("")}>
                Try again
              </button>
            </div>
          )}
          <input
            type="text"
            ref={textRef}
            value={text}
            placeholder="Write a comment..."
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e)=>{
              if(e.key==="Enter"){
                handleMsgUpload()
              }
          }}
          />
          <div
            className="comment_circle_icon hover2"
            onClick={() => {
              setPicker((prev) => !prev);
            }}
          >
            <i className="fa-regular fa-face-smile"></i>
          </div>
          <div
            className="comment_circle_icon hover2"
            onClick={() => imgInput.current.click()}
          >
            <i className="fa-solid fa-camera" />
          </div>
          <div className="comment_circle_icon hover2">
            <i className="fa-solid fa-note-sticky" />
          </div>
          <div className="comment_circle_icon hover2">
            <i className="fa-sharp fa-solid fa-paper-plane" onClick={handleMsgUpload}/>
          </div>
        </div>
      </div>
      {commentImage && (
        <div className="comment_img_preview">
          <img src={commentImage} alt="" />
          <div
            className="small_white_circle"
            onClick={() => setCommentImage("")}
          >
            <i className="fa-solid fa-circle-xmark" />
          </div>
        </div>
      )}
    </div>
  );
}
