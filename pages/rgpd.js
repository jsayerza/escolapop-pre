import axios from "axios";
import { useRouter } from "next/router";
import { useUser } from "context/authContext";
import Link from "next/link";
import { toast } from "react-toastify";
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
import { AiFillInfoCircle } from "react-icons/ai";
import { MdOutlineMailOutline } from "react-icons/md";

import { HOST_SV } from "../config/config";
import { VALIDATION_EMAIL } from "../config/config";


function RGPDPage() {

  //console.log("RGPDPage/HOST_SV: ", HOST_SV );
  //console.log("RGPDPage/VALIDATION_EMAIL: ", VALIDATION_EMAIL );

  const router = useRouter();
  const { user, firebaseLogout } = useUser();

  const subject = "Escolapop - Sol·licitud accés ";
  const body =
    "Hola, estic interesat/da en accedir al servei Escolapop.%0A%0A" + 
    "Nom: ____%0A" +
    "Cognoms: ____%0A" +
    "Pare/Mare de ____, de la classe ____.%0A%0A" ;
  
  const handleUpdate = async (event, answerRGPD) => {
    //console.log("RGPDPage/handleUpdate/answerRGPD: ", answerRGPD);
    //console.log("RGPDPage/handleUpdate/user.email: ", user.email );
    try {
      axios
        .put(HOST_SV + `/api/rgpd`, {
            answerRGPD: answerRGPD,
            useremail: user.email,
        })
        .then(async (res) => {
          //console.log("RGPDPage/handleUpdate/then/answerRGPD: ", answerRGPD);
          if (answerRGPD != '10') {
            toast.warn("🙁 Resposta registrada. No pots accedir a l'app si no llegeixes i acceptes les condicions.");
          } else {
            toast.info("👍🏼 Resposta registrada. Has llegit i acceptat les condicions. Has de fer login de nou per poder entrar a l'app");
            firebaseLogout();
          }
          router.push("/");
        })
        .catch((e) => console.log("handleUpdate update RGPD error: ", e));
    } catch (error) {
        console.log("RGPDPage/handleUpdate/error: ", error);
        toast.error(error.response.data.message);
    }
  };


  return (
    <div className="min-h-screen grid place-content-center items-center justify-center bg-gray-100">
      <div className="bg-white p-4 w-full md:w-96 rounded shadow-md">
        <h1 className="font-lato font-bold text-4xl text-center p-4">
          Normes d&apos;ús i RGPD
        </h1>

        <div className="flex flex-col gap-4 pt-6 pb-1">
          <Link href={"/rules"}>
            <a className="w-full rounded bg-gray-100 py-3 px-2 pt-1 font-lato font-light text-center underline underline-offset-2 text-lg flex gap-2 justify-center items-center hover:bg-slate-200 duration-200 ease">
                <AiFillInfoCircle size={"2.5rem"} />
                Normes d&apos;ús d&apos;Escolapop i política de privacitat de dades personals
            </a>
          </Link>
        </div>

        <button
            /* className="w-full rounded bg-gray-100 py-3 px-2 font-lato font-bold text-lg text-greenescola flex gap-2 justify-center items-center hover:bg-slate-200 duration-200 ease" */
            className="flex flex-col gap-4 pt-6"
            onClick={event => handleUpdate(event, 10)}
        >
            <span className="w-full rounded bg-gray-100 py-3 px-2 pt-1 font-lato font-light text-center text-greenescola text-lg flex gap-2 justify-center items-center hover:bg-slate-200 duration-200 ease">
              <IoIosCheckmarkCircle size={"1.5rem"} />
              Accepto les normes d&apos;ús i condicions
            </span>
        </button>

        <button
            /* className="w-full rounded bg-gray-100 py-3 px-2 font-lato font-bold text-lg text-red-400 flex gap-2 justify-center items-center hover:bg-slate-200 duration-200 ease" */
            className="flex flex-col gap-4 pt-2"
            onClick={event => handleUpdate(event, 20)}
        >
            <span className="w-full rounded bg-gray-100 py-3 px-2 pt-1 font-lato font-light text-center text-red-400 text-lg flex gap-2 justify-center items-center hover:bg-slate-200 duration-200 ease">
                <IoIosCloseCircle size={"1.5rem"} />
                No accepto les normes d&apos;ús i condicions
            </span>
        </button>

        {/* {user ( */}
            <button
                /* className="w-full rounded bg-gray-100 py-3 px-2 pt-6 font-lato font-bold text-lg text-gray-500 flex gap-2 justify-center items-center hover:bg-slate-200 duration-200 ease" */
                className="flex flex-col gap-4 pt-6 pb-1"
                onClick={() => {
                    router.push(
                    //`mailto:${"jsayerza.comptes@gmail.com"}?subject=${
                    `mailto:${VALIDATION_EMAIL}?subject=${
                        subject + user.email
                    }&body=${body}`
                    );
                }}
            >
                <span className="w-full rounded bg-gray-100 py-3 px-2 pt-1 font-lato font-light text-center text-lg flex gap-2 justify-center items-center hover:bg-slate-200 duration-200 ease">
                    <MdOutlineMailOutline size={"1.5rem"} />
                    Sol·licitar accés a l&apos;AMPA
                </span>
            </button>
        {/* )} */}

      </div>
    </div>
  );
}

export default RGPDPage;
