
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
    const [isSignedIn, setIsSignedIn] = useState(false)
    const [isWorker, setIsWorker] = useState(null)
    const [pending, setPending] = useState(true);

    const signup = (details, isWorker) => {
        const user = auth.createUserWithEmailAndPassword(details.email, details.password).then((res) => {
            setIsWorker(isWorker)
            if (isWorker !== undefined && isWorker) {
                accessDB.collection('workers').doc(res.user.uid).set(details)
            } else {
                accessDB.collection('companies').doc(res.user.uid).set(details)
            }
        })
        return user
    }

    const signin = async (email, password) => {
        // check is worker
        
        const workersRef = accessDB.collection('workers')
        const workersEmail = await workersRef.where('email', '==', email).get()

        const companiesRef = accessDB.collection('companies')
        const companiesEmail = await companiesRef.where('email', '==', email).get()

        if (typeof workersEmail !== 'undefined' && workersEmail !== null) {
            setIsWorker(true)
        } else if (typeof companiesEmail !== 'undefined' && companiesEmail !== null) {
            setIsWorker(false)
        }

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
        signout()
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setPending(false)
            setCurrentUser(user)
            setIsSignedIn(typeof user !== undefined && user !== null)
        });
        return unsubscribe
    }, []);

    if (pending) {

        //TODO: change loading indicator
        return <div>Loading...</div>
    }

    const value = {
        isSignedIn,
        isWorker,
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

