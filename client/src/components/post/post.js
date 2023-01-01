import { Link } from "react-router-dom";
import "./style.css";
import Moment from "react-moment";
import defaultProfile from "../../images/default_profile.png"
import { Dots } from "../../svg";
import CreateComment from "./CreateComment";
import useInstance from "../../axios/axiosInstance";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import Comment from "../comment/Comment.js";
import Swal from "sweetalert2";
import useClickOutside from "../../helpers/clickOutside";
export default function Post({ post,setReloadPost }) {

  let { user } = useSelector((user) => ({ ...user }));
  const [like,setLike] = useState(post.like.includes(user?.id))
  const [likeCount,setLikeCount] = useState(post.like.length)
  const [editingMood,setEditingMood] = useState(false)
  const [textValue,setTextValue] = useState(null)
  const [showComment,setShowComment] = useState(false)
  const [more,setMore] = useState(false)
  const [othersOption,setOthersOption] = useState(false)
  const postEditTextRef = useRef(null)
  const postPromt = useRef(null)
  const threeDots = useRef(null)
  useClickOutside(postPromt,(e)=>{
    if (!postPromt.current || postPromt.current.contains(e.target)) {
      return;
    }
    if (!threeDots.current || threeDots.current.contains(e.target)) {
      return;
    }
    setMore(false)
  })


  function handleDelete(){
    setMore(false)
       Swal.fire({
         title: 'Are you sure to delete this post ?',
         text: "You won't be able to revert this!",
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'delete'
       }).then(async(result) => {
         if (result.isConfirmed) {
           try {
             let result = await instance.delete(`post/${post._id}`)
             console.log(result);
             if(result?.data?.status){
               setReloadPost(prev => !prev)
            }
            } catch (error) {
              console.log(error);
            }
         }
       })
       }
  function handleReport(){
    setMore(false)
       Swal.fire({
         title: 'Are you sure to Report this post ?',
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Report'
       }).then(async(result) => {
         if (result.isConfirmed) {
           try {
             let result = await instance.patch(`post/report/${post._id}`)
             console.log(result);
             if(result?.data?.status){
               setReloadPost(prev => !prev)
            }
            } catch (error) {
              console.log(error);
            }
         }
       })
       }

function handleEdit(){
  setMore(false)
  setEditingMood(true)
  setTextValue(post.text)
}

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
              {post.user.username}
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
            <span className="edited_post">{(post.edited && post.type !== "cover" )?"Edited":""}</span>
          </div>
        </Link>
          {(user.id === post.user._id) 
        ? <div ref={threeDots} className="postEditMoreOption" onClick={()=>{setMore(prev => !prev)}}> <Dots /> </div>
        : <div  className="postEditMoreOption" onClick={()=>{setOthersOption(prev => !prev)}}> <Dots /> </div>
        }
        {
          more &&  <div className="post_header_right hover1" ref={postPromt}>
      
          <div className="open_post_edit" >
            {
              post.type !== "cover" 
              ?<div className="open_post_edit_item hover1" onClick={handleEdit} >
              <i className="fa-solid fa-pen-to-square" />
              Edit Post
               </div>
              :""
            }
              
              <div
                className="open_post_edit_item hover1" onClick={handleDelete}>
                 <i className="fa-solid fa-trash" />
                 Delete Post
              </div>
            </div>
        </div>
        }
        {
          othersOption &&  <div className="post_header_right hover1" ref={postPromt}>
      
          <div className="open_post_edit" >
              <div
                className="open_post_edit_item hover1" onClick={handleReport}>
                 <i className="fa-solid fa-circle-info" />
                 Report Post
              </div>
            </div>
        </div>
        }
      </div>

        <div className="post_container">
          <div className="post_text" style={{visibility:`${(post.text && post.type !== "cover" )?"visible":"hidden"}`}}>{post.text||"no msg and this text for maintain the space"}</div>
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
 
      <div className="post_infos">
        <div className="like_count">
          {/* <div className="like_count_imgs">imgs</div> */}
          <div className="like_count_num">{(likeCount)?`${likeCount} Liked`:""}</div>
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
        <CreateComment setShowComment={setShowComment} setReloadPost={setReloadPost} post={post}/>
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
  

