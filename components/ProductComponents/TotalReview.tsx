import { useState, useEffect } from "react";
import StarRatingComponent from "react-star-rating-component";
// import ReactStars from "react-rating-stars-component";

interface Props {
  totalReview:{total: number, users: number}
}

const TotalReview = (props: Props) => {
  const {totalReview} = props
  const [parcedReview, settotalReview] = useState(0)
  useEffect(() => {
    settotalReview(
      totalReview.total / totalReview.users
    );
  }, [totalReview])

  return (
    <div>
      <span className="text-4xl md:text-7xl font-bold mt-2">
        {isNaN(parcedReview) ? 0 : parcedReview.toFixed(1)}
      </span>
      {totalReview && (
        <div>
          <StarRatingComponent
            name="rate1"
            starCount={5}
            value={totalReview.total}
            emptyStarColor="#C2BBB9"
            editing={false}
          />
        </div>
      )}
      <p className="text-xs font-extralight mt-4">
        {totalReview.users} - usuarios
      </p>
    </div>
  );
};

export default TotalReview;
