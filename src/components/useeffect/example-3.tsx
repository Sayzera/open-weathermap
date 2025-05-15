import React, { useEffect, useState } from "react";

type Props = {};

interface FakeApiData {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

function Example3({}: Props) {
  const [fakeApiData, setFakeApiData] = useState<FakeApiData[]>([]);
  const [refresh, setRefresh] = useState(1);

  useEffect(() => {
    setFakeApiData([]);

    const timer = setTimeout(() => {
      getFakeApi();
    }, 1000);


    return () => {
      clearInterval(timer);
    };
  }, [refresh]);

  async function getFakeApi() {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    );
    const data = await response.json();

    setFakeApiData(data);

    return data;
  }


  const deleteItem = (id:number) => {
    setFakeApiData(
        prev => prev.filter((item) => item.id != id)
    )

  }

  return (
    <div>
      <button
        onClick={() => {
          setRefresh((prev) => prev + 1);
        }}
      >
        Refresh
      </button>

      {fakeApiData?.length > 0 &&
        fakeApiData?.map((item) => (
          <div key={item.id}>
            <div
              style={{
                borderBottom: "1px solid black",
                paddingBottom: "5px",
              }}
            >
              <div>{item.body}</div>

              <button
               onClick={() => {
                deleteItem(item.id)
               }}
              >sil</button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Example3;
