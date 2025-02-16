import { useState, useEffect } from "react";

const HrDashboard = () => {

    let [alljob, setJob] = useState([]);
    let [errormsg, updateErrorMsg] = useState("");
    const getJob = async() => {
        let input = {
            "companyid": localStorage.getItem("companyid"),
            "token": localStorage.getItem("easytohire-token")
        }
        let postData = {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(input)
        }
        try{
        await fetch("https://easytohire.in/webapi/job/alljob", postData)
            .then(response => response.json())
            .then(jobArray => {
                setJob(jobArray.reverse());
            })
        }catch(error){
            updateErrorMsg("Network error...Please try later...");
        }
    }

    //for profile
    let [selected, setSelected] = useState(0);
    let [rejected, setRejected] = useState(0);
    const getProfile = () => {
        let input = {
            "companyid": localStorage.getItem("companyid"),
            "token": localStorage.getItem("easytohire-token")
        }
        let postData = {
            headers: { 'Content-Type': 'application/json' },
            method: "POST",
            body: JSON.stringify(input)
        }
        fetch("https://easytohire.in/webapi/job/allcompletedprofile", postData)
            .then(response => response.json())
            .then(interviewerArray => {
                let selectedCount = 0;
                let rejectedCount = 0;

                interviewerArray.map((x, index)=>{
                    if(x.remark=="SELECTED"){
                       selectedCount += 1;
                    }else{
                        rejectedCount += 1;
                    }
                })
                setSelected(selectedCount);
                setRejected(rejectedCount);
        })
    }
    // for profile
    useEffect(() => {
        getJob();
        getProfile();
    }, []);

    return (
        <div className="container pt-5">
            <div className="row mb-4">
                <div className="col-lg-12 text-center">
                    <h3 className="text-primary mb-2"> <i className="fa fa-home"></i> {localStorage.getItem("fullname")}'s HR Dashboard </h3>
                    <i className="text-danger"> {errormsg} </i>
                </div>
            </div>
            <div className="row text-center">
                <div className="col-lg-4 mb-5">
                    <div className="rounded shadow p-3">
                        <i className="fa fa-suitcase text-primary fa-3x mb-3"></i>
                        <h5> {alljob.length} : Jobs </h5>
                    </div>
                </div>
                <div className="col-lg-4 mb-5">
                    <div className="rounded shadow p-3">
                        <i className="fa-solid fa-circle-check text-success fa-3x mb-3"></i>
                        <h5> {selected} : Selected Profiles </h5>
                    </div>
                </div>
                <div className="col-lg-4 mb-5">
                    <div className="rounded shadow p-3">
                        <i className="fa-solid fa-circle-xmark text-danger fa-3x mb-3"></i>
                        <h5> {rejected} : Rejected Profiles </h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HrDashboard;