import { useState, useEffect } from "react";
import Image from "next/image";
//import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/router";
import { useUser } from "context/authContext";

import Layout from "../components/Layout";
//import { HOST_SV } from "../config/config";
//import { VALIDATION_EMAIL } from "../config/config";


function UserSettingsPage() {

  //console.log("UserSettingsPage/HOST_SV: ", HOST_SV );
  //console.log("UserSettingsPage/VALIDATION_EMAIL: ", VALIDATION_EMAIL );

  const { user } = useUser();
  //console.log("UserSettingsPage/user: ", user);
  //console.log("UserSettingsPage/user.avatar: ", user.avatar);
  const router = useRouter();


  useEffect(() => {
    //console.log("UserSettingsPage/useEffect/user: ", user);
    //console.log("UserSettingsPage/useEffect/user.email: ", user.email);
    !user || (user === null && router.push("/login"));

  }, [router, user]);



  return (
    <Layout>
      <h1 className="text-left text-2xl font-lato font-black text-greenescola my-2">
        <div>El meu usuari</div>
      </h1>

      <div className="flex flex-col gap-4 md:flex-row">
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

        <div>
          <h2 className="text-lg text-gray-900 font-lato font-normal pb-2">
            Normes d&apos;ús + RGPD:
          </h2>
          {user && user.rgpd == 10 ? (
            <>
            Acceptat
            </>
          ) : (
            <>No acceptat</>
          )}
        </div>

        <div>
          <h2 className="text-lg text-gray-900 font-lato font-normal pb-2">
            Autorització de l&apos;AMPA:
          </h2>
          {user && user.validation == 10 ? (
            <>
            Acceptat
            </>
          ) : (
            <>No acceptat</>
          )}
        </div>


      </div>

    </Layout>
  )
}

export default UserSettingsPage