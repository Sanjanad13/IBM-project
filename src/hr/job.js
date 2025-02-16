import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

const Myjob = () => {

    let [allrole, setRole] = useState([]);

    let [allcity, setCity] = useState([]);

    const getRole = () => {

        fetch("https://easytohire.in/webapi/job/alllrole")
            .then(response => response.json())
            .then(info => {
                setRole(info);
            })

    }

    const getCity = () => {

        fetch("https://easytohire.in/webapi/job/alllocation")
            .then(response => response.json())
            .then(info => {
                setCity(info);
            })

    }

    let [alljob, setJob] = useState([]);
    const getJob = () => {
        let input = {
            "companyid": localStorage.getItem("companyid"),
            "token": localStorage.getItem("easytohire-token")
        }
        let postData = {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(input)
        }
        fetch("https://easytohire.in/webapi/job/alljob", postData)
            .then(response => response.json())
            .then(jobArray => {
                setJob(jobArray);
            })
    }
    useEffect(() => {
        getRole();
        getCity();
        getJob(); // call the function
    }, []);


    let [jobData, setJobData] = useState({});

    let [msg, setMsg] = useState("");

    const pickValue = (obj) => {

        jobData[obj.target.name] = obj.target.value;
        setJobData(jobData);

    }

    const save = (obj) => {

        setMsg("Please Wait Submitting...");
        obj.preventDefault();

        jobData["companyid"] = localStorage.getItem("companyid");
        jobData["token"] = localStorage.getItem("easytohire-token");

        let url = "https://easytohire.in/webapi/job/savejob";
        let postData = {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(jobData)
        }

        fetch(url, postData)
            .then(response => response.text())
            .then(info => {
                setMsg(info);
                obj.target.reset();
                getJob(); // to reload the list
            })

    }

    const PER_PAGE = 10;
    const [currentPage, setCurrentPage] = useState(0);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(alljob.length / PER_PAGE);

    return (

        <div className="container pt-5">

            <form onSubmit={save}>

                <div className="row shadow rounded p-4 mb-5 bg-light">

                    <div className="col-lg-12">
                        <h3 className="text-center text-primary mb-2"> <i class="fa-solid fa-paste"></i> Post Job </h3>
                        <p className="mb-2 text-center text-danger"> {msg} </p>
                    </div>

                    <div className="row">

                        <div className="mb-3 col-lg-3">

                            <label className="mb-1"> Job Role </label>
                            <select className="form-select" name="role" onChange={pickValue}>
                                <option value="">Choose</option>
                                {
                                    allrole.map((role, index) => {
                                        return (
                                            <option key={index} value={role.url}> {role.rolename} </option>
                                        )
                                    })
                                }
                            </select>

                        </div>

                        <div className="mb-3 col-lg-6">

                            <label className="mb-1"> Job Title </label>
                            <input type="text" className="form-control" name="jobtitle" onChange={pickValue} />

                        </div>

                        <div className="mb-3 col-lg-3">

                            <label className="mb-1"> Job Location </label>
                            <select className="form-select" name="location" onChange={pickValue}>
                                <option value="">Choose</option>
                                {
                                    allcity.map((city, index) => {
                                        return (
                                            <option key={index}> {city.cityname} </option>
                                        )
                                    })
                                }
                            </select>

                        </div>

                        <div className="mb-3 col-lg-6">

                            <label className="mb-1"> Experience </label>

                            <div className="input-group">
                                <input type="number" className="form-control" placeholder="Min" name="minexp" onChange={pickValue} />
                                <input type="number" className="form-control" placeholder="Max" name="maxexp" onChange={pickValue} />
                            </div>

                        </div>

                        <div className="mb-3 col-lg-6">

                            <label className="mb-1"> Salary Anum </label>

                            <div className="input-group">
                                <input type="number" className="form-control" placeholder="Min" name="minsal" onChange={pickValue} />
                                <input type="number" className="form-control" placeholder="Max" name="maxsal" onChange={pickValue} />
                            </div>

                        </div>

                        <div className="mb-3">

                            <label className="mb-1"> Job Description </label>
                            <textarea className="form-control" name="jd" onChange={pickValue}></textarea>

                        </div>

                        <div className="mb-3 text-center">

                            <button type="submit" className="btn btn-success m-1"> <i class="fa-solid fa-upload"></i> Post Now </button>
                            <button type="reset" className="btn btn-warning m-1"> <i class="fa-solid fa-rotate-right"></i> Reset </button>

                        </div>

                    </div>

                </div>

            </form>

            <hr className="container mt-4"></hr>

            <h3 className="text-center mb-4 mt-4 text-primary"> <i className="fa fa-suitcase"></i> {alljob.length} Jobs Available </h3>


            <div className="row">

                <div className="col-lg-12">

                    <table className="table table-bordered table-sm table-hover border-none">

                        <thead>

                            <tr className="text-start table-primary">

                                <th scope="col">Job Title</th>
                                <th scope="col">Role</th>
                                <th scope="col">Location</th>
                                <th scope="col">Experience</th>
                                <th scope="col">Salary</th>
                                <th scope="col">Job Description</th>
                                <th scope="col">Profile</th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                alljob.slice(offset, offset + PER_PAGE).map((job, index) => (

                                    <tr key={index}>

                                        <td>
                                            <Link to={`/appliedprofile/${job.jobid}`}>{job.jobtitle} </Link>
                                        </td>

                                        <td>
                                            {job.role.replaceAll("-", " ")}
                                        </td>

                                        <td>{job.location}</td>
                                        <td>{job.minexp} To {job.maxexp} Yrs</td>
                                        <td>{job.minsal} To {job.maxsal} LPA</td>
                                        <td>{job.jd}</td>

                                        <td>
                                            <Link to={`/appliedprofile/${job.jobid}`}>{job.totalprofile} </Link>
                                        </td>

                                    </tr>
                                ))
                            }
                        </tbody>

                    </table>

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

            </div>

        </div>

    )
}

export default Myjob;