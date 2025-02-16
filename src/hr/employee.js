import { useState, useEffect } from "react";
import swal from "sweetalert";

const ManageEmp = () => {
    let [Ename, pickName] = useState("");
    let [Mobile, pickMobile] = useState("");
    let [Email, pickEmail] = useState("");
    let [Password, pickPassword] = useState("");
    let [Designation, pickDesignation] = useState("");
    let [employees,setemployees]=useState([]);


 const fetchEmployees = () => {
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
            setemployees(interviewerArray);
        }) 
};
    useEffect(() => {
        fetchEmployees();
    }, []);

    const saveinfo = () => {
        let url =  "https://easytohire.in/webapi/job/saveemp"
        let userdata = {
            fullname: Ename,
            email: Email,
            password: Password,
            mobile: Mobile,
            type: Designation,
            companyid:localStorage.getItem("companyid")
        }
        let postData = {
            headers: { 'Content-Type': 'application/json' },
            method: "post", 
            body: JSON.stringify(userdata)
        }
    
        fetch(url, postData)
           .then(response=>response.text())
            .then(response=>{
            swal("Created","Account Created successfully.", "success");
            fetchEmployees();
            pickName("");
             pickEmail(""); 
             pickMobile(""); 
             pickDesignation(""); 
             pickPassword("");
           })
        }

    const Delete = (id) => {
        let url =  "https://easytohire.in/webapi/job/deleteemp"
        let userdata = {
            companyid:localStorage.getItem("companyid"),
            userid:id
        }
        let postData = {
            headers: { 'Content-Type': 'application/json' },
            method: "post", 
            body: JSON.stringify(userdata)
        }
    
        fetch(url, postData)
           .then(response=>response.text())
            .then(response=>{
            swal("Deleted","Account Deleted Successfully.", "success");
            fetchEmployees();
           })
    }


    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-lg-4">
                    <div className="p-3">
                        <h3 className="text-center mb-1 text-primary">Employee Details</h3>
                        <div className="row mb-6">
                            <div className="col-lg-12">
                                <p>Employee Name</p>
                                <input type="text" className="form-control" value={Ename} onChange={obj => pickName(obj.target.value)} />
                            </div>
                            <div className="col-lg-12">
                                <p>Employee E-mail</p>
                                <input type="email" className="form-control" value={Email} onChange={obj => pickEmail(obj.target.value)} />
                            </div>
                            <div className="col-lg-12">
                                <p>Password</p>
                                <input type="password" className="form-control" value={Password} onChange={obj => pickPassword(obj.target.value)} />
                            </div>
                            <div className="col-lg-12">
                                <p>Mobile No</p>
                                <input type="text" className="form-control" value={Mobile} onChange={obj => pickMobile(obj.target.value)} />
                            </div>
                            <div className="col-lg-12">
                                <p>Designation</p>
                                <select className="form-select" value={Designation} onChange={obj => pickDesignation(obj.target.value)}>
                                    <option value="">Choose</option>
                                    <option value="HR">HR</option>
                                    <option value="MANAGER">Manager</option>
                                </select>
                            </div>
                            <div className="col-lg-12 text-center">
                                <button className="btn btn-primary" onClick={saveinfo}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="p-3">
                        <h3 className="text-center mb-3 text-primary">View Profile</h3>
                        <table className="table">
                            <thead>
                                <tr>
                                     <th>Name</th>
                                     <th>Email</th>
                                     <th>Password</th>
                                     <th>Mobile</th>
                                     <th>Designation</th>
                                     <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                   employees.map((employee, index)=>{
                                        return(
                                            <tr key={employee.userid}>
                                                <td>{employee.fullname}</td>
                                                <td>{employee.email}</td>
                                                <td>{employee.password}</td>
                                                <td>{employee.mobile}</td>
                                                <td>{employee.type}</td>
                                                <td>
                                                    <button 
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => Delete(employee.userid)}>
                                                        Delete
                                                    </button>
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
        </div>
    )
}

export default  ManageEmp;
