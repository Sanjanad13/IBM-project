import HrApp from "./hr/hrapp";
import ManagerApp from "./manager/managerapp";

function App() {
  let role = localStorage.getItem("roletype");

  if(role==="HR")
  return ( <HrApp/> );

  if(role==="MANAGER")
    return ( <ManagerApp/> );

}

export default App;