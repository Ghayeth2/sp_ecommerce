import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/fontawesome-free-solid";
import {ProductDetails} from "./ProductDetails";

export const Rate = ({ count, ProductDetails, color, onRating }) => {
    const [hoverRating, setHoverRating] = useState(0);

    const getColor = Rate => {
        if (hoverRating >= Rate) {
            return color.filled;
        } else if (!hoverRating && ProductDetails >= Rate) {
            return color.filled;
        }
        return color.unfilled;
    };

    const starRating = useMemo(() => {
        return Array(count)
            .fill(0)
            .map((_,i) => i + 1)
            .map((idx) =>
                <FontAwesomeIcon
                    key={idx}
                    icon={faStar}
                    className="cursor-pointer"
                    onClick={() => onRating(idx)}
                    style={{ color:getColor(idx) }}
                    onMouseEnter={() => setHoverRating(idx)}
                    onMouseLeave={() => setHoverRating(0)}
                />);
    }, [count,ProductDetails,hoverRating]);

    return <div>{starRating}</div>;
};

Rate.propTypes = {
    count: PropTypes.number,
    rating: PropTypes.number,
    onRating: PropTypes.func, // Ensure onRating is a required function prop
    color:{
        filled: PropTypes.string,
        unfilled: PropTypes.string,
    }
};

Rate.defaultProps = {
    count: 5,
    rating: 0,
    color: {
        filled: "#f1ec4b",
        unfilled: "#DCDCDC",
    },
};
export default Rate;
