
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
    const [currentUserDB, setCurrentUserDB] = useState(null)
    const [isSignedIn, setIsSignedIn] = useState(false)
    const [isWorker, setIsWorker] = useState(null)
    const [pending, setPending] = useState(true);

    const signup = async (details, isWorker) => {
        let uid = ''
        const user = await auth.createUserWithEmailAndPassword(details.email, details.password).then( async (res) => {
            uid = res.user.uid
            if (isWorker !== undefined && isWorker) {
                accessDB.collection('workers').doc(res.user.uid).set(details)
            } else {
                accessDB.collection('companies').doc(res.user.uid).set(details)
            }
            setIsWorker(isWorker)

            let userRef = null
            if (isWorker) {
                userRef = accessDB.collection('workers').doc(uid)
            } else {
                userRef = accessDB.collection('companies').doc(uid)
            }
            const userData = await userRef.get()
            setCurrentUserDB(userData.data())
        })

        return user
    }

    const signin = async (email, password) => {
        const workersRef = accessDB.collection('workers')
        const workersEmail = await workersRef.where('email', '==', email).get()

        const companiesRef = accessDB.collection('companies')
        const companiesEmail = await companiesRef.where('email', '==', email).get()

        const user = await auth.signInWithEmailAndPassword(email, password)

        console.log(workersEmail.docs)
        if (typeof workersEmail !== 'undefined' && workersEmail.docs.length > 0) {
            setIsWorker(true)
            setCurrentUserDB(workersEmail.docs[0].data())
        } else if (typeof companiesEmail !== 'undefined' && companiesEmail.docs.length > 0) {
            setIsWorker(false)
            setCurrentUserDB(companiesEmail.docs[0].data())
        }
        return user
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
        currentUserDB,
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
