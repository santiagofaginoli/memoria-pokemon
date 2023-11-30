import React, { useState, useEffect } from "react";
import "./StopWatch.css";
import Timer from "./Timer";


function StopWatch({time}) {

  return (
    <div className="stop-watch">
      <Timer time={time} />
    </div>
  );
}

export default StopWatch;
