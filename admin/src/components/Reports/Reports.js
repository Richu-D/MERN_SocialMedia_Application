import { useEffect, useState } from "react"
import useInstance from "../../axios/axiosInstance"
import Post from "../Post/post"
import "./Reports.css"

const Reports = () => {
  const Instance = useInstance()
  const [success,setSuccess] = useState(false)
  const [posts,setPosts] = useState(false)
  const [reloadPost,setReloadPost] = useState(false)
  useEffect(() => {
    const getReports = async ()=>{
      try {
        let reports = await Instance.get("/reports")
        console.log(reports.data);
        setPosts(reports.data)
        setSuccess(true)
      } catch (error) {
        console.log(error.response.data.message);
      }
    }
    getReports()
  }, [reloadPost])
  
  return (
    <div className="reportsContainer">
      {
        success && (
          posts.map(p =>
            <Post key={p._id} post={p} setReloadPost={setReloadPost}/>
          )
        )
      }
    </div>
  )
}

export default Reports