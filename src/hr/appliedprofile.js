import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Link, useParams } from "react-router-dom";

const AppliedProfile = () =>{
    let {jobid} = useParams();

    let[allprofile, setProfile] = useState([]);
    const getProfile = (status=0) =>{
        setMsg("Please Wait.."); 
        let input = {
            "companyid":localStorage.getItem("companyid"),
            "jobid":jobid,
            "token":localStorage.getItem("easytohire-token"),
            "status":status
        }
        let postData = {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(input)
        };
        
        fetch("https://easytohire.in/webapi/job/appliedprofile", postData)
        .then(response=>response.json())
        .then(profileArray=>{
            setProfile(profileArray); 
            setMsg("");
        })
        
    }
    let[msg, setMsg] = useState("");
    const changeprofileStatus = (userid, status) =>{
        let input = {
            "companyid":localStorage.getItem("companyid"),
            "token":localStorage.getItem("easytohire-token"),
            "jobid":jobid,
            "userid":userid,
            "status":status,
            "feedback":""
        }
        let postData = {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(input)
        };
        fetch("https://easytohire.in/webapi/job/changeprofilestatus", postData)
        .then(response=>response.text())
        .then(msg=>{
            setMsg(msg);
            getProfile(status);
        })
    }

    useEffect(()=>{
        getProfile(); // call the function
    }, []);
    const PER_PAGE = 10;
    const [currentPage, setCurrentPage] = useState(0);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(allprofile.length / PER_PAGE);

    return(
        <div className="container pt-4">
            <div className="row mb-4">

            <h3 className="text-center mb-4 mt-4 text-primary col-lg-12"> <i class="fa-solid fa-file"></i> {allprofile.length} Applications Received </h3>
            
            <p className="col-lg-6">
            <div className="btn-group">
                    <button className="btn btn-info text-white" onClick={getProfile.bind(this,0)}><i className="fa fa-user"></i> New Profile</button>
                    <button className="btn btn-success" onClick={getProfile.bind(this,1)}><i className="fa fa-check"></i> Selected</button>
                    <button className="btn btn-danger" onClick={getProfile.bind(this, -1)}> <i className="fa fa-times"></i> All Rejected</button>
                </div>    
            </p>
            <p className="text-danger col-lg-6"> {msg} </p>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    {
                        allprofile.slice(offset, offset + PER_PAGE).map((job, index) => (
                            <div className="mb-4 p-3 border rounded" key={index}>
                                <div className="row">
                                    <div className="col-lg-3 mb-2">
                                        <h5 className="text-info"> Basic Details </h5>
                                        <p>Full Name : {job.fullname}</p>
                                        <p>Gender : {job.gender}</p>
                                        <p>DOB : {job.dob}</p>
                                        <p>Mobile : {job.mobile}</p>
                                        <p>e-Mail : {job.email}</p>
                                        <p>Address : {job.address}</p>
                                    </div>
                                    <div className="col-lg-3 mb-2">
                                        <h5 className="text-info"> Education Details </h5>
                                        <p>Highest Edu : {job.educationame}</p>
                                        <p>Year : {job.passingyear}</p>
                                        <p>Grade : {job.grade}</p>
                                        <p>Institute : {job.college}</p>
                                    </div>
                                    <div className="col-lg-3 mb-2">
                                        <h5 className="text-info"> Skills Details </h5>
                                        <p>Well Known About : {job.skill}</p>
                                    </div>
                                    <div className="col-lg-3 mb-2">
                                        <h5 className="text-info"> Work Experience </h5>
                                        <p> {job.totalexp}</p>
                                        <p> {job.aboutexp}</p>
                                    </div>
                                    <div className="text-center">
                                        <button className="btn btn-success btn-sm me-4" 
                                        onClick={changeprofileStatus.bind(this, job.id, 1)}> 
                                            <i className="fa fa-check"></i> Shortlist 
                                        </button>
                                        <button className="btn btn-danger btn-sm"
                                        onClick={changeprofileStatus.bind(this, job.id, -1)}>  
                                            <i className="fa fa-times"></i> Reject 
                                        </button>
                                    </div>
                                </div>

                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="mb-5 mt-4">
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

export default AppliedProfile;