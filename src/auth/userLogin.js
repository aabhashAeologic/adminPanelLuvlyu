import { projectAuth } from "../firebase/firebase"



let error = null;

const login = async (email, password) => {
    error = null;
    try {
        const res = await projectAuth.signInWithEmailAndPassword(email, password);
        localStorage.setItem("bearerToken", await res.user.getIdToken());
        localStorage.setItem("Email", email);
        console.log(res.user);

    } catch (err) {
        error = err.message;
        console.log(error);
    }
}


export const refreshTokenAfterDelay = (delay) => {
    const refreshDelay = delay * 60 * 1000; // Convert minutes to milliseconds


    const refreshFirebaseToken = async () => {
        const currentUserLoggedIn = projectAuth.currentUser;

        if (currentUserLoggedIn) {
            try {
                const refreshedToken = await currentUserLoggedIn.getIdToken();
                localStorage.setItem("bearerToken", refreshedToken);

                console.log('Refreshed token:', refreshedToken);
            } catch (err) {
                error = err;
            }
        } else {
            console.log('No user is currently logged in.');
        }

        // Schedule the next token refresh
        setTimeout(refreshFirebaseToken, refreshDelay);
    };

    // Initial token refresh
    setTimeout(refreshFirebaseToken, refreshDelay);
};




const userLogin = () => {
    return { error, login };
}

export default userLogin;