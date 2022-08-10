import Layout from "../components/Layout";
import { Footer } from "../components/Footer";


function rules() {
  return (
    <Layout>
      <h1 className="text-left text-2xl font-lato font-black text-greenescola my-2">
      <div>Normes d&apos;ús</div>
      </h1>
      <p>Escolapop és un servei gratuït de l&apos;AMPA de l&apos;escola Sant Feliu.</p>
      <p>L&apos;AMPA es reserva el dret dacceptar, rebutjar o cancel·lar l&apos;accés de qualsevol usuari en qualsevol moment.</p>
      <p>S&apos;ha de sol·licitar accés a l&apos;AMPA per poder usar aquest servei.</p>
      <p>S&apos;han d&apos;acceptar les normes d&apos;ús del servei i acceptar la política de protecció de dades personals.</p>
      <p>L&apos;AMPA no es fa responsable de la qualitat, preu, condicions dels articles publicats ni dels acords de compra/venda entre usuaris.</p>
      <p>Pots sol·licitar la baixa del teu usuari i eliminació de les teves dades en qualsevol moment, enviant un email a l&apos;AMPA o amb l&apos;opció en la secció "El meu usuari".</p>
      <p> </p>
      <p> </p>
      <div className="pb-10"> </div>
      <Footer />
    </Layout>
  )
}

export default rules