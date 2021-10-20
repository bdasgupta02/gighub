
import React, { useEffect, useState, useContext, useCallback } from "react";
import { auth } from "../database/firebase";
import { createWorker, createCompany } from "../database/firebaseFunctions";
import { accessDB } from "../database/firebase";

// check current user changes
import "firebase/auth";

export const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState();
    const [pending, setPending] = useState(true);

    const signup = (details, isWorker) => {
        // if (isWorker !== undefined && isWorker) {
        //     createWorker(details)
        // } else {
        //     createCompany(details)
        // }
        const user = auth.createUserWithEmailAndPassword(details.email, details.password).then((res) => {
            console.log('ID: ' )
            console.log(res)
            if (isWorker !== undefined && isWorker) {
                return accessDB.collection('workers').doc(res.user.uid).set(details)
            } else {
                return accessDB.collection('companies').doc(res.user.uid).set(details)
            }
        })
        return user
    }

    function signin(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function signout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email)
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setPending(false)
            setCurrentUser(user)

            console.log('USER')
            console.log(user)
        });
        return unsubscribe
    }, []);

    if (pending) {

        //TODO: change loading indicator
        return <div>Loading...</div>
    }

    const value = {
        currentUser,
        signup,
        signin,
        signout,
        resetPassword,
        updateEmail,
        updatePassword
    }

    return (
        <AuthContext.Provider
            value={value}
        >
            {!pending && children}
        </AuthContext.Provider>
    );
};

