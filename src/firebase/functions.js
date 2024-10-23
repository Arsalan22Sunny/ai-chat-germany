import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

export const sign_up = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
    // .then((userCredential) => {
    //     // Signed up 
    //     const user = userCredential.user;
    //     // ...
    // })
    // .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     // ..
    // });
};


export const sign_in = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
    // .then((userCredential) => {
    //     // Signed in 
    //     const user = userCredential.user;
    //     // ...
    // })
    // .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    // });
};

