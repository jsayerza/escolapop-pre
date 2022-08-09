import Image from "next/image";
import Link from "next/link";
//import { Tooltip } from "@mui/material";
//import { IconButton } from "@mui/material";

export const SearchCategoryBar = () => {
  return (
    <div
      className="flex items-center justify-center"
    >
      <Link href="/articles/search?category=Roba">
        <a>
          <Image
            width={100}
            height={100}
            src="/escolapop-cat-roba.png"
            alt="Categoria Roba"
            className="h-10 w-10 rounded-full"
          />
        </a>
      </Link>
      <Link href="/articles/search?category=Llibres">
        <a>
          <Image
            width={100}
            height={100}
            src="/escolapop-cat-llibres.png"
            alt="Categoria Llibres"
            className="h-10 w-10 rounded-full"
          />
        </a>
      </Link>
      <Link href="/articles/search?category=Material+escolar">
        <a>
          <Image
            width={100}
            height={100}
            src="/escolapop-cat-matesc.png"
            alt="Categoria Roba"
            className="h-10 w-10 rounded-full"
          />
        </a>
      </Link>
      <Link href="/articles/search?category=Material+extraescolar">
        <a>
          <Image
            width={100}
            height={100}
            src="/escolapop-cat-matext.png"
            alt="Categoria Roba"
            className="h-10 w-10 rounded-full"
          />
        </a>
      </Link>
    </div>
  );
};
