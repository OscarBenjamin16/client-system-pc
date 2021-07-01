import { useState } from "react";
import { getToken } from "../../services/token.service";
import { addRating, editRating } from "../../services/rating.service";
import { Product } from "../../interfaces/product";
import StarRatingComponent from 'react-star-rating-component';
import { SetStateAction } from "react";
import { RatingVals } from "../../interfaces/rating";
import { toast } from "react-toastify";

interface Data {
  comentario: string | undefined;
  titulo: string | undefined;
  id: null | number | undefined;
}
interface Props {
  product: Product | undefined;
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
  setShowForm: React.Dispatch<SetStateAction<boolean>>;
  usRat: RatingVals | undefined;
}

const RatingForm = (props: Props) => {
  const { product, setIsLoading, usRat, setShowForm } = props;
  const [rating, setRating] = useState<number>(usRat ? usRat.ratingNumber : 0);
  const [dataValues, setDataValues] = useState<Data>(defaultVal(usRat));
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (
      dataValues.comentario === "" &&
      dataValues.titulo === "" &&
      rating === 0
    ) {
      toast.error("No dejes campos vacios")
      return;
    }
    const data = {
      ...dataValues,
      ratingNumber: rating,
      productoId: product?.id,
    };
    if (getToken()) {
      if (!usRat?.id) {
        addRating(data)
          .then(() => {
            toast.success("Se agrego el comentario")
            setIsLoading(true);
          })
          .catch(() => {
            toast.error("Ah ocurrido un error inesperado")
          });
        return;
      }
      editRating(data, usRat.id)
        .then(() => {
          toast.success("Se actualizo tu comentario")
          setIsLoading(true);
          setShowForm(false);
        })
        .catch(() => {
          toast.error("Ah ocurrido un error inesperado")
        });
    }
  };
  const ratingChanged = (nextValue: number) => {
    setRating(nextValue);
  };
  const onchange: React.FormEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    setDataValues({
      ...dataValues,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };
  return (
    <>
      <span className="text-sm font-semibold">
        Agrega un comentario acerca del producto
      </span>
      <div className="mt-4">
        <form onSubmit={onSubmit} className="flex flex-col">
          <input
            name="titulo"
            defaultValue={dataValues.titulo}
            onChange={onchange}
            className="w-6/12 text-xs border p-1"
            placeholder="Escribe el titulo de tu comentario"
          />
          <textarea
            cols={3}
            rows={3}
            className="w-6/12 border text-xs p-2 mt-2"
            placeholder="Escirbe tu comentario acerca del producto"
            onChange={onchange}
            name="comentario"
            defaultValue={dataValues.comentario}
          />
         <div className="text-2xl w-auto">
         <StarRatingComponent 
          name="rate1" 
          starCount={5}
          value={rating}
          onStarClick={ratingChanged}
          emptyStarColor="#C2BBB9"
        />
         </div>

          <button className="bg-green-500 text-sm px-4 rounded-xl py-1 text-white mt-3 w-36">
            Comentar
          </button>
        </form>
      </div>
    </>
  );
};

export default RatingForm;

function defaultVal(rat: RatingVals | undefined) {
  return {
    titulo: "" || rat?.titulo,
    comentario: "" || rat?.comentario,
    id: null || rat?.id,
  };
}
