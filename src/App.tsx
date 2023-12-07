import { useEffect, useState } from 'react';
import { fetchApi } from './api';

function App() {
  const [items, setItems] = useState();

  const getData = async () => {
    const data = await fetchApi();

    setItems(data);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log('items', items);
  }, [items]);

  return <>Get woot api data to pupulate from backend</>;
}

export default App;
