import React, { useEffect } from "react";

const Routed = () => {
  useEffect(() => {
    fetch("")
      .then((res) => {
        return res.json();
      })
      .then((data) => console.log(data));
  }, []);
  return <div>'skdjf'</div>;
};

export default Routed;
