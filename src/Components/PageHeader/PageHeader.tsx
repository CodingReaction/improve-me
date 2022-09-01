import React from "react";

const PageHeader = React.memo(
  ({
    title = "GOALS TRACKER",
    children = null,
  }: {
    title?: string;
    children?: React.ReactNode;
  }) => {
    return (
      <header>
        <h1>{title}</h1>
        <nav>{children}</nav>
      </header>
    );
  }
);

export default PageHeader;
