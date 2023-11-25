import { useState , useEffect } from "react";
import { useParams } from "react-router-dom";
import swal from "sweetalert";
const Myeditproduct = () =>{
    const {id} = useParams();
    let  [ productname , pickName ] = useState("");
    let  [ productprice , pickPrice ] = useState("");
    let  [ productqty , pickqty ] = useState("");
    let  [ productseller , pickseller ] = useState("");

    const getproductinfo = () =>{
        let url = "http://localhost:1111/productlist/"+id;
        fetch(url)
        .then(response=>response.json())
        .then(productinfo=>{
            pickName(productinfo.productname);
            pickPrice(productinfo.productprice);
            pickqty(productinfo.productqty);
            pickseller(productinfo.productseller);
         })
    }

    useEffect(()=>{
        getproductinfo();
    },[1]);

    const save = () =>{
        let url = "http://localhost:1111/productlist";
        let newproduct = {
            "pname":productname,
            "price":productprice,
            "qty":productqty,
            "seller":productseller,
            "productid":id
        };
        let postdata = {
            headers:{'Content-type':"Application/json"},
            method:"PUT",
            body:JSON.stringify(newproduct)
        };
        if( newproduct.pname != "" && newproduct.price != "" && newproduct.qty != "" && newproduct.seller != "" )
        {
            fetch(url,postdata)
            .then(response=>response.json())
            .then(productinfo=>{
                swal( productname , productinfo.msg , "success" );
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
                            <h3 className="text-center mb-3"> Edit product Detials </h3>
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
                                onClick={save}> Update Product </button>
                            </div>

                        </form>
                    </div>
                <div className="col-lg-4"></div>
            </div>
        </div>
    )
}
export default Myeditproduct;