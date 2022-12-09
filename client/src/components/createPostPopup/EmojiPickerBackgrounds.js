import { useEffect, useRef, useState } from "react";
import Picker from "emoji-picker-react";
import colorful from "../../images/colorful.png"
import useClickOutside from "../../helpers/clickOutside.js"

export default function EmojiPickerBackgrounds({ text, user, setText, type2 }) {
  const [picker, setPicker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState();
  const textRef = useRef(null);
  const emojiPromt = useRef(null)             
  const emojiIcon = useRef(null)             
  useClickOutside(emojiPromt,(e)=>{
    if (!emojiIcon.current || emojiIcon.current.contains(e.target)) {
      return;
    }
    setPicker(false)
  })
  

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
    setCursorPosition(start.length + emoji?.length);
  };
  return (
    <div className={type2 ? "images_input" : ""}>
      <div className={!type2 ? "flex_center" : ""}>
        <textarea
          ref={textRef}
          maxLength="100"
          value={text}
          placeholder={`What's on your mind, ${user.first_name}`}
          className={`post_input ${type2 ? "input2" : ""}`}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </div>
      <div className={!type2 ? "post_emojis_wrap" : ""}>
        {picker && (
          <div ref={emojiPromt}
            className={`comment_emoji_picker ${
              type2 ? "movepicker2" : "rlmove"
            }`}
          >
            <Picker onEmojiClick={handleEmoji} />
          </div>
        )}
        {!type2 && <img src={colorful} alt="" />}
        <i ref={emojiIcon}
          className={`fa-regular fa-face-smile ${type2 ? "moveleft" : ""}`}
          onClick={() => {
            setPicker((prev) => !prev);
          }}
        ></i>
      </div>
    </div>
  );
}
