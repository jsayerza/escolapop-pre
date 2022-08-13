import Layout from "../components/Layout";
import { Footer } from "../components/Footer";
//import { VALIDATION_EMAIL } from "../config/config";


function rules() {

  return (
    <Layout>
      <h1 className="text-left text-2xl font-lato font-black text-greenescola my-2">
        <div>Normes d&apos;ús, Polítiques de privacitat i Servei</div>
      </h1>

      <h2 className="text-left font-lato font-black text-greenescola my-2">
        <div>Servei i accés</div>
      </h2>
      <div className="w-full bg-gray-100 py-3 px-2 pt-1 font-lato font-light text-lg">
        <p>Escolapop és un servei gratuït de l&apos;AMPA de l&apos;escola Sant Feliu.</p>
        <p>S&apos;ha de sol·licitar accés a l&apos;AMPA per poder usar aquest servei.</p>
        <p>S&apos;han d&apos;acceptar les Normes d&apos;ús del servei i acceptar les Polítiques de privacitat i de protecció de dades personals aquí descrites.</p>
        <p>L&apos;AMPA es reserva el dret d&apos;acceptar, rebutjar o cancel·lar l&apos;accés de qualsevol usuari en qualsevol moment.</p>
        <p>L&apos;AMPA no es fa responsable de la qualitat, preu, condicions dels articles publicats ni dels acords de compra/venda entre usuaris, però es reserva el dret d&apos;eliminar publicacions que consideri no adequades.</p>
        <p>L&apos;AMPA no es fa responsable de la comunicació, informació o dades compartides entre usuaris en el procés de compra/venda, independentment del canal de comunicació emprat.</p>
      </div>

      <h2 className="text-left font-lato font-black text-greenescola my-2">
        <div>Polítiques de privacitat i protecció de dades personals</div>
      </h2>
      <div className="w-full bg-gray-100 py-3 px-2 pt-1 font-lato font-light text-lg">
        <p>El sistema registra el vostre email, nom d&apos;usuari i fotografia del compte en una base de dades que gestiona l&apos;AMPA.</p>
        <p>Podeu sol·licitar la baixa del vostre usuari i eliminació de les vostres dades en qualsevol moment, enviant un email a l&apos;AMPA o amb l&apos;opció en la secció &quot;El meu usuari&quot;.</p>
        <p>El sistema usa galetes (cookies) necessàries per a l&apos;accés a l&apos;app i sessió d&apos;usuari.</p>
      </div>


      <h2 className="text-left font-lato font-black text-greenescola my-2">
        <div>Normes d&apos;ús</div>
      </h2>
      <div className="w-full bg-gray-100 py-3 px-2 pt-1 font-lato font-light text-lg">
        <p>Per a consultar els articles publicats a Escolapop o per a publicar-hi un article és necessari enregistrar-s’hi, i implica l’acceptació de les polítiques de privacitat i normés d’ús aquí descrites.</p>
      </div>

      <h3 className="text-left font-lato font-normal text-greenescola my-2">
        <div>Procés de publicació d’articles</div>
      </h3>
      <div className="w-full bg-gray-100 py-3 px-2 pt-1 font-lato font-light text-lg">
        <p>En la publicació d’un article s’indicarà un títol i descripció del material ofert, categoria, talla o edat o curs corresponents, així com la resta de dades de l’article.</p>
        <p>També s’hi ha d’incloure una imatge (que no pot superar 1 MB de pes).</p>
        <p>Per tal que aparegui en les cerques en l’app s’ha de marcar l’article com</p>
        <p>+ Estat de publicació: &quot;Publicat&quot; </p>
        <p>+ Estat de venda: &quot;En venda&quot; o &quot;Reservat&quot;</p>
        <p></p>
        <p>Si a l’hora de publicar, modificar o cancel·lar un article teniu incidències, podeu sol·licitar suport tècnic contactant per email amb <a href="mailto:adm.escolapop@gmail.com?subject=Escolapop - Suport" className="underline text-greenescola hover:text-orangeAMPA visited:text-purple-600">adm.escolapop@gmail.com</a>.</p>
        <p></p>
        <p>Els administradors d’aquesta plataforma d’intercanvi, podran eliminar les publicacions que considerin que el seu contingut no es apropiat per a cada apartat o per a aquesta plataforma d’intercanvi en general.</p>
      </div>

      <h3 className="text-left font-lato font-normal text-greenescola my-2">
        <div>Procés de compra venda</div>
      </h3>
      <div className="w-full bg-gray-100 py-3 px-2 pt-1 font-lato font-light text-lg">
        <p>El &quot;comprador&quot; es pot comunicar amb el &quot;venedor&quot; fent clic en el botó &quot;Contacta amb el venedor&quot; en la fitxa de l&apos;article, que envia un email a aquest darrer.</p>
        <p>Aquest email es pot editar abans d’enviar-lo i incloure-hi dades de contacte, com el telèfon o altra informació, que no es registra a l’app i no és responsabilitat de l’AMPA.</p>
        <p>Opcionalment, el venedor pot marcar l’article com &quot;Reservat&quot;.</p>
        <p>Es recomana a les famílies que es citin en el col·legi per l’intercanvi, per exemple, en les entrades o sortides del centre.</p>
        <p>Un cop produït l’intercanvi, el &quot;venedor&quot; ha de marcar l’article com &quot;Venut&quot; a l’app, en l’àrea &quot;El meu Escolapop&quot;, per evitar que segueixi apareixent en l’app com article a la venda.</p>
        <p></p>
      </div>


      <div className="pb-10"> </div>
      <Footer />
    </Layout>
  )
}

export default rules