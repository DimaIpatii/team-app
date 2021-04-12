import { ISpinnerStyles, IButtonStyles, IImageStyles } from "@fluentui/react";

export const spinnerStyles = (): ISpinnerStyles => {
  return {
    root: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
    },
  };
};

export const clouseIconButtonStyle = (): IButtonStyles => {
  return {
    root: {
      position: "absolute",
      top: 25,
      right: 25,
      backgroundColor: "transparent",
      zIndex: 100,
    },
    rootHovered: {
      backgroundColor: "transparent",
    },
    icon: {
      width: 30,
      height: 30,
      fontSize: 20,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  };
};

export const primaryButtonStyle = (): IButtonStyles => {
  return {
    root: {
      borderRadius: "none",
      backgroundColor: "#006ba1",
      width: 150,
      height: 40,
      fontSize: 18,
      textTransform: "uppercase",
      padding: "0 10px",
    },
  };
};

export const imageStyles = (): IImageStyles => {
  return {
    root: {
      cursor: "pointer",
    },
    image: {
      height: "100%",
      width: "100%",
    },
  };
};
