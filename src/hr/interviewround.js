import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Link } from "react-router-dom";

const InterviewRound = () => {

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
    // interviewer
    let [allinterviewer, setInterviewer] = useState([]);

    const getinterviewer = () => {
        let input = {
            "companyid": localStorage.getItem("companyid"),
            "token": localStorage.getItem("easytohire-token")
        }

        let postData = {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(input)
        }

        fetch("https://easytohire.in/webapi/job/interviewer", postData)
            .then(response => response.json())
            .then(interviewerArray => {
                setInterviewer(interviewerArray);
            })
    }

    let [allround, setRound] = useState([]);
    const getRound = () => {
        let input = {
            "companyid": localStorage.getItem("companyid"),
            "token": localStorage.getItem("easytohire-token")
        }

        let postData = {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(input)
        }

        fetch("https://easytohire.in/webapi/job/interviewround", postData)
            .then(response => response.json())
            .then(interviewerArray => {
                setRound(interviewerArray);
            })
    }
    // interviewround

    let [allprofile, setProfile] = useState([]);

    let [jid, updateJid] = useState("");

    let [round, updateRound] = useState("");

    const getProfile = (jobid, round) => {
        updateJid(jobid);
        updateRound(round);
        setMsg("Please Wait..");
        getJobround(jobid, round);
        let input = {
            "companyid": localStorage.getItem("companyid"),
            "jobid": jobid,
            "token": localStorage.getItem("easytohire-token"),
            "round": round
        }

        let postData = {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(input)
        }

        fetch("https://easytohire.in/webapi/job/profilebyround", postData)
            .then(response => response.json())
            .then(profileArray => {
                setProfile(profileArray);
                setMsg("");
            })
    }

    let[myround, setMyround] = useState([]);
    const getJobround = (jobid,round ) => {
        let input = {
            "companyid": localStorage.getItem("companyid"),
            "jobid": jobid,
            "token": localStorage.getItem("easytohire-token"),
            "round": round
        }
        let postData = {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(input)
        }
        fetch("https://easytohire.in/webapi/job/getjobround", postData)
            .then(response => response.json())
            .then(jobArray => {
                setMyround(jobArray);
            })
    }

    useEffect(() => {
        getJob();
        getinterviewer();
        getRound();
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

        let url = "https://easytohire.in/webapi/job/saveround";

        let postData = {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(jobData)
        }

        fetch(url, postData)
            .then(respoonse => respoonse.text())
            .then(info => {
                setMsg(info);
                obj.target.reset();
                getRound(); // to reload the list
            })

    }


    const changeprofileStatus = (userid, status) => {
        setMsg("Please Wait...");
        let feedback = prompt("Please enter Feedback");
        let input = {
            "companyid": localStorage.getItem("companyid"),
            "token": localStorage.getItem("easytohire-token"),
            "jobid": jid,
            "userid": userid,
            "status": status,
            "feedback": feedback
        }
        let postData = {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(input)
        };
        fetch("https://easytohire.in/webapi/job/changeprofilestatus", postData)
            .then(response => response.text())
            .then(msg => {
                setMsg(msg);
                getProfile(jid, round);
            })
    }


    const movenextround = (nextround, userid) =>{
        setMsg("Please Wait...");
        let input = {
            "companyid": localStorage.getItem("companyid"),
            "token": localStorage.getItem("easytohire-token"),
            "jobid": jid,
            "nextround": nextround,
            "userid": userid
        }
        let postData = {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(input)
        };
        fetch("https://easytohire.in/webapi/job/movetonextround", postData)
            .then(response => response.text())
            .then(msg => {
                setMsg(msg);
            })
    }

    const PER_PAGE = 10;
    const [currentPage, setCurrentPage] = useState(0);
    function handlePageClick({ selected: selectedPage }) {
        setCurrentPage(selectedPage)
    }
    const offset = currentPage * PER_PAGE;
    const pageCount = Math.ceil(allround.length / PER_PAGE);


    return (
        <div className="container pt-5">
               
            <form onSubmit={save}>

                <div className="row shadow rounded bg-light p-3 mb-5">

                    <h3 className="text-center text-primary col-lg-12"> <i class="fa-solid fa-list-check"></i> Manage Interview Rounds </h3>
                    

                    <div className="col-lg-3 mb-3">

                        <label className="mb-1"> Job Requirement </label>
                        <select className="form-select" name="jobid" onChange={pickValue}>
                            <option value="">Choose</option>
                            {
                                alljob.map((job, index) => {
                                    return (
                                        <option value={job.jobid} key={index}> {job.jobtitle} </option>
                                    )
                                })
                            }
                        </select>

                    </div>

                    <div className="col-lg-3 mb-3">

                        <label className="mb-1"> Interviewer </label>
                        <select className="form-select" name="empid" onChange={pickValue}>
                            <option value="">Choose</option>
                            {
                                allinterviewer.map((interviewer, index) => {
                                    return (
                                        <option value={interviewer.userid} key={index}> {interviewer.fullname} </option>
                                    )
                                })
                            }
                        </select>

                    </div>

                    <div className="col-lg-3 mb-3">

                        <label className="mb-1"> Interview Round </label>
                        <select className="form-select" name="round" onChange={pickValue}>
                            <option value="">Choose</option>
                            <option value="1">1st Round</option>
                            <option value="2">2nd Round</option>
                            <option value="3">3rd Round</option>
                            <option value="4">4th Round</option>
                            <option value="5">5th Round</option>
                        </select>
                    </div>

                    <div className="col-lg-3 pt-4">
                        <button className="btn btn-success"> <i class="fa-solid fa-plus"></i> Create Round </button>
                    </div>

                </div>

            </form>

            <hr className="container mb-4"/>

            <div className="row">

                <div className="col-xl-4">
                    <h4 className="text-center text-primary mb-3"> <i class="fa-solid fa-list"></i> Available Rounds </h4>
                    <table className="table table-bordered">
                        <tbody>
                            <tr className="table-primary">
                                <td> Requirement </td>
                                <td> Interview </td>
                                <td> Round </td>
                            </tr>

                            {
                                allround.slice(offset, offset + PER_PAGE).map((round, index) => {
                                    return (
                                        <tr key={index}>
                                            <td onClick={getProfile.bind(this, round.jobid, round.round)}> <Link>{round.jobtitle}</Link> </td>
                                            <td> {round.fullname} </td>
                                            <td> {round.round} </td>
                                        </tr>
                                    )
                                })
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
                <div className="col-lg-8">
                    <div className="row">
                    <h4 className="text-center text-primary mb-3 col-lg-7"> 
                        <i class="fa-regular fa-rectangle-list"></i> Total Profiles : {allprofile.length} 
                       
                    </h4> 
                    <p className="col-lg-5">  {msg}  </p>    
                    </div>
                    
                    <table className="table table-bordered table-sm">
                        <tbody>
                            <tr className="table-success">
                                <td> Fulll Name </td>
                                <td> Email </td>
                                <td> Status </td>
                                <td> Next Round </td>
                                <td> Action </td>
                            </tr>
                            {
                                allprofile.map((profile, index) => {
                                    return (
                                        <tr key={index}>
                                            <td className="me-3 text-primary"> {profile.fullname} <br/> {profile.mobile} </td>
                                            <td className="me-3 text-warning"> {profile.email} </td>
                                            <td className="me-3 text-secondary"> <small>{profile.status} </small></td>
                                            <td>
                                                <select onChange={obj=>movenextround(obj.target.value, profile.id)}>
                                                    <option>Choose</option>
                                                    {
                                                        myround.map((allround, index2)=>{
                                                            return(
                                                                <option value={allround.round} key={index2}> {allround.round} </option>
                                                            )
                                                        })
                                                    }
                                                </select>
                                            </td>
                                            <td>
                                                <button onClick={changeprofileStatus.bind(this, profile.id, -1)}
                                                    className="btn btn-danger btn-sm"> <i className="fa fa-times"></i> </button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )
}

export default InterviewRound;