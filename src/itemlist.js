import { useState , useEffect } from "react";
import swal from "sweetalert";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

const Allitem = () =>{
    let [ myitem , updateitem ] = useState([]);
    const getitem = () =>{
        updatekeyword("");  // It will empty the search textbox.
        fetch("http://localhost:1111/itemlist")
        .then(response=>response.json())
        .then(itemArray=>{
            updateitem(itemArray.reverse());
        })
    }
    useEffect(()=>{
        getitem()
    },[1]);

    const delitem = (id) =>{
        let url = "http://localhost:1111/itemlist/"+id;
        let postdata = {method:"delete"};
        fetch(url,postdata)
        .then(response=>response.json())
        .then(serverinfo=>{
            swal( "Deleted" , serverinfo.msg , "success");
            getitem();
        })
    }

    //Pagination

    const PER_PAGE = 4;
    const [currentPage, setCurrentPage] = useState(0);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(myitem.length / PER_PAGE);

    let  [ keyword , updatekeyword ]= useState("");
    const searchItem = () =>{
        let url = "http://localhost:1111/searchapi";
        let newitem = {
            "mykeyword":keyword
        };
        let postdata = {
            headers:{'Content-type':"Application/json"},
            method:"POST",
            body:JSON.stringify(newitem)
        };
        if( newitem.mykeyword != "" )
        {
            fetch(url,postdata)
            .then(response=>response.json())
            .then(itemarray=>{
                updateitem(itemarray);
            })
        }
        else{
            swal("Invaild Search Item " , " Please Enter Search Keyword " , "warning");
        }
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-lg-8 mb-4">
                    <h3 className="text-center"> Item List : { myitem.length } </h3>
                </div>
                <div className="col-lg-4 mb-4">
                    <div className="input-group">
                        <input type="search" className="form-control" placeholder=" Search Here... "
                        onChange={suraj=>updatekeyword(suraj.target.value)}
                        value={keyword}/>
                        <button className="btn btn-success"
                        onClick={searchItem}> Search </button>
                        <button className="btn btn-info"
                        onClick={getitem}
                        > Reset </button>
                    </div>
                </div>
                {
                    myitem.slice(offset, offset + PER_PAGE).map(( item , index )=>{
                        return(
                            <div className="col-lg-3 mb-4" key={index}>
                                <div className="p-3 border rounded text-center">
                                    <h4> { item.itemname } </h4>
                                    <p>Rs : { item.itemprice }</p>
                                    <p>{ item.itemdetails }</p>
                                    <p> 
                                        <button className="btn btn-danger btn-sm"
                                        onClick={delitem.bind(this,item._id)}>
                                            <i className="fa fa-trash"></i> 
                                        </button>
                                        <Link to={`/edititem/${item._id}`}
                                        className="btn btn-warning btn-sm ms-2"> Edit </Link>
                                    </p>
                                </div>
                            </div>
                        )
                    })
                }
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
                                pageClassName={"page-item "}
                                pageLinkClassName={"page-link"}
                                previousClassName={"page-item"}
                                previousLinkClassName={"page-link"}
                                nextClassName={"page-item"}
                                nextLinkClassName={"page-link"}
                                breakClassName={"page-item"}
                                breakLinkClassName={"page-link"}
                                activeClassName={"active primary"}
                            />
                        </div>
        </div>
    )
}
export default Allitem;