import React from "react";

interface Props {
  name: string;
}

const TH = ({ name }: Props) => {
  return (
    <th
      scope="col"
      className="px-5 font-small whitespace-nowrap md:text-xs py-3 border-b-2 text-left border-gray-200 bg-gray-100 font-semibold text-gray-600 uppercase tracking-wider"
    >
      {name}
    </th>
  );
};

export default TH;
