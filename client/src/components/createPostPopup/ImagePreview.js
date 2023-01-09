import { useRef } from "react";
import EmojiPickerBackgrounds from "./EmojiPickerBackgrounds";

export default function ImagePreview({
  text,
  user,
  setText,
  images,
  setImages,
  setShowPrev 
}) {
  const imageInputRef = useRef(null);
  const handleImages = (e) => {
    console.log("e.target",e.target.files[0]);
    setImages(e.target.files[0])
  };
  return (
    <div className="overflow_a">
      <EmojiPickerBackgrounds text={text} user={user} setText={setText} type2 />
      <div className="add_pics_wrap">
        <input
          type="file"
          accept="image/*"
          hidden
          ref={imageInputRef}
          onChange={handleImages}
        />
        {images ? (
          <>
          <div id="selected-image-container">
         <img id="selected-image" alt="upload" src={URL.createObjectURL(images)} />

         <i id="delete-selected-image" className="fa-solid fa-trash" onClick={()=>{
          setImages(null)
          imageInputRef.current.value = ''
          }} />
          </div>
          </>
        ) : (
          <div className="add_pics_inside1">
            <div className="small_white_circle">
            <i className="fa-regular fa-circle-xmark" onClick={()=>{setShowPrev(false)}} />
            </div>
            <div
              className="add_col"
              onClick={() => {
                imageInputRef.current.click();
              }}             
            >
              <div className="add_circle">
                <i className="fa-solid fa-photo-film" />
              </div>
              <span>Add Photo</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
