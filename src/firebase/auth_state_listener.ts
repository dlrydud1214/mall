import { getAuth, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if(user) {
        const uid = user.uid;
        console.log('sign in');
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
    } else {
        // User is signed out
        console.log('sign out');
    }
})