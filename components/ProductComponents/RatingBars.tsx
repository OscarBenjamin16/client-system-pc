import {useEffect,useState} from "react";
import { RatingVals,Bars } from "../../interfaces/rating";
import Bar from "./Bar";

interface Props {
  ratingData:[RatingVals] | undefined
}

const RatingBars = (props: Props) => {
const [bars, setBars] = useState<Bars>(barVal());
const { ratingData } = props;

  const filterbars = (rat: [RatingVals] | undefined, val: number) => {
    return rat?.filter((r: RatingVals) => r.ratingNumber === val);
  };

  const setRatingBar = () => {
    const bar1 = filterbars(ratingData, 1);
    const bar2 = filterbars(ratingData, 2);
    const bar3 = filterbars(ratingData, 3);
    const bar4 = filterbars(ratingData, 4);
    const bar5 = filterbars(ratingData, 5);
    console.log(bar5)
    console.log(ratingData)
    // const totalRatingSum = ratingData
    //   ?.map((rat: RatingVals) => rat.ratingNumber)
    //   .reduce((a = 0, b = 0) => a + b);
    setBars({
      bar_1: bar1?.length,
      bar_2: bar2?.length,
      bar_3: bar3?.length,
      bar_4: bar4?.length,
      bar_5: bar5?.length,
    });
  };
  useEffect(() => {
    setRatingBar()
    return;
  }, [ratingData])
  return (
    <>
     <Bar num={1} width={bars.bar_1} className="bar-1"/>
     <Bar num={2} width={bars.bar_2} className="bar-2"/>
     <Bar num={3} width={bars.bar_3} className="bar-3"/>
     <Bar num={4} width={bars.bar_4} className="bar-4"/>
     <Bar num={5} width={bars.bar_5} className="bar-5"/>
     
    </>
  );
};

export default RatingBars;
function barVal() {
    return {
      bar_1: 0,
      bar_2: 0,
      bar_3: 0,
      bar_4: 0,
      bar_5: 0,
    };
  }