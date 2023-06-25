import { useState, useEffect } from "react";
import axios from "axios";

const Polling = () => {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://hn.algolia.com/api/v1/search_by_date?tags=story&page=${page}`
        );
        const data = response.data;
        const newList = data.hits.map((post) => ({
          title: post.title,
          url: post.url,
          created_at: post.created_at,
          author: post.author,
        }));

        console.log(newList);
        setList((prevList) => [...prevList, ...newList]);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    const timer = setInterval(() => {
      fetchData();
      setPage((prevPage) => prevPage + 1);
    }, 10000);

    return () => clearInterval(timer);
  }, [page]);

  return (
    <div>
      <h1>Polling App</h1>
      {list.length > 0 && (
        <table rules="all" style={{ border: "1px solid black" }}>
          <thead>
            <tr>
              <th>Title</th>
              <th>URL</th>
              <th>Created At</th>
              <th>Author</th>
            </tr>
          </thead>
          <tbody>
            {list.map((post, index) => (
              <tr key={index}>
                <td>{post.title}</td>
                <td>
                  <a href={post.url} target="_blank" without rel="noreferrer">
                    {post.url}
                  </a>
                </td>
                <td>{post.created_at}</td>
                <td>{post.author}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Polling;
