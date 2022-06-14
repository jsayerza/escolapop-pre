import Image from "next/image";
import { Tooltip } from '@mui/material';
import { IconButton } from '@mui/material';


export const SearchCategoryBar = () => {
    return (
        <div>
            <Image
                width={100}
                height={100}
                src="/escolapop-cat-roba.png"
                alt="Categoria Roba"
                className="h-10 w-10 rounded-full"
            />
            <Image
                width={100}
                height={100}
                src="/escolapop-cat-llibres.png"
                alt="Categoria Roba"
                className="h-10 w-10 rounded-full"
            />
            <Image
                width={100}
                height={100}
                src="/escolapop-cat-matesc.png"
                alt="Categoria Roba"
                className="h-10 w-10 rounded-full"
            />
            <Image
                width={100}
                height={100}
                src="/escolapop-cat-matext.png"
                alt="Categoria Roba"
                className="h-10 w-10 rounded-full"
            />
        </div>
        
    )
};