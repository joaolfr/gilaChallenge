import { api } from "../api/axios";
import { useCallback, useEffect, useState } from "react";
import "./DataFetcher.css";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

interface User {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export function DataFetcher() {
  const { mode, toggle } = useContext(ThemeContext);
  const [fetchedData, setFechedData] = useState<User[]>([
    { id: 0, userId: 0, title: "empty", body: "empty" },
  ]);
  const [loading, setLoading] = useState(false);

  const loadData = useCallback(() => {
    setLoading(true);
    api.get<User[]>("/").then((res) => {
      setLoading(false);
      setFechedData(res.data);
    });
  }, []);

  useEffect(() => {
    loadData();
  }, []);

  const Loading = () => {
    return <p>Loading...</p>;
  };

  const UserCards = () => {
    return (
      <div className={`container theme-${mode}`}>
        <div className="header">
          <input type="checkbox" checked={mode === "dark"} onChange={toggle} />
          Dark mode
        </div>
        {fetchedData.map((item) => (
          <div key={item.id}>
            <p>ID: {item.id}</p>
            <p>User ID: {item.userId}</p>
            <p>Title: {item.title}</p>
            <p>Body: {item.body}</p>
            <br />
          </div>
        ))}
      </div>
    );
  };

  if (loading) return <Loading />;

  if (fetchedData.length > 0) return <UserCards />;
}
