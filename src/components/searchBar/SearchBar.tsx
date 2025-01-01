import { Input } from "antd";
import { useState } from "react";
import { authorizedHttpInstance } from "../../network/baseUrl";

export default function SearchBar() {
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
      })
      .catch((error) => {
        console.log(error);
      });
    SetLoading(false);
  };

  const [Loading, SetLoading] = useState<boolean>(false);
  const [SearchValue, SetSearchValue] = useState<string>("");
  return (
    <div>
      <Input.Search
        loading={Loading}
        onChange={(e) => SetSearchValue(e.target.value)}
        placeholder="Search for A Friend"
        enterButton
        onSearch={SearchUsers}
      />
    </div>
  );
}
