import {useState} from "react";
import { toast, ToastContainer } from "react-toastify";
import swal from "sweetalert";

const CreateAccount=()=>{
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        password: "",
        mobile: ""
    });

    const Mydata = (obj) => {
        setFormData({ ...formData,[obj.target.name]: obj.target.value  });
    };

    const save = async () => {
        try {
            const response = await fetch('https://easytohire.in/webapi/login/register', 
                {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                swal('Created', 'Account Created Successfully!', "success");
                setFormData({
                    fullname: "",
                    email: "",
                    password: "",
                    mobile: ""
                });
            } else {
                toast('Failed to create account.');
            }
        } catch (error) {
            toast("Error occur during account creation")
        }
    };

   
return(
    <div className="container mt-5">
        <ToastContainer/>
        <div className="row">
            <div className="col-lg-4"></div>
            <div className="col-lg-4 shadow-lg rounded p-3">
                <h3 className="text-center mb-4"> 
                    <i className="fa fa-building text-info"></i> Company Create Account 
                </h3>
                <div className="mb-3">
                        <label>Company Name </label>
                        <input type="text" className="form-control"  name="fullname"  value={formData.fullname}  onChange={Mydata}/>
                </div>
                <div className="mb-3">
                        <label>E-Mail Id </label>
                        <input type="text" className="form-control"  name="email" value={formData.email}
                            onChange={Mydata}/>
                    </div>
                    <div className="mb-3">
                        <label>Password </label>
                        <input type="password" className="form-control"  name="password" value={formData.password} onChange={Mydata}/>
                    </div>
                    
                <div className="mb-3">
                        <label>Mobile No </label>
                        <input type="number" className="form-control"  name="mobile" value={formData.mobile} onChange={Mydata}/>
                    </div> 
                    <div className="text-center mb-3">
                        <button  onClick={save} className="btn btn-danger">Submit </button>
                    </div>
            </div>
           <div className="col-lg-4"></div>
        </div>
    </div>

)



}


export default CreateAccount;