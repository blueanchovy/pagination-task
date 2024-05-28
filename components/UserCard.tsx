import React from "react";

type Props = {
  data: { [key: string]: any };
};

const UserCard = (props: Props) => {
  console.log(props?.data);
  return (
    <div className="p-8 h-16 w-16 border-solid border-white border-2">
      <span className="text-2xl">{props?.data?.FirstNameLastName}</span>
    </div>
  );
};

export default UserCard;
