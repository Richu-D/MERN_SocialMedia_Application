import { Dots, Photo } from "../../svg";
export default function AddToYourPost({ setShowPrev,setImages }) {
  return (
    <div className="addtoyourpost">
      <div className="addto_text">Add to your post</div>
      <div style={{display:"flex"}}>
      <div
        className="post_header_right hover1"
        onClick={() => { 
          setShowPrev(prev => !prev)
          setImages(null)
        }}
        
        >
        <Photo color="#45bd62" />
      </div>
      <div className="post_header_right hover1">
        <Dots color="#65676b" />
      </div>
        </div>
    </div>
  );
}
