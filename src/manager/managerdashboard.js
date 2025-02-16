import { useState, useEffect } from "react";

const ManagerDashboard = () => {
    let [allprofile, setProfile] = useState(0);
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
        fetch("https://easytohire.in/webapi/job/completedprofile", postData)
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
                setProfile(selectedCount + rejectedCount);
        })
    }

    useEffect(()=>{
        getProfile();
    }, []);
    return (
        <div className="container p-5">
            <div className="row mb-4">
                <div className="col-lg-12 text-center">
                    <h3 className="text-primary"> <i class="fa-solid fa-house"></i> {localStorage.getItem("fullname")}'s Dashboard  </h3>
                </div>
            </div>
            <div className="row text-center">
                <div className="col-lg-4 mb-4">
                    <div className="border-1 rounded shadow p-3">
                        <i className="fa-solid fa-users text-primary fa-3x mb-3"></i>
                        <h5> {allprofile} : All Profiles </h5>
                    </div>
                </div>
                <div className="col-lg-4 mb-4">
                    <div className="border-1 rounded shadow p-3">
                        <i className="fa-solid fa-circle-check text-success fa-3x mb-3"></i>
                        <h5> {selected} : Selected Profiles </h5>
                    </div>
                </div>
                <div className="col-lg-4 mb-4">
                    <div className="border-1 rounded shadow p-3">
                        <i className="fa-solid fa-circle-xmark text-danger fa-3x mb-3"></i>
                        <h5> {rejected} : Rejected Profiles </h5>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ManagerDashboard;