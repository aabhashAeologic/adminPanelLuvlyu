import { projectAuth } from "src/firebase/firebase";

let error=null;

const logout=async ()=>{
    error=null;
    try {
        await projectAuth.signOut();
        localStorage.removeItem("bearerToken");
        localStorage.removeItem("Email")
    } catch (err) {
        error=err.message;
    }
}


const userLogout=()=>{
    return {error,logout}
}

export default userLogout;