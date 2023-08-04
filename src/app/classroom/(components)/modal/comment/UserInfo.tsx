import React from "react";

interface UserInfoProps {
  username: string | undefined;
  role?: string;
  isForm?: boolean;
  isHeader?: boolean;
}

const UserInfo: React.FC<UserInfoProps> = ({
  username,
  role,
  isForm,
  isHeader,
}) => {
  return isHeader ? (
    <div className="flex items-center ml-2">
      <span className=" text-sm font-semibold text-blue-500 ">{username}</span>
      <span className="text-sm ml-1 text-gray-500">&#183; {role}</span>
    </div>
  ) : (
    <div className="flex items-center mb-1">
      <span className={isForm ? "" : "font-semibold "}>{username}</span>
      <span className="text-sm ml-1 text-gray-500 font-light">
        &#183; {role}
      </span>
    </div>
  );
};
export default UserInfo;
