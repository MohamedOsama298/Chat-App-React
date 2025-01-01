import { Card, Input, notification } from "antd";
import React, { useState } from "react";
import { authorizedHttpInstance } from "../../network/baseUrl";
import { UserAddOutlined } from "@ant-design/icons";
import { NotificationType } from "../../types/NotificationTypes";

interface SearchedUsers {
  _id: string;
  userName: string;
  isFriend: boolean;
}
const SearchTab: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (
    type: NotificationType,
    message: string,
    description: string
  ) => {
    api[type]({
      message,
      description,
    });
  };
  const SearchUsers = async () => {
    SetLoading(true);
    console.log(SearchValue);
    authorizedHttpInstance
      .get("/user/searchUsers", {
        params: {
          searchQuery: SearchValue,
        },
      })
      .then((response) => {
        console.log(response);
        setMatchingUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    SetLoading(false);
  };

  const addFriend = async (userName: string) => {
    authorizedHttpInstance
      .post("/user/addFriend", { friend: userName })
      .then((response) => {
        SearchUsers();
        openNotificationWithIcon(
          "success",
          "Success",
          "Successfully Added friend"
        );
        console.log(response);
      })
      .catch((error) => {
        openNotificationWithIcon(
          "error",
          "Error",
          "There was an error adding friend"
        );
        console.log(error);
      });
  };

  const [matchingUsers, setMatchingUsers] = useState<SearchedUsers[]>([]);
  const [Loading, SetLoading] = useState<boolean>(false);
  const [SearchValue, SetSearchValue] = useState<string>("");
  return (
    <div>
      {contextHolder}
      <Input.Search
        loading={Loading}
        onChange={(e) => SetSearchValue(e.target.value)}
        placeholder="Search for A Friend"
        enterButton
        onSearch={SearchUsers}
      />
      {matchingUsers.map((user, index) => (
        <Card
          size="small"
          title={user.userName}
          key={index}
          className="singleElem"
          extra={
            user.isFriend ? (
              ""
            ) : (
              <UserAddOutlined onClick={() => addFriend(user.userName)} />
            )
          }
          style={{ width: 300 }}
        />
      ))}
    </div>
  );
};

export default SearchTab;
