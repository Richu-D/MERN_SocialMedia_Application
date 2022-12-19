import "./header.css"
import logo from "../../images/ColorMediaLogo.jpg"
import Swal from "sweetalert2"
import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch()
  return (
    <nav className="navbar">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="Search">
        <input type="text" />
        <button>search</button>
      </div>
      <div className="logout">
        <button onClick={
          ()=>{
      
          Swal.fire({
            title: 'Are you sure to logout ?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Logout'
          }).then(async(result) => {
            if (result.isConfirmed) {
                 dispatch({
                   type:"LOGOUT"
                 })
            }
          })
                 
          }
          
         }
        >logout</button>
      </div>
    </nav>
  )
}

export default Header