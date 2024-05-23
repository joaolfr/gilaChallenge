import { api } from "../api/axios";
import { useEffect, useState } from "react";
import "./DataFetcher.css"
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

interface User {
  userId: number;
  id:number;
  title:string;
  body:string;
}

export function DataFetcher() {
  const {mode, toggle} = useContext(ThemeContext)
  const [fetchedData, setFechedData] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    api.get<User[]>('/')
    .then(res => {
      setLoading(false)
      setFechedData(res.data)
    })
  }, [])

  return (
    <div className={`theme-${mode}`}>
      <label>
        <input
          type="checkbox"
          checked={mode === 'dark'}
          onChange={toggle}
        />
        Dark mode
      </label>
      {loading? <p>loading</p> : <p>Gila Software</p>}
      {fetchedData.length > 0 && fetchedData.map(item => {

       return( 
        <div key={item.id}>
          <p>ID: {item.id}</p>
          <p>User ID: {item.userId}</p>
          <p>Title: {item.title}</p>
          <p>Body: {item.body}</p>
          <br />
        </div>
      )}
       )}
    </div>
  )
}
