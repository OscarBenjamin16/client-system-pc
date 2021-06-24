import React, { SetStateAction, useEffect, useState } from "react";
import { RatingVals } from "../../interfaces/rating";
import Popper, { ReferenceObject } from "popper.js";
import { showImageClient } from "../../services/client.service";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StarRatingComponent from "react-star-rating-component";
// import ReactStars from "react-rating-stars-component";

interface Props {
  userLogRating: RatingVals | undefined;
  setShowForm: React.Dispatch<SetStateAction<boolean>>;
}
const UserLogRating = (props: Props) => {
  const { userLogRating, setShowForm } = props;
  const [rating, setRating] = useState<number | undefined>();
  const btnDropdownRef = React.createRef<Element | ReferenceObject | any>();
  const popoverDropdownRef = React.createRef<Element | ReferenceObject | any>();
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);

  const openDropdownPopover = () => {
    new Popper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  const setratingUser = () => {
    setRating(userLogRating ? userLogRating.ratingNumber : 0);
  };
  useEffect(() => {
    setratingUser();
    return;
  }, [userLogRating]);
  return (
    <>
      {userLogRating &&
          <div className="shadow-md p-2 mt-4">
            <div className="flex rounded p-8">
              <div
                className="rounded-full h-14 w-14"
                style={{
                  background: `url(${showImageClient(userLogRating.cliente.imagen)})`,
                  backgroundSize:'cover',
                  backgroundPosition:'center'
                }}
              ></div>
              <div className="ml-8 w-full">
                <span className="text-sm">
                  {userLogRating.cliente.nombre} {userLogRating.cliente.apellido}
                </span>
                {
                  <span
                    className=" float-right cursor-pointer"
                    ref={btnDropdownRef}
                    onClick={() => {
                      dropdownPopoverShow
                        ? closeDropdownPopover()
                        : openDropdownPopover();
                    }}
                  >
                    <FontAwesomeIcon icon={faEllipsisH} />
                  </span>
                }
                {rating && (
                  <div>
                    <StarRatingComponent
                      name="rate1"
                      starCount={5}
                      value={rating}
                      emptyStarColor="#C2BBB9"
                    />
                  </div>
                )}
                <p className="text-xs font-semibold">{userLogRating.titulo}</p>
                <p className="mt-2 text-xs font-extralight">{userLogRating.comentario}</p>
              </div>
              <div
                ref={popoverDropdownRef}
                className={
                  (dropdownPopoverShow ? "block " : "hidden ") +
                  "text-base lg:left-0 dpdown float-left py-2 list-none text-left rounded shadow-lg mt-6"
                }
                style={{ minWidth: "12rem" }}
              >
                <a
                  href="#pablo"
                  className={
                    "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent "
                  }
                  onClick={(e) => e.preventDefault()}
                >
                  Eliminar
                </a>
                <button
                  className="text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent "
                  onClick={() => setShowForm(true)}
                >
                  Editar
                </button>
              </div>
            </div>
          </div>
        }
    </>
  );
};

export default UserLogRating;
