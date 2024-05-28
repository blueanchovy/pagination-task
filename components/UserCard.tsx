import React from "react";

type Props = {
  data: { [key: string]: any };
};

const UserCard = (props: Props) => {
  const { data } = props;

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "16px",
        borderRadius: "4px",
        margin: "0 12px 16px 0",
        width: "20rem",
        overflow: "auto",
      }}
    >
      <h3 className="text-xl font-bold">{data.FirstNameLastName}</h3>
      <p className="text-gray-600 mb-2">Company: {data.Company}</p>
      <p className="text-gray-600 mb-2">Job Title: {data.JobTitle}</p>
      <p className="text-gray-600 mb-2">Email: {data.Email}</p>
      <p className="text-gray-600 mb-2">Phone: {data.Phone}</p>
    </div>
  );
};

export default UserCard;
