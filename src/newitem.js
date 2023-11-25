import { useState } from "react";
import swal from "sweetalert";
const Mynewitem = () =>{
    let  [ productname , pickName ] = useState("");
    let  [ productprice , pickPrice ] = useState("");
    let  [ productdetails , pickDetails ] = useState("");

    const save = () =>{
        let url = "http://localhost:1111/itemlist";
        let newitem = {
            "name":productname,
            "price":productprice,
            "details":productdetails
        };
        let postdata = {
            headers:{'Content-type':"Application/json"},
            method:"POST",
            body:JSON.stringify(newitem)
        };
        if( newitem.name != "" && newitem.price != "" && newitem.details != "" )
        {
            fetch(url,postdata)
            .then(response=>response.json())
            .then(iteminfo=>{
                swal( productname , " Save Successfully " , "success" );
                pickDetails("");pickName("");pickPrice("");
                window.location.href="../#";
            })
        }
        else{
            swal("Invaild Input" , " Please Enter Values " , "warning");
        }
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-lg-4"></div>
                    <div className="col-lg-4">
                        <form>
                            <h3 className="text-center mb-3"> Enter Item Detials </h3>
                            <div className="mb-4">
                                <label> Enter Item Name </label>
                                <input type="text" className="form-control"
                                onChange={suraj=>pickName(suraj.target.value)}
                                value={productname}/>
                            </div>
                            <div className="mb-4">
                                <label> Enter Item Price </label>
                                <input type="number" className="form-control"
                                onChange={suraj=>pickPrice(suraj.target.value)}
                                value={productprice}/>
                            </div>
                            <div className="mb-4">
                                <label> Enter Item Detials </label>
                                <textarea className="form-control"
                                onChange={suraj=>pickDetails(suraj.target.value)}
                                value={productdetails}></textarea>
                            </div>
                            <div className="text-center">
                                <button type="button" className="btn btn-primary me-3"
                                onClick={save}> Save Item </button>
                                <button type="reset" className="btn btn-danger"> Clear All </button>
                            </div>

                        </form>
                    </div>
                <div className="col-lg-4"></div>
            </div>
        </div>
    )
}
export default Mynewitem;