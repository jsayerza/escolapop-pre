import { initializeApp } from "firebase/app";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  listAll,
  ref,
  uploadBytesResumable,
  getMetadata,
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

import {
  APIKEY_FB,
  APPID_FB,
  AUTHDOMAIN_FB,
  MESSAGINGSENDERID_FB,
  PROJECTID_FB,
  STORAGEBUCKET_FB,
} from "../config/config";

/* console.log("APIKEY_FB: ", APIKEY_FB);
console.log("AUTHDOMAIN_FB: ", AUTHDOMAIN_FB);
console.log("PROJECTID_FB: ", PROJECTID_FB);
console.log("STORAGEBUCKET_FB: ", STORAGEBUCKET_FB);
console.log("MESSAGINGSENDERID_FB: ", MESSAGINGSENDERID_FB);
console.log("APPID_FB: ", APPID_FB);
 */
//// Sayer's Firebase configuration with NEXT_PUBLIC ENV vars
/* const firebaseConfig = {
  apiKey: APIKEY_FB,
  authDomain: AUTHDOMAIN_FB,
  projectId: PROJECTID_FB,
  storageBucket: STORAGEBUCKET_FB,
  messagingSenderId: MESSAGINGSENDERID_FB,
  appId: APPID_FB,
};
 */

//// Sayer's Firebase configuration without NEXT_PUBLIC ENV vars
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
const mapUserFromFirebaseAuth = async (user) => {
  const { displayName, email, photoURL, uid } = user;
  //console.log("client/mapUserFromFirebaseAuth/uid: ", uid);
  //console.log("client/mapUserFromFirebaseAuth/email: ", email);
  //console.log("client/mapUserFromFirebaseAuth/displayName: ", displayName);
  //console.log("client/mapUserFromFirebaseAuth/photoURL: ", photoURL);

  const { data } = await axios.get(HOST_SV + `/api/rgpd?useremail=${email}`);
  //console.log("client/mapUserFromFirebaseAuth/data: ", data);
  if (data.length == 0) {
    //console.log("client/mapUserFromFirebaseAuth/data.length == 0");
    return {
      name: displayName,
      email,
      avatar: photoURL,
      rgpd: 99,
      validation: 99,
      id: uid,
    };
  } else {
   //console.log("client/mapUserFromFirebaseAuth/data.length != 0");
   //console.log("client/mapUserFromFirebaseAuth/data[0].rgpd: ", data[0].rgpd);
   //console.log("client/mapUserFromFirebaseAuth/data[0].validation: ", data[0].validation);
    //// Si existe el registro en DB/user, recojemos los datos del registro, en lugar de usar los de firebase
    ////    ya que, en el caso de user email+psw no tenemos name ni avatar. JSM 20220808
    return {
      name: data[0].username,
      email,
      avatar: data[0].avatarurl,
      rgpd: data[0].rgpd,
      validation: data[0].validation,
      id: uid,
    };
  }



/*   const { data } = await axios.get(HOST_SV + `/api/rgpd?useremail=${email}`)
  .then((data) => {
    //console.log("client/mapUserFromFirebaseAuth/dataxxx: ", data);
    //console.log("client/mapUserFromFirebaseAuth/data.data: ", data.data);
    //console.log("client/mapUserFromFirebaseAuth/data[0].rgpd: ", data.data[0].rgpd);
    return {
      name: displayName,
      email,
      avatar: photoURL,
      rgpd: data.data[0].rgpd,
      validation: data.data[0].validation,
      id: uid,
    };
  })
  .catch((e) => console.log("mapUserFromFirebaseAuth error: ", e));
 */  

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

/** @type {any} */
const metadata = {
  contentType: "image/jpeg",
  size: 1000000,
};

export const uploadImage = (file) => {
  if (!file) {
    return { uploadTask: null };
  }
  //// creamos la referencia de donde se guradaran en firebase y el nombre del archivo
  //console.log("client/uploadImage/file.name: ", file.name);
  const fbRefPath = "images/" + nanoid() + "-" + file.name;
  //console.log("client/uploadImage/fbRefPath: ", fbRefPath);
  const reference = ref(storage, fbRefPath);

  //// Lo subimos
  const uploadTask = uploadBytesResumable(reference, file);

  return { uploadTask, fbRefPath };

  // Mientras se sube recuperamos su estado
  /*   uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(snapshot.metadata?.contentType, "uploading");
      //console.log(snapshot.metadata.contentType.startsWith("image/"));
    },
    // si hay error lo ejecutamos
    (error) => {
      switch (error.code) {
        case "storage/unauthorized":
          // User doesn't have permission to access the object
          break;
        case "storage/canceled":
          // User canceled the upload
          break;

        case "storage/unknown":
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    },
    // si todo fue ok hacemos un callback con una promesa recuperando la url
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((url) => console.log(url));
    }
  ); */
};
