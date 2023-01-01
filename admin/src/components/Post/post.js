import "./style.css";
import Moment from "react-moment";
import defaultProfile from "../../images/default_profile.png"
import useInstance from "../../axios/axiosInstance";
import { useRef, useState } from "react";
import Comment from "../comment/Comment";
// import Swal from "sweetalert2";
export default function Post({ post,setReloadPost }) {

  const [showComment,setShowComment] = useState(false)
  


 async function handleDelete(){
//     setMore(false)
//        Swal.fire({
//          title: 'Are you sure to delete this post ?',
//          text: "You won't be able to revert this!",
//          icon: 'warning',
//          showCancelButton: true,
//          confirmButtonColor: '#3085d6',
//          cancelButtonColor: '#d33',
//          confirmButtonText: 'delete'
//        }).then(async(result) => {
//          if (result.isConfirmed) {
           try {
             let result = await instance.delete(`/post/${post._id}`)
             console.log(result);
             if(result?.data?.status){
               setReloadPost(prev => !prev)
            }
            } catch (error) {
              console.log(error);
            }
         }
//        })
//        }

  const instance = useInstance() 
  return (
    <div className="post">
      <div className="post_header">
        <div
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
        </div>
      <div className="postEditMoreOption" onClick={()=>{handleDelete()}}> 
      <i className="fa-solid fa-trash" />
      </div>
      </div>

        <div className="post_container">
          <div className="post_text" style={{visibility:`${(post.text && post.type !== "cover" )?"visible":"hidden"}`}}>{post.text||"no msg and this text for maintain the space"}</div>
         
          {post?.image && (
            <div className="postImageContainer">
            <img src={post.image} alt="post"></img> 
            </div>
          )}
        </div>
 
      <div className="post_infos">
        <div className="like_count">
          <div className="like_count_num">{(post.like?.length)?`${post.like?.length} Liked`:""}</div>
        </div>
        <div className="to_right">
          <div className="comments_count">{(post?.comments?.length)?`${post?.comments?.length} comments`:""}</div>
          <div className="share_count"></div>
        </div>
      </div>
      <div className="post_actions">  
        <div className="post_action hover1" onClick={()=>{setShowComment(prev => !prev)}}>
          <i className="fa-regular fa-comment" /> 
          <span>Comment</span>
        </div>
      </div>
      <div className="comments_wrap">
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
  

