import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import "../firebase";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {

    const [loading, setLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    //Signup
    async function signup(email, password, username) {
        const auth = getAuth();
        await createUserWithEmailAndPassword(auth, email, password);

        //Update Profile
        await updateProfile(auth.currentUser, { displayName: username });

        const user = auth.currentUser;
        setCurrentUser({ ...user });
    }

    //Login
    function login(email, password) {
        const auth = getAuth();
        // console.log("trying")
        return signInWithEmailAndPassword(auth, email, password);
    }

    //Logout
    function logout() {
        const auth = getAuth();
        return signOut(auth);
    }

    const value = { currentUser, signup, login, logout };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}