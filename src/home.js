import Mylogin from "./login";
import App from "./App";

const Home = () =>{
    let login = localStorage.getItem("easytohire-token");
    
    if(login == null)
        return( <Mylogin/> )
    else
        return( <App/> )
}

export default Home