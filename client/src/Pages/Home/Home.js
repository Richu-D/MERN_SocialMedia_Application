import CreatePost from "../../components/createPost/createPost"
import Header from "../../components/header/Header"
import "./home.css"

import { useEffect, useReducer, useState } from "react";
import  useInstance  from "../../axios/axiosInstance.js";
import Post from "../../components/post/post";
function reducer(state, action) {
  switch (action.type) {
    case "POSTS_REQUEST":
      return { ...state, loading: true, error: "" };
    case "POSTS_SUCCESS":
      return {
        ...state,
        loading: false,
        posts: action.payload,
        error: "",
      };
      case "POSTS_ERROR":
        return { ...state, loading: false, error: action.payload };
        
    default:
      return state;
  }
}

const Home = () => {

  const [reloadPost,setReloadPost] = useState(false)
  const instance = useInstance()
  const [{ loading, error, posts }, dispatch] = useReducer(reducer, {
    loading: false,
    posts: [],
    error: "",
  });
  useEffect(() => {
    getAllPosts();
  }, [reloadPost]);
  
  const getAllPosts = async () => {
    try {
      dispatch({
        type: "POSTS_REQUEST",
      });
      const { data } = await instance.get(
        `${process.env.REACT_APP_BACKEND_URL}/post`,
      );
      dispatch({
        type: "POSTS_SUCCESS",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "POSTS_ERROR",
        payload: error.response.data.message,
      });
    }
  };

  return (
    <div className="home">
      <Header page="home" />
      <div className="home-body">
      <div className="left-home">
        <div className="left-home-content">
          {/* left */}
        </div>
        </div> 
         <div className="center-home">
          <div className="center-home-content">

          <CreatePost className="createPost" setReloadPost={setReloadPost} />
        {(posts.length) 
        ? posts.map(post =>{
          return <Post key={post._id} setReloadPost={setReloadPost} post={post} />
        })
        : <div className="no-posts">No Posts Available</div>}
          </div>        
          </div>
      <div className="right-home">
        <div className="right-home-content">
{/* right */}
        </div>
        </div>
      </div>
    </div>
  )
}

export default Home