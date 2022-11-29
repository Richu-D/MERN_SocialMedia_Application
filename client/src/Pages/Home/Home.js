import Header from "../../components/header/Header"
import "./home.css"
const Home = () => {
  return (
    <div className="home">
      <Header />
      <div className="home-body">
      <div className="left-home">
        <div className="left-home-content">
          left
        </div>
        </div> 
         <div className="center-home">
          <div className="center-home-content">

          center
          </div>
                      
          </div>

      <div className="right-home">
        <div className="right-home-content">
right
        </div>
        </div>
      </div>
    </div>
  )
}

export default Home