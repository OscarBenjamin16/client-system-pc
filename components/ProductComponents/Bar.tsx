import React from 'react';

interface Props{
    num:number,
    width:number | undefined,
    className:string,
}

const Bar = (props:Props) => {
    const {num,width,className} = props
    return (
        <div className="row-bar w-32 md:w-48">
        <div className="left-bar text-xs font-thin">{num}</div>
        <div className="right-bar">
          <div className="bar-container rounded mt-1">
            <div className={className} style={{ width: `${width}%` }}></div>
          </div>
        </div>
      </div>
    );
}

export default Bar;
