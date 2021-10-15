import { RatingVals } from "../../interfaces/rating";
import StarRatingComponent from "react-star-rating-component";
import { useAuth } from "../../hooks/useAuth";
import { Context } from "../../interfaces/context";

interface Props {
  rd: RatingVals | undefined;
}

const RatingInfo = (props: Props) => {
  const { rd } = props;
  const ctx:Context = useAuth()
  return (
    <>
      {rd && rd.cliente.id !== ctx.auth?.clienteid && (
          <div className="shadow-md p-2 mt-8">
            <div className="flex shadow-md rounded p-2 md:p-8">
               <div
                className="rounded-full h-14 w-14"
                style={{
                  background: `url("/assets/icons/user.png")`,
                  backgroundSize:'cover',
                  backgroundPosition:'center'
                }}
              ></div>
              <div className="ml-2 md:ml-8 w-full">
                <span className="text-sm">
                  {rd?.cliente.nombre} {rd.cliente.apellido}
                </span>
                <div>
                  <StarRatingComponent
                    name="rate1"
                    starCount={5}
                    value={rd?.ratingNumber ? rd.ratingNumber : 0}
                    emptyStarColor="#C2BBB9"
                  />
                </div>
                <p className="text-xs font-semibold">{rd?.titulo}</p>
                <p className="mt-2 text-xs font-extralight">{rd?.comentario}</p>
              </div>
            </div>
          </div>
        )}
    </>
  );
};

export default RatingInfo;
