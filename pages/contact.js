import { useRouter } from "next/router";
import { MdOutlineMailOutline } from "react-icons/md";

import Layout from "../components/Layout";
import { Footer } from "../components/Footer";
import { VALIDATION_EMAIL } from "../config/config";


function contact() {
  const router = useRouter();
  const subject = "Escolapop - Contacte ";
  const body =
    "" ;

  return (
    <Layout>
      <h1 className="text-left text-2xl font-lato font-black text-greenescola my-2">
        <div>Contacte</div>
      </h1>

      <div className="w-full bg-gray-100 py-3 px-2 pt-1 font-lato font-light text-lg">
        <p>AMPA Escola Sant Feliu de Cabrera de Mar</p>
      </div>

      <button
          className="flex flex-col gap-4 pt-0 pb-1"
          onClick={() => {
              router.push(
              `mailto:${VALIDATION_EMAIL}?subject=${
                  subject
              }&body=${body}`
              );
          }}
      >
          <span className="w-full rounded bg-gray-100 py-3 px-2 pt-1 font-lato font-light text-center text-lg flex gap-2 justify-center items-center hover:bg-slate-200 duration-200 ease">
              <MdOutlineMailOutline size={"1.5rem"} />
              adm.escolapop@gmail.com
          </span>
      </button>

      <div className="pb-10"> </div>
      <Footer />
    </Layout>
  )
}

export default contact