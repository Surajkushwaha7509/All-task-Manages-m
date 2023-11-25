import { useState } from "react";
import swal from "sweetalert";
const Mynewproduct = () =>{
    let  [ productname , pickName ] = useState("");
    let  [ productprice , pickPrice ] = useState("");
    let  [ productqty , pickqty ] = useState("");
    let  [ productseller , pickseller ] = useState("");

    const save = () =>{
        let url = "http://localhost:1111/productlist";
        let newproduct = {
            "pname":productname,
            "price":productprice,
            "qty":productqty,
            "seller":productseller,
        };
        let postdata = {
            headers:{'Content-type':"Application/json"},
            method:"POST",
            body:JSON.stringify(newproduct)
        };
        if( newproduct.name != "" && newproduct.price != "" && newproduct.details != "" )
        {
            fetch(url,postdata)
            .then(response=>response.json())
            .then(productinfo=>{
                swal( productname , " Save Successfully " , "success" );
                pickqty("");pickName("");pickPrice("");pickseller("");
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
                            <h3 className="text-center mb-3"> Enter Product Detials </h3>
                            <div className="mb-4">
                                <label> Enter Product Name </label>
                                <input type="text" className="form-control"
                                onChange={suraj=>pickName(suraj.target.value)}
                                value={productname}/>
                            </div>
                            <div className="mb-4">
                                <label> Enter Product Price </label>
                                <input type="number" className="form-control"
                                onChange={suraj=>pickPrice(suraj.target.value)}
                                value={productprice}/>
                            </div>
                            <div className="mb-4">
                                <label> Enter Product QTY </label>
                                <input type="number" className="form-control"
                                onChange={suraj=>pickqty(suraj.target.value)}
                                value={productqty}/>
                            </div>
                            <div className="mb-4">
                                <label> Enter Product Seller </label>
                                <input type="text" className="form-control"
                                onChange={suraj=>pickseller(suraj.target.value)}
                                value={productseller}/>
                            </div>
                            <div className="text-center">
                                <button type="button" className="btn btn-primary me-3"
                                onClick={save}> Save Product </button>
                                <button type="reset" className="btn btn-danger"> Clear All </button>
                            </div>

                        </form>
                    </div>
                <div className="col-lg-4"></div>
            </div>
        </div>
    )
}
export default Mynewproduct;