import Layout from "../components/Layout";
import { Footer } from "../components/Footer";
import { VALIDATION_EMAIL } from "../config/config";


function contact() {

  return (
    <Layout>
      <h1 className="text-left text-2xl font-lato font-black text-greenescola my-2">
        <div>Contacte</div>
      </h1>

      <div className="w-full bg-gray-100 py-3 px-2 pt-1 font-lato font-light text-lg">
        <p>AMPA Escola Sant Feliu de Cabrera de Mar</p>
      </div>

      <a href="mailto:adm.escolapop@gmail.com?subject=Escolapop - Contacte" className="underline text-greenescola hover:text-orangeAMPA visited:text-purple-600">adm.escolapop@gmail.com</a>

      <div className="pb-10"> </div>
      <Footer />
    </Layout>
  )
}

export default contact