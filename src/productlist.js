import { useState , useEffect } from "react";
import swal from "sweetalert";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

const Allproduct = () =>{
    let [ myproduct , updateproduct ] = useState([]);
    const getproduct = () =>{
        updatekeyword("");  // It will empty the search textbox.
        fetch("http://localhost:1111/productlist")
        .then(response=>response.json())
        .then(productArray=>{
            updateproduct(productArray.reverse());
        })
    }
    useEffect(()=>{
        getproduct()
    },[1]);

    const delproduct = (id) =>{
        let url = "http://localhost:1111/productlist/"+id;
        let postdata = {method:"delete"};
        fetch(url,postdata)
        .then(response=>response.json())
        .then(serverinfo=>{
            swal( "Deleted" , serverinfo.msg , "success");
            getproduct();
        })
    }

    //Pagination

    const PER_PAGE = 4;
    const [currentPage, setCurrentPage] = useState(0);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(myproduct.length / PER_PAGE);

    let  [ keyword , updatekeyword ]= useState("");
    const searchproduct = () =>{
        let url = "http://localhost:1111/searchapi";
        let newproduct = {
            "mykeyword":keyword
        };
        let postdata = {
            headers:{'Content-type':"Application/json"},
            method:"POST",
            body:JSON.stringify(newproduct)
        };
        if( newproduct.mykeyword != "" )
        {
            fetch(url,postdata)
            .then(response=>response.json())
            .then(productarray=>{
                updateproduct(productarray);
            })
        }
        else{
            swal("Invaild Search product " , " Please Enter Search Keyword " , "warning");
        }
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-lg-8 mb-4">
                    <h3 className="text-center"> Product List : { myproduct.length } </h3>
                </div>
                <div className="col-lg-4 mb-4">
                    <div className="input-group">
                        <input type="search" className="form-control" placeholder=" Search Here... "
                        onChange={suraj=>updatekeyword(suraj.target.value)}
                        value={keyword}/>
                        <button className="btn btn-success"
                        onClick={searchproduct}> Search </button>
                        <button className="btn btn-info"
                        onClick={getproduct}
                        > Reset </button>
                    </div>
                </div>
                <table className="table table-hover text-center">
                    <thead>
                        <tr>
                            <th> Product Name </th>
                            <th> Product Price </th>
                            <th> Product QTY </th>
                            <th> Seller Name </th>
                            <th colSpan="2"> Action </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myproduct.slice(offset, offset + PER_PAGE).map(( product , index )=>{
                                return(
                                    <tr key={index}>
                                        <td>{ product.productname }</td>
                                        <td>{ product.productprice }</td>
                                        <td>{ product.productqty }</td>
                                        <td>{ product.productseller }</td>
                                        <td>
                                            <button className="btn btn-danger btn-sm"
                                            onClick={delproduct.bind(this,product._id)}>
                                                <i className="fa fa-trash"></i> 
                                            </button>
                                        </td>
                                        <th>
                                            <Link to={`/editproduct/${product._id}`}
                                            className="btn btn-warning btn-sm ms-2"> Edit </Link>
                                        </th>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                {/* {
                    myproduct.slice(offset, offset + PER_PAGE).map(( product , index )=>{
                        return(
                            <div className="col-lg-3 mb-4" key={index}>
                                <div className="p-3 border rounded text-center">
                                    <h4> { product.pname } </h4>
                                    <p>Rs : { product.price }</p>
                                    <p>{ product.qty }</p>
                                    <p>{ product.seller }</p>
                                    <p> 
                                        <button className="btn btn-danger btn-sm"
                                        onClick={delproduct.bind(this,product._id)}>
                                            <i className="fa fa-trash"></i> 
                                        </button>
                                        <Link to={`/editproduct/${product._id}`}
                                        className="btn btn-warning btn-sm ms-2"> Edit </Link>
                                    </p>
                                </div>
                            </div>
                        )
                    })
                } */}
            </div>
            <div className="mb-4 mt-4">
                            <ReactPaginate
                                previousLabel={"Previous"}
                                nextLabel={"Next"}
                                breakLabel={"..."}
                                pageCount={pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={3}
                                onPageChange={handlePageClick}
                                containerClassName={"pagination  justify-content-center"}
                                pageClassName={"page-product "}
                                pageLinkClassName={"page-link"}
                                previousClassName={"page-product"}
                                previousLinkClassName={"page-link"}
                                nextClassName={"page-product"}
                                nextLinkClassName={"page-link"}
                                breakClassName={"page-product"}
                                breakLinkClassName={"page-link"}
                                activeClassName={"active primary"}
                            />
                        </div>
        </div>
    )
}
export default Allproduct;