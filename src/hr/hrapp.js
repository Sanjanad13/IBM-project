import { HashRouter, Routes, Route, Link } from "react-router-dom";
import Myjob from "./job";
import InterviewRound from "./interviewround";
import SelectedProfile from "./selectedprofile";
import HrDashboard from './hrdashboard';
import AppliedProfile from "./appliedprofile";
import ManageEmp from "./employee";

const HrApp = () => {
    return (
        <div className="main-page">
        <HashRouter>
            <nav className="navbar navbar-expand-sm navigation navbar-dark sticky-top">
                <div className="container">
                    <a className="navbar-brand" href="/"> <i class="fa-solid fa-handshake"></i> EasyToHire </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="mynavbar">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item me-3">
                                <Link className="nav-link active" to="/"> <i className="fa fa-home"></i> Dashboard </Link>
                            </li>
                            <li className="nav-item me-3">
                                <Link className="nav-link active" to="/employee"> <i className="fa fa-user-tie"></i> Employee </Link>
                            </li>
                            <li className="nav-item me-3">
                                <Link className="nav-link active" to="/job"> <i className="fa fa-suitcase"></i> Jobs </Link>
                            </li>
                            <li className="nav-item me-3">
                                <Link className="nav-link active" to="/round"> <i class="fa-solid fa-list-check"></i> Interview Rounds </Link>
                            </li>
                            <li className="nav-item me-3">
                                <Link className="nav-link active" to="/selected-profile"> 
                                <i class="fa fa-user-tie"></i> Manage Profiles </Link>
                            </li>
                            <li className="nav-item me-3">
                                <div className="vr text-light mt-1"></div>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" onClick={logout}> Hi {localStorage.getItem("fullname")}, Logout <i className="fa fa-power-off"></i> </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <Routes>
                <Route exact path="/" element={<HrDashboard />} />
                <Route exact path="/employee" element={<ManageEmp />} />
                <Route exact path="/job" element={<Myjob />} />
                <Route exact path="/round" element={<InterviewRound />} />
                <Route exact path="/selected-profile" element={<SelectedProfile />} />
                <Route exact path="/appliedprofile/:jobid" element={<AppliedProfile />} />
            </Routes>
        </HashRouter>
        </div>
    )
}

export default HrApp;

const logout = () => {
    localStorage.clear();
    window.location.reload();
}