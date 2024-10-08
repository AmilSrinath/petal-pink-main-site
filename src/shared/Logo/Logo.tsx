import React from "react";
import { Link } from "react-router-dom";
// import logoImg from "images/logo.svg";
import logoLightImg from "images/logo-light.svg";

import logoImg from "img/gold_tra.png";

export interface LogoProps {
  img?: string;
  imgLight?: string;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({
  img = logoImg,
  imgLight = logoImg,
  className = "flex-shrink-0",
}) => {
  return (
    <Link
      to="/"
      className={`ttnc-logo inline-block text-slate-600 ${className}`}
    >
      {/* THIS USE FOR MY CLIENT */}
      {/* PLEASE UN COMMENT BELLOW CODE AND USE IT */}
      {img ? (
        <img
          className={`block max-h-12 sm:max-h-14 ${
            imgLight ? "dark:hidden" : ""
          }`}
          src={img}
          alt="Logo"
        />
      ) : (
        "Logo Here"
      )}
      {imgLight && (
        <img
          className="hidden max-h-12 sm:max-h-14 dark:block"
          src={imgLight}
          alt="Logo-Light"
        />
      )}
    </Link>
  );
};

export default Logo;
