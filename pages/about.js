import Layout from "../components/Layout";
import { Footer } from "../components/Footer";


function about() {
  return (
    <Layout>
      <h1 className="text-left text-2xl font-lato font-black text-greenescola my-2">
        <div>Objectius d&apos;Escolapop</div>
      </h1>
      
      <div className="w-full bg-gray-100 py-3 px-2 pt-1 font-lato font-light text-lg">
        <p>En totes les famílies es va produint acumulació de materials escolars (libres, xandalls esportius, bates, estris,..) que els fills ja no necessiten perquè van avançant cap a etapes educatives superiors. </p>
        <p> </p>
        <p>En aquesta plataforma es pretén crear punts d&apos;intercanvi en el que les famílies puguin oferir el material escolar dels seus fills semi-nou o usat per al seu aprofitament en altres famílies ja sigui de forma gratuïta (recomanada) o a canvi d&apos;una contraprestació econòmica. </p>
        <p> </p>
        <p>La plataforma es exclusiva pels pares i mares de l&apos;Escola Sant Feliu de Cabrera de Mar.</p>
      </div>

      <div className="pb-10"> </div>
      <Footer />
    </Layout>
  )
}

export default about