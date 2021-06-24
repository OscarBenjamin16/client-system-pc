import React from "react";

interface Props {
  data: string | number |undefined;
  name: string;
}

const PDetail = (props: Props) => {
  const { data, name } = props;
  return (
    <p className="font-medium text-md">
        {name}:
      <span className=" font-light mt-6 text-sm"> {data}</span>
    </p>
  );
};

export default PDetail;
