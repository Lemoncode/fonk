import "./helper.css";
import React from "react";

// Checkbox input
export const Checkbox = ({
  field: { name, value, onChange, onBlur },
  form: { errors, touched, setFieldValue },
  id,
  label,
  className,
  ...props
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "baseline"
      }}
    >
      <input
        name={name}
        id={id}
        type="checkbox"
        value={value}
        checked={value}
        onChange={onChange}
        onBlur={onBlur}
        style={{ width: "auto" }}
      />
      <label htmlFor={id} style={{ flexGrow: "1" }}>
        {label}
      </label>
    </div>
  );
};
