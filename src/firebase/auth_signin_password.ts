import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

type HandleClickLoginProps = {
	email:string;
	password:string;
} 
export const handleClickLogin = ({email, password}: HandleClickLoginProps) => {


	signInWithEmailAndPassword(auth, email, password)
	.then((userCredential) => {
		//signed in
		const user = userCredential.user;
		alert("로그인성공");
	})
	.catch((error) => {
		const errorCode = error.code;
		const errorMessage = error.message;
        alert(errorMessage)
	});
}
