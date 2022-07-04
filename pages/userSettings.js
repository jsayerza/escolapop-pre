import Image from "next/image";
import { FaUserCircle } from "react-icons/fa";

//import { useUser } from "context/authContext";
import Layout from "../components/Layout";


function userSettings() {

/*   const { user } = useUser();
  //console.log("userSettings/user: ", user)
  //console.log("userSettings/user.avatar: ", user.avatar)
 */
  return (
    <Layout>
      <h1 className="text-left text-2xl font-lato font-black text-greenescola my-2">
        <div>El meu usuari (reparar)</div>
      </h1>

{/*       <div className="flex flex-col gap-4 md:flex-row">
        <div>
          <h2 className="text-lg text-gray-900 font-lato font-normal pb-2">
            Avatar:
          </h2>

          {user && user.avatar ? (
            <Image
              width={100}
              height={100}
              src={user.avatar}
              alt="avatar image"
              className="h-10 w-10 rounded-full"
            />
          ) : (
            <Image
              width={100}
              height={100}
              src="/user-profile-icon.jpg"
              className="mr-3 h-6 sm:h-9"
              alt="Venedor/a"
            />
          )}
        </div>

        <div>
          <h2 className="text-lg text-gray-900 font-lato font-normal pb-2">
            Nom usuari:
          </h2>
          {user && user.name ? (
            <>
            {user.name}
            </>
          ) : (
            <></>
          )}
        </div>
        <div>
          <h2 className="text-lg text-gray-900 font-lato font-normal pb-2">
            Email usuari:
          </h2>
          {user && user.email ? (
            <>
            {user.email}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
 */}
    </Layout>
  )
}

export default userSettings