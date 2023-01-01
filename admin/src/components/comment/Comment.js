import React, { useEffect, useState } from 'react'
import Moment from 'react-moment';
// import { useSelector } from 'react-redux';
import useInstance from '../../axios/axiosInstance';
import "./comment.css"
import defaultProfilePic from "../../images/default_profile.png"

const Comment = ({comment,postId,setReloadPost}) => {
    console.log(comment);
    const instance = useInstance() 
    const [userdetails,setUserDetails] = useState({})
    useEffect(() => {
        try {
            fetchData()
        } catch (error) {
            
        }
    }, [])
    
async function fetchData(){
    let result = await instance.get(`/comment/getCommenterInfo/${comment?.commentBy}`)
    if(result?.data?.status){
        setUserDetails(result.data.result)
    }
}

  return (
    <div className="comment_box">
        <div className='commenter_header'>
        <div className='commenter_profile'>
        <img src={userdetails.picture||defaultProfilePic} alt="profile" />
        <span>{userdetails.username}</span> 
        <Moment fromNow interval={30}>
                {comment.commentAt} 
        </Moment>
        </div>
        {/* {user.id === comment.commentBy &&
        <i className='fa-solid fa-trash' onClick={async ()=>{
            try {
                let result = await instance.delete(`/comment/${postId}/${comment._id}`)
                if(result.data.status){
                    setReloadPost(prev => !prev)
                }
            } catch (error) {
                console.log(error);
            }
        }}/>
        } */}
        </div>
       <div className='commenter_details'>{comment?.comment}</div> 
    </div>
  )
}

export default Comment