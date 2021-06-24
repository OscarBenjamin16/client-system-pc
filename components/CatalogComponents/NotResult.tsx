import Image from 'next/image';
import React from 'react';

const NotResult = () => {
    return (
        <div className="flex w-full text-center flex-col justify-center content-center items-center">
            <Image src="/assets/icons/not.png"
              alt="none"
              width={310}
              height={310}
            />
            <h1 className="font-bold text-xl">Lo sentimos no pudimos encontrar resultados</h1>
            <h4>Vuelve a intentarlo con otros datos</h4>
        </div>
    );
}

export default NotResult;
