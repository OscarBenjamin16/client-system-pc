import {ReactNode} from "react";

interface Props {
  children: ReactNode;
}

const TDTable = ({ children }: Props) => {
  return (
    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5">
      <div className="flex items-center text-center">
        <div className="ml-3">
            {children}
        </div>
      </div>
    </td>
  );
};

export default TDTable;
