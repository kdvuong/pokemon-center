import React, { FunctionComponent, ReactNode } from "react";

interface IProps {
  title: string;
  children: ReactNode;
}

const Section: FunctionComponent<IProps> = (props) => {
  const { title, children } = props;

  return (
    <div
      style={{
        margin: "1rem 0rem",
      }}
    >
      <div
        style={{
          display: "flex",
          borderTop: "1px solid #e1e7ec",
          borderBottom: "1px solid #e1e7ec",
          fontSize: "16px",
          padding: "0.75rem",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <i
          className="icon-pokeball"
          style={{ paddingLeft: "1rem", fontSize: "20px", color: "#dd2020" }}
        />
        <span style={{ paddingLeft: "1rem", fontWeight: "bold" }}>{title}</span>
      </div>
      {children}
    </div>
  );
};

export default Section;
