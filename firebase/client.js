import { initializeApp } from "firebase/app";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  listAll,
  ref,
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
import { nanoid } from "nanoid";

import { APIKEY_FB, APPID_FB, AUTHDOMAIN_FB, MESSAGINGSENDERID_FB, PROJECTID_FB, STORAGEBUCKET_FB } from "../config/config";

/* console.log("APIKEY_FB: ", APIKEY_FB);
console.log("AUTHDOMAIN_FB: ", AUTHDOMAIN_FB);
console.log("PROJECTID_FB: ", PROJECTID_FB);
console.log("STORAGEBUCKET_FB: ", STORAGEBUCKET_FB);
console.log("MESSAGINGSENDERID_FB: ", MESSAGINGSENDERID_FB);
console.log("APPID_FB: ", APPID_FB);
 */
//// Sayer's Firebase configuration with NEXT_PUBLIC ENV vars
const firebaseConfig = {
  apiKey: APIKEY_FB,
  authDomain: AUTHDOMAIN_FB,
  projectId: PROJECTID_FB,
  storageBucket: STORAGEBUCKET_FB,
  messagingSenderId: MESSAGINGSENDERID_FB,
  appId: APPID_FB,
};


//// Sayer's Firebase configuration without NEXT_PUBLIC ENV vars
/* const firebaseConfig = {
  apiKey: "AIzaSyByQP6YvMi6uDvejkm93aRFGrC2sjXT430",
  authDomain: "escolapop-pre.firebaseapp.com",
  projectId: "escolapop-pre",
  storageBucket: "escolapop-pre.appspot.com",
  messagingSenderId: "669590894513",
  appId: "1:669590894513:web:104db4bd09c13422b7af90",
};
 */

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
const mapUserFromFirebaseAuth = async (user) => {
  const { displayName, email, photoURL, uid } = user;

  const { data } = await axios.get(HOST_SV + `/api/rgpd?useremail=${email}`);
  //console.log("client/mapUserFromFirebaseAuth/data: ", data);

  return {
    name: displayName,
    email,
    avatar: photoURL,
    rgpd: data[0].rgpd,
    validation: data[0].validation,
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

export const authStateChanged = (onChange) => {
  return onAuthStateChanged(auth, async (user) => {
    //console.log("client/onAuthStateChanged/user: ", user);
    // si el usuario existe transformamos la data a lo que nos interesa
    const normalizedUser = user ? await mapUserFromFirebaseAuth(user) : null;
    return await onChange(normalizedUser);
  });
};

export const loginWithGoogle = () => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      //console.log("client/loginWithGoogle/result.user: ", result.user);
      axios.post(HOST_SV + "/api/provider", {
        id: result.user.uid,
        username: result.user.displayName,
        email: result.user.email,
        avatarurl: result.user.photoURL,
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
// const allImageListRef = ref(storage, "images/");

export const deleteFirebaseImage = (fbRefPath) => {
  const imageRefPath = ref(storage, fbRefPath);
  deleteObject(imageRefPath)
    .then(() => console.log("deleted!"))
    .catch((e) => console.error(e));
};

export const uploadImage = (file) => {
  //// creamos la referencia de donde se guradaran en firebase y el nombre del archivo
  //console.log("client/uploadImage/file.name: ", file.name);
  const fbRefPath = "images/" + file.name + nanoid();
  //console.log("client/uploadImage/fbRefPath: ", fbRefPath);
  const reference = ref(storage, fbRefPath);

  //// Lo subimos
  const uploadTask = uploadBytesResumable(reference, file);

  return { uploadTask, fbRefPath };

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
