import React from "react";

interface UserInfoProps {
  username: string;
  role: string;
}
const UserInfo: React.FC<UserInfoProps> = ({ username, role }) => (
  <div className="flex items-center mb-1">
    <span className="font-semibold ">{username}</span>
    <span className="text-sm ml-1 text-gray-500 font-light">&#183; {role}</span>
  </div>
);

export default UserInfo;
