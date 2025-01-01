import MessageBar from "../messageBar/MessageBar";
import { Chat } from "../../types/chat";
import { List, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMesages } from "./queries";
import { useQuery } from "@tanstack/react-query";

const ChatComponent: React.FC<Chat> = ({
  name,
  id,
  type,
  members,
  updatedAt,
}) => {
  const { data, isError } = useQuery({
    queryKey: [`chatMessages-${id}`],
    queryFn: () => fetchMesages(id),
  });
  const loadMoreData = () => {
    return;
  };
  return (
    <div>
      {/* <p>{`${name}  ${type}  ${members} ${updatedAt}`}</p> */}
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <p className="navbar-brand">{name}</p>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </nav>
      <div
        id="scrollableDiv"
        style={{
          height: "80vh",
          overflow: "auto",
          padding: "0 16px",
        }}
      >
        {data && (
          <InfiniteScroll
            dataLength={data.length}
            next={loadMoreData}
            hasMore={false}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            scrollableTarget="scrollableDiv"
          >
            <List
              dataSource={data}
              renderItem={(item) => (
                <List.Item key={item.sender.userName}>
                  <List.Item.Meta
                    title={item.sender.userName}
                    description={item.body}
                  />
                </List.Item>
              )}
            />
          </InfiniteScroll>
        )}
      </div>
      <MessageBar chatID={id} />
    </div>
  );
};

export default ChatComponent;
