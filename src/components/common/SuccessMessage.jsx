import React from "react";

const SuccessMessage = ({ message }) => (
  <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 ">
    {message}
  </div>
);

export default SuccessMessage;