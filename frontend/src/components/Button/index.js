import React from "react";
import "./button.css";

const STYLES = [
  "btnGreen",
  "btnYellow",
  "btnDanger",
  "btnBlue",
  "btnGreenOutline",
  "btnBlueOutline",

];

const SIZES = [
  "btnMedium",
  "btnLarge",
  "btnLong",
];

 const Button = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize
  }) => {

    const root = {
        primary: '#39A9DB',
        warning: '#F9DC5C',
        danger: '#E84855',
        success: '#ABE188',
        white: '#fdfdfd',
        dark: '#181717;',
      };


    const checkButtonStyle = STYLES.includes(buttonStyle)
      ? buttonStyle
      : STYLES[0];
  
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
  
    return (
      <button
        className={`btn ${checkButtonStyle} ${checkButtonSize}`}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    );
  };

export default Button