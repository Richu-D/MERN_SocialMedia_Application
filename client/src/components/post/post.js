import { Link } from "react-router-dom";
import "./style.css";
import Moment from "react-moment";
import defaultProfile from "../../images/default_profile.png"
// import { Dots } from "../../svg";
import CreateComment from "./CreateComment";
import useInstance from "../../axios/axiosInstance";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import Comment from "../comment/Comment.js";
export default function Post({ post,setReloadPost }) {
  let { user } = useSelector((user) => ({ ...user }));
  const [like,setLike] = useState(post.like.includes(user?.id))
  const [likeCount,setLikeCount] = useState(post.like.length)
  const [editingMood,setEditingMood] = useState(false)
  const [textValue,setTextValue] = useState(null)
  const [showComment,setShowComment] = useState(false)
  const postEditTextRef = useRef(null)

  const instance = useInstance() 
  return (
    <div className="post">
      <div className="post_header">
        <Link
          to={`/profile/${post.user.username}`}
          className="post_header_left">
          <img src={post?.user?.picture||defaultProfile} alt="" />
          <div className="header_col">
            <div className="post_profile_name">
              {post.user.first_name} {post.user.last_name}
              <div className="updated_p">
                {post.type === "profilePicture" &&
                  `updated ${
                    post.user.gender === "male" ? "his" : "her"
                  } profile picture`}
                {post.type === "cover" &&
                  `updated ${
                    post.user.gender === "male" ? "his" : "her"
                  } cover picture`}
              </div>
            </div>
            <div className="post_profile_privacy_date">
              <Moment fromNow interval={30}>
                {post.createdAt}
              </Moment>
              
            </div>
            <span className="edited_post">{(post.edited)?"Edited":""}</span>
          </div>
        </Link>
          {user.id === post.user._id &&
        <div className="post_header_right hover1">
          <i className="fa-solid fa-pen-to-square" onClick={ ()=>{
            setEditingMood(prev => !prev)
            setTextValue(post.text)
          }}/>
          
          <i className="fa-solid fa-trash" onClick={async ()=>{
           try {
            let result = await instance.delete(`post/${post._id}`)
            console.log(result);
            if(result?.data?.status){
              setReloadPost(prev => !prev)
           }
           } catch (error) {
             console.log(error);
           }
          }}/>
    
        </div>
        }
      </div>
      {post.bgcolor ? (
        <div
          className="post_bg"
          style={{ backgroundColor: `${post.bgcolor}` }}
        >
          <div className="post_bg_text">{post.text}</div>
        </div>
      ) : (
        <div className="post_container">
          <div className="post_text">{post.text}</div>
          {(editingMood)?
          <div className="post_text_edit">
            <input className="post_text_edit_input" type="text" value={textValue} onChange={(e) => setTextValue(e.target.value)}  />
            <button className="cancel" onClick={()=>{setEditingMood(false)}}>cancel</button>
            <button className="save" onClick={async ()=>{
              try {
                let text = textValue;
                if(!text) return
                if(text.trim().length<=1) return
                let result = await instance.put(`post/${post._id}`,{
                  text
                })
                console.log(result);
                if(result?.data?.status){
                  setReloadPost(prev => !prev)
                  setEditingMood(false)
               }
               } catch (error) {
                 console.log(error);
                 if(error?.response?.data?.status){
                  setReloadPost(prev => !prev)
                  setEditingMood(false)
               }
               
            }}}>save</button>
          </div>
          :""}
          {post?.image && (
            <div className="postImageContainer">
            <img src={post.image} alt="post"></img> 
            </div>
          )}
        </div>
      )}
      <div className="post_infos">
        <div className="like_count">
          {/* <div className="like_count_imgs">imgs</div> */}
          <div className="like_count_num">{(likeCount)?`${likeCount} People Liked`:""}</div>
        </div>
        <div className="to_right">
          <div className="comments_count">{(post?.comments?.length)?`${post?.comments?.length} comments`:""}</div>
          <div className="share_count"></div>
        </div>
      </div>
      <div className="post_actions">
      <div className="post_action hover1" onClick={async ()=>{
        try {
         let result = await instance.put(`post/likeAndUnlike/${post._id}`)
         setLike(result?.data?.status)
         if(result?.data?.status){
          setLikeCount(prev => prev+1)
        }else{
           setLikeCount(prev => prev-1)
         }
        } catch (error) {
          console.log(error);
        }
      }}>
          <i className="fa-solid fa-heart"  style={{color:(like) ? "red" : "gray"}} />
          <span>Like</span>
        </div>
  
        <div className="post_action hover1" onClick={()=>{setShowComment(prev => !prev)}}>
          <i className="fa-regular fa-comment" /> 
          <span>Comment</span>
        </div>
        <div className="post_action hover1">
          <i className="fa-regular fa-share-from-square" /> 
          <span>Share</span>
        </div>
      </div>
      <div className="comments_wrap">
        <CreateComment setReloadPost={setReloadPost} post={post}/>
        {(showComment)?
        <div className="comments_list">
        {
          post?.comments.reverse().map(comment =>{
            return <Comment setReloadPost={setReloadPost} postId={post._id} key={comment?._id} comment={comment} />
          })
        }
        </div>
        :""}

      </div>
    </div>
  )}
  

