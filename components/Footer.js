import Image from "next/image";
import Link from "next/link";
import { AiFillInfoCircle } from "react-icons/ai";
import { Tooltip } from '@mui/material';
import { IconButton } from '@mui/material';

import { Layout } from "./Layout";


export function Footer() {
    return (
        <div className="bg-gray-300">

            <div className="flex flex-col gap-4 md:flex-row" >
                <div className="p-2">
                    <Image
                        width={54}
                        height={50}
                        src="/LogoAmpa-Taronja.png"
                        className="p-2"
                        alt=""
                    />
                </div>

                <div className="p-2">
                    <div>
                            <Link href="/about">
                                <a className="font-lato font-bold w-full hover:text-orangeAMPA pr-4">
                                    Sobre Escolapop
                                </a>
                            </Link>
                            |
                            <Link href="/rules">
                                <a className="font-lato font-bold w-full hover:text-orangeAMPA p-4">
                                    Normes_ús
                                </a>
                            </Link>
                            |
                            <Link href="/contact">
                                <a className="font-lato font-bold w-full hover:text-orangeAMPA p-4">
                                    Contacte
                                </a>
                            </Link>
                    </div>
                    <div>
                        © AMPA Escola Sant feliu. All rights reserved.
                    </div>
                </div>

            </div>
            
        </div>
    )


}
