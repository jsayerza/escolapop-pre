import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineMail } from "react-icons/ai";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/client";
import { useUser } from "context/authContext";
import Link from "next/link";

function SignUpPage() {
  const [email, setEmail] = useState("");
  const { handleGoogleLogin, setUser, user } = useUser();
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        //console.log("login/handleLoginSubmit/userCredentials", userCredentials);
        setUser(userCredentials);
        return router.push("/profile");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    user && router.push("/");
  }, [router, user]);

  return (
    <div className="min-h-screen grid place-content-center items-center justify-center bg-gray-100">
      <div className="bg-white p-4 w-full md:w-96 rounded shadow-md">
        <h1 className="font-lato font-bold text-4xl text-center p-4">
          Entra a Escolapop
        </h1>

        <button
            className="w-full rounded bg-gray-100 py-3 px-2 font-lato font-bold text-lg flex gap-2 justify-center items-center hover:bg-slate-200 duration-200 ease"
            onClick={handleGoogleLogin}
          >
            <span>
              <FcGoogle size={"2rem"} />
            </span>
            amb Google
          </button>

        <p
          className="pt-6"
        > 

        </p>

        <form
/*           className="w-full flex flex-col gap-4 border-gray-200 border-b py-4" */
          className="w-full flex flex-col rounded bg-gray-100 py-3 px-2 font-lato font-bold text-lg gap-2 justify-center items-center hover:bg-slate-200 duration-200 ease"
          onSubmit={handleLoginSubmit}
        >
          <div>
            o amb email i contrassenya
          </div>
          <input
            name="email"
            className="px-4 py-2 rounded border border-gray-200 w-full focus:outline-orange-500"
            type="email"
            placeholder="exemple@mail.com"
            onChange={handleChangeEmail}
          />
          <input
            name="password"
            className="px-4 py-2 rounded border border-gray-200 w-full focus:outline-orange-500"
            type="password"
            placeholder="Contrassenya"
            onChange={handleChangePassword}
          />

          <button
            type="submit"
            className="px-4 py-3 bg-orange-500 rounded font-lato font-bold text-white text-xl hover:bg-orange-600 duration-200 ease"
          >
            Login
          </button>
        </form>

        <div className="flex flex-col gap-4 pt-6 pb-1">
          <h2 className="text-lg font-lato font-bold text-center ">
            Si no tens compte de Google ni compte d&apos;Escolapop, registra&apos;t
          </h2>

          <Link href={"/signup"}>
            <a className="w-full rounded bg-gray-100 py-3 px-2 pt-1 font-lato font-bold text-lg flex gap-2 justify-center items-center hover:bg-slate-200 duration-200 ease">
              <AiOutlineMail size={"2rem"} />
              amb email i contrassenya
            </a>
          </Link>

        </div>

      </div>
    </div>
  );
}

export default SignUpPage;
