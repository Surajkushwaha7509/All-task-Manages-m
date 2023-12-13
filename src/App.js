import { HashRouter , Route , Routes , Link } from "react-router-dom";
import Allitem from "./itemlist";
import Mynewitem from "./newitem";
import Myedititem from "./edititem";
import Allproduct from "./productlist";
import Mynewproduct from "./newproduct";
import Myeditproduct from "./editproduct";
import Mypic from "./mypic";
import Updateimage from "./productimage";

function App() {
  return (
    <HashRouter>

      <div className="container mt-2 mb-4">
        <div className="row">
          <div className="col-lg-3 text-primary">
            <h1> MERN STACK </h1>
          </div>
          <div className="col-lg-9 text-end">
            <div className="btn-group">
              <Link to="/" className="btn btn-primary"> Item List </Link>
              <Link to="/newitem" className="btn btn-warning"> New Item </Link>
              <Link to="/image" className="btn btn-success"> Manage Image </Link>
              <Link to="/updateimage" className="btn btn-dark"> Product Image </Link>
              {/* <Link to="/product" className="btn btn-info"> Product List </Link>
              <Link to="/newproduct" className="btn btn-secondary"> New Product </Link> */}
              <button className="btn btn-danger" onClick={logout}>
                  {localStorage.getItem("fullname")} - Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      <Routes>
        <Route exact path="/" element={<Allitem/>}/>
        <Route exact path="/newitem" element={<Mynewitem/>}/>
        <Route exact path="/edititem/:id" element={<Myedititem/>}/>
        <Route exact path="/product" element={<Allproduct/>}/>
        {/* <Route exact path="/newproduct" element={<Mynewproduct/>}/>
        <Route exact path="/editproduct/:id" element={<Myeditproduct/>}/> */}
        <Route exact path="/image" element={<Mypic/>}/>
        <Route exact path="/updateimage" element={<Updateimage/>}/>
      </Routes> 
    </HashRouter>
  );
}

export default App;

const logout = () =>{
  localStorage.clear();
  window.location.reload();
}