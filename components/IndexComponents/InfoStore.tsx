import React from 'react';
import Image from "next/image";
const InfoStore = () => {
    return (
        <div className="flex flex-col sm:flex-row justify-center items-center mb-4">
        <div className="py-4 flex-1 align-middle text-center flex justify-center items-center flex-col">
          <div>
            <Image
              src="/assets/icons/debit_card.png"
              alt="none"
              width={50}
              height={50}
            />
          </div>
          <p className=" w-52 text-gray-300 text-xs sm:text-sm  md:text-xs sm:w-40 md:w-60 text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
            iste est consectetur facilis voluptates, beatae sit blanditiis,
            excepturi mollitia aperiam quod, quaerat ratione nisi explicabo
            omnis inventore repellendus nesciunt veritatis!
          </p>
        </div>
        <div className="py-4 flex-1 text-center flex justify-center items-center flex-col">
          <div>
            <Image
              src="/assets/icons/money.png"
              alt="none"
              width={50}
              height={50}
            />
          </div>
          <p className="w-52 text-gray-300 text-xs sm:text-sm  md:text-xs sm:w-40 md:w-60 text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
            iste est consectetur facilis voluptates, beatae sit blanditiis,
            excepturi mollitia aperiam quod, quaerat ratione nisi explicabo
            omnis inventore repellendus nesciunt veritatis!
          </p>
        </div>
        <div className="py-4 flex-1 flex justify-center items-center flex-col text-center">
          <div>
            <Image
              src="/assets/icons/truck.png"
              alt="none"
              width={50}
              height={50}
            />
          </div>
          <p className="w-52 text-xs text-gray-300 sm:text-sm  md:text-xs sm:w-40 md:w-60 text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum
            iste est consectetur facilis voluptates, beatae sit blanditiis,
            excepturi mollitia aperiam quod, quaerat ratione nisi explicabo
            omnis inventore repellendus nesciunt veritatis!
          </p>
        </div>
      </div>
    );
}

export default InfoStore;
