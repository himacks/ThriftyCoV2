import React from "react";
import "../styling/QuoteDisplay.css"; // this is the CSS file for the component

type Props = {
    quote: string;
};

const QuoteDisplay: React.FC<Props> = ({quote}) => {
    return (
        <div className="quote-container">
            <p className="quote-text">{quote}</p>
        </div>
    );
};

export default QuoteDisplay;
