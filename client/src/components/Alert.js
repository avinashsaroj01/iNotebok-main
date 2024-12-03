import React from "react";

export default function Alert(props) {

  const capitalize = (word) => {

    if (word) {
      if (word==="danger") {
        word="error"
      }
      const lower = word.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return ""; // Return an empty string if word is undefined
  };

  return (
    props.alert && (
      <div
        className={` container mt-5 position-sticky alert alert-${props.alert.type} alert-dismissible fade show `} 
        role="alert"
      >
        <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
      </div>
    )
  );
}
