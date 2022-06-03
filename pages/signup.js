import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/client";
import { useUser } from "context/authContext";
import { AiOutlineMail } from "react-icons/ai";
import axios from "axios";
import Link from "next/link";
import { HOST_SV } from "config/config";

function SignUpPage() {
  const { user } = useUser();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleGoogleLogin, setUser } = useUser();
  const router = useRouter();

  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        userCredentials.user.displayName = name;
        console.log(userCredentials);
        setUser(userCredentials);
        /*         axios
        .post(HOST_SV + "/api/register", {
          email: userCredentials.user.email,
        })
          .then(() => {
            router.push("/profile");
          })
          .catch((err) => console.log(err)); */
        router.push("/");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    async function getUser() {
      if (user && !loading) {
        return await router.push("/");
      }
      setLoading(false);
    }

    getUser();
  }, [loading, router, user]);

  return (
    <div className="min-h-screen grid place-content-center items-center justify-center bg-gray-100">
      <div className="bg-white p-4 w-full md:w-96 rounded shadow-md">
        <h1 className="font-semibold text-4xl text-center p-4">Sign Up</h1>

        <form
          className="w-full flex flex-col gap-4 border-gray-200 border-b py-4"
          onSubmit={handleSignupSubmit}
        >
          <input
            className="px-4 py-2 rounded border border-gray-200 w-full focus:outline-orange-500"
            name="name"
            type="text"
            placeholder="Name"
            onChange={handleChangeName}
          />
          <input
            name="email"
            className="px-4 py-2 rounded border border-gray-200 w-full focus:outline-orange-500"
            type="email"
            placeholder="Example@mail.com"
            onChange={handleChangeEmail}
          />
          <input
            name="password"
            className="px-4 py-2 rounded border border-gray-200 w-full focus:outline-orange-500"
            type="password"
            placeholder="Pasword"
            onChange={handleChangePassword}
          />

          <button
            type="submit"
            className="px-4 py-3 bg-orange-500 rounded font-semibold text-white text-xl hover:bg-orange-600 duration-200 ease"
          >
            Sign up
          </button>
        </form>

        <div className="flex flex-col gap-4">
          <h1 className="font-semibold text-xl text-center py-4">Or Login</h1>

          <Link href={"/login"}>
            <a className="w-full rounded bg-gray-100 py-3 px-2 font-semibold text-lg flex gap-2 justify-center items-center hover:bg-slate-200 duration-200 ease">
              <AiOutlineMail size={"2rem"} />
              With Email and password
            </a>
          </Link>

          <button
            className="w-full rounded bg-gray-100 py-3 px-2 font-semibold text-lg flex gap-2 justify-center items-center hover:bg-slate-200 duration-200 ease"
            onClick={handleGoogleLogin}
          >
            <span>
              <FcGoogle size={"2rem"} />
            </span>
            With Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
