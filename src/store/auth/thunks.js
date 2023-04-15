import { loginWithEmailPassword , registerUserWithEmailAndPassword, signInWithGoogle, logoutFireBase }  from "../../firebase/providers";
import { checkingCredentials,login, logout } from './authSlice';

export const checkingAuthentication = () => {
    return async ( dispatch ) => {
        dispatch( checkingCredentials());
    }
}

export const startGoogleSignIn = () => {
    return async ( dispatch ) => {
        dispatch( checkingCredentials());

        const result  = await signInWithGoogle();
        if( !result.ok ) return dispatch(logout(result.errorMessage));
        dispatch(login(result));
    }
}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName }) =>{
    return async ( dispatch ) => {
        dispatch( checkingCredentials());

        const result  = await registerUserWithEmailAndPassword({email, password, displayName});
        if( !result.ok ) return dispatch(logout(result.errorMessage));
        dispatch(login(result));
    }
}

export const startLoginWithEmailPassword = ({ email, password}) => {
    return async ( dispatch ) => {
        dispatch( checkingCredentials());

        const result  = await loginWithEmailPassword({email, password});
        
        console.log(result);

        if( !result.ok ) return dispatch(logout(result));
        dispatch(login(result));
    }
}

export const startLogout = () => {
    return async ( dispatch ) => {
        await logoutFireBase();
        dispatch(login());
    }
}