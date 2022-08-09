import Layout from "../components/Layout";
import { Footer } from "../components/Footer";


function about() {
  return (
    <Layout>
      <h1 className="text-left text-2xl font-lato font-black text-greenescola my-2">
        <div>Sobre Escolapop</div>
      </h1>
        <p>**Aplicació en desenvolupament**</p>
        <p> </p>
        <p>**Explicar:** web privada. Només es pot accedir amb autorització de l&apos;AMPA de l&apos;escola</p>
        <p> </p>
        <p>Si vols accedir a la web i encara no tens usuari, fes clic aquí i </p>
        <p>presenta&apos;t, en l&apos;email:</p>
        <p>- Nom i Cognoms</p>
        <p>- Relació amb l&apos;esola</p>
        <p>- email amb el que et vols enregistrar a escolapop</p>
      <div className="pb-10"> </div>
      <Footer />
    </Layout>
  )
}

export default about