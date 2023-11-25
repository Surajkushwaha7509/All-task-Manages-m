import { HashRouter , Route , Routes , Link } from "react-router-dom";
import Allitem from "./itemlist";
import Mynewitem from "./newitem";
import Myedititem from "./edititem";
import Allproduct from "./productlist";
import Mynewproduct from "./newproduct";
import Myeditproduct from "./editproduct";

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
            </div>
          </div>
        </div>
      </div>
      <Routes>
        <Route exact path="/" element={<Allitem/>}/>
        <Route exact path="/newitem" element={<Mynewitem/>}/>
        <Route exact path="/edititem/:id" element={<Myedititem/>}/>
      </Routes> 
      <hr/> 
      <div className="container mt-2 mb-4">
        <div className="row">
          <div className="col-lg-3 text-primary">
            <h1> MERN STACK </h1>
          </div>
          <div className="col-lg-9 text-end">
            <div className="btn-group">
              <Link to="/" className="btn btn-primary"> Product List </Link>
              <Link to="/newproduct" className="btn btn-warning"> New Product </Link>
            </div>
          </div>
        </div>
      </div>
      <Routes>
        <Route exact path="/" element={<Allproduct/>}/>
        <Route exact path="/newproduct" element={<Mynewproduct/>}/>
        <Route exact path="/editproduct/:id" element={<Myeditproduct/>}/>
      </Routes>
    </HashRouter>
  );
}

export default App;
