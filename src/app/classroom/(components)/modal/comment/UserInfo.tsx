import React from "react";
import { Text } from "sfac-designkit-react";

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
      <Text size="sm" weight="semibold" className="text-blue-500">
        {username}
      </Text>
      <Text size="xs" weight="medium" className="text-gray-500 ml-1">
        &#183; {role}
      </Text>
    </div>
  ) : (
    <div className="flex items-center mb-1">
      <Text
        size="sm"
        weight="medium"
        className={isForm ? "" : "font-semibold "}
      >
        {username}
      </Text>
      <Text size="xs" weight="medium" className="text-gray-500 ml-1">
        &#183; {role}
      </Text>
    </div>
  );
};
export default UserInfo;
