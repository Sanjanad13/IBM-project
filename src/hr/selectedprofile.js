import { useState,useEffect } from "react";

const SelectedProfile = () => {
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
        getJob(); 
    }, []);

    ////////////////////////////////////////////////////
        let[allprofile, setProfile] = useState([]);
        const getProfile = async(jobid) =>{
            let input = {
                "companyid":localStorage.getItem("companyid"),
                "token":localStorage.getItem("easytohire-token"),
                "jobid":jobid
            }
            let postData = {
                headers: { 'Content-Type': 'application/json' },
                method: "POST",
                body: JSON.stringify(input)
            }
            try{
            await fetch("https://easytohire.in/webapi/job/allprofile", postData)
            .then(response=>response.json())
            .then(profileArray=>{
                setProfile(profileArray); 
            })
            }catch(error){
                alert("Network error...Please Try Later...");
            }
        }
    //////////////////////////////////////////////////////
    return(
        <div className="container pt-5">
            <div className="row">
                <h3 className="text-center text-success mb-4 col-xl-12"> 
                    <i class="fa-solid fa-user-tie"></i> Manage Profiles 
                </h3>
            </div>
            <div className="row mb-4">
                <div className="col-lg-3"></div>
                <div className="col-lg-6">
                    <label className="mb-1"> Filter By Job Requirement </label>
                    <select className="form-select" onChange={obj=>getProfile(obj.target.value)}>
                        <option>Choose</option>
                        {
                            alljob.map((job, index)=>{
                                return(
                                    <option key={index} value={job.jobid}> {job.jobtitle} </option>
                                )
                            })
                        }
                    </select>
                    <h5 className="text-center m-3 text-danger"> Total Profile : { allprofile.length } </h5>
                </div>
                <div className="col-lg-3"></div>
            </div>
            <div className="row mt-4">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Mobile No</th>
                            <th>e-Mail Id</th>
                            <th>Education</th>
                            <th>Status</th>
                            <th>Feedback</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allprofile.map((profile, index)=>{
                                return(
                                    <tr key={index}>
                                            <td>  {profile.fullname}  </td>
                                            <td>  {profile.mobile}  </td>
                                            <td>  {profile.email}  </td>
                                            <td>  {profile.educationame	}  </td>
                                            <td>  {profile.feedback}  </td>
                                            <td>  {profile.status}  </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
            
        </div>
    )
}

export default SelectedProfile;