import { HashRouter, Routes, Route, Link } from "react-router-dom";

import ManagerDashboard from "./managerdashboard";
import NewProfile from "./newprofile";
import SelectedProfile from "./selected";


const ManagerApp = () => {
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
                                <Link className="nav-link active" to="/new-profile"> <i class="fa-solid fa-circle-user"></i> New Profile </Link>
                            </li>
                            <li className="nav-item me-3">
                                <Link className="nav-link active" to="/selected"> <i class="fa-regular fa-circle-check"></i> Completed Profiles </Link>
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
                <Route exact path="/" element={<ManagerDashboard />} />
                <Route exact path="/new-profile" element={<NewProfile />} />
                <Route exact path="/selected" element={<SelectedProfile />} />
            </Routes>
        </HashRouter>
        </div>
    )
}

export default ManagerApp;

const logout = () => {
    localStorage.clear();
    window.location.reload();
}