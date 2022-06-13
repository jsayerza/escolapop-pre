import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import {
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { HOST_SV } from "config/config";
import axios from "axios";
//import { firebaseConfig } from "../firebase/firebaseConfig";

const firebaseConfig = {
  apiKey: "AIzaSyByQP6YvMi6uDvejkm93aRFGrC2sjXT430",
  authDomain: "escolapop-pre.firebaseapp.com",
  projectId: "escolapop-pre",
  storageBucket: "escolapop-pre.appspot.com",
  messagingSenderId: "669590894513",
  appId: "1:669590894513:web:104db4bd09c13422b7af90",
};

//// Joaquin's Firebase configuration
/* const firebaseConfig = {
  apiKey: "AIzaSyDMrVCx3Czfj5Rcp52Dk544UKTaZ7CzRAg",
  authDomain: "escolapop-db7d2.firebaseapp.com",
  projectId: "escolapop-db7d2",
  storageBucket: "escolapop-db7d2.appspot.com",
  messagingSenderId: "22410271497",
  appId: "1:22410271497:web:a573e2f2e658e5aced91d8",
}; */

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// mapeamos/transformamos los datos que queremos
const mapUserFromFirebaseAuth = (user) => {
  const { displayName, email, photoURL, uid } = user;
  return {
    name: displayName,
    email: email,
    avatar: photoURL,
    id: uid,
  };
};

// atrapamos el error si ocurre en un objeto
const catchErrorsFromFirebaseAuth = (error) => {
  const errorCode = error.code;
  const errorMessage = error.message;
  const email = error.email;
  const credential = GoogleAuthProvider.credentialFromError(error);
  return { errorCode, errorMessage, email, credential };
};

export const authStateChanged = async (onChange) => {
  return await onAuthStateChanged(auth, (user) => {
    console.log(user, "estate");
    // si el usuario existe transformamos la data a lo que nos interesa
    const normalizedUser = user ? mapUserFromFirebaseAuth(user) : null;
    onChange(normalizedUser);
  });
};

export const loginWithGoogle = () => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      axios.post(HOST_SV + "/api/provider", {
        id: result.user.uid,
        username: result.user.displayName,
        email: result.user.email,
      });
      return result.user;
    })
    .then(mapUserFromFirebaseAuth)
    .catch(catchErrorsFromFirebaseAuth);
};

export const firebaseLogout = () => {
  return signOut(auth)
    .then(console.log("logout"))
    .catch((error) => {
      console.error(error);
    });
};

// iniciamos el storage
const storage = getStorage(app);

export const uploadImage = (file) => {
  // creamos la referencia de donde se guradaran en firebase y el nombre del archivo
  const reference = ref(storage, `images/${file.name}`);
  // Lo subimos
  const uploadTask = uploadBytesResumable(reference, file);

  return { uploadTask };

  /*   // Mientras se sube recuperamos su estado
  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    },
    // si hay error lo ejecutamos
    (err) => console.log(err),
    // si todo fue ok hacemos un callback con una promesa recuperando la url
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((url) => console.log(url));
    }
  ); */
};
