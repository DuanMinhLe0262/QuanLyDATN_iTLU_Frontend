import React from "react";

const FailMessage = ({ message }) => (
  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50">
    {message}
  </div>
);

export default FailMessage;