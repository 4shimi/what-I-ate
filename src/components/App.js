import FoodList from "./FoodList";
import { useState, useEffect } from "react";
import { getFoods } from "../api";

const LIMIT = 5;

function App() {
  const [order, setOrder] = useState("createdAt");
  const [items, setItems] = useState([]);
  const [cursor, setCursor] = useState();
  const [isLoading, setIsLoading] = useState(false);

  let sortedItems;
  if (order === "createdAt") {
    sortedItems = items.sort((a, b) => b.createdAt - a.createdAt);
  } else if (order === "lowCalorie") {
    sortedItems = items.sort((a, b) => a.calorie - b.calorie);
  } else {
    sortedItems = items.sort((a, b) => b.calorie - a.calorie);
  }

  const handleNewestClick = () => setOrder("createdAt");
  const handleLowCalorieClick = () => setOrder("lowCalorie");
  const handleHighCalorieClick = () => setOrder("highCalorie");

  const handleDelete = (i) => {
    const nextItems = items.filter((item) => item.id !== i);
    setItems(nextItems);
  };

  const handleLoad = async (options) => {
    let result;
    try {
      setIsLoading(true);
      result = await getFoods(options);
    } catch (error) {
      console.error(error);
      return;
    } finally {
      setIsLoading(false);
    }

    const { paging, foods } = result;
    if (!options.cursor) {
      setItems(foods);
    } else {
      setItems((preItems) => [...preItems, ...foods]);
    }
    setCursor(paging.nextCursor);
  };

  const HandleLoadMore = () => {
    handleLoad({ order, cursor, limit: LIMIT });
  };

  useEffect(() => {
    handleLoad(order);
  }, [order]);

  return (
    <div>
      <button onClick={handleNewestClick}>최신순</button>
      <button onClick={handleLowCalorieClick}>낮은칼로리순</button>
      <button onClick={handleHighCalorieClick}>높은칼로리순</button>
      <FoodList items={sortedItems} onDelete={handleDelete} />
      {cursor && (
        <button disabled={isLoading} onClick={HandleLoadMore}>
          더보기
        </button>
      )}
    </div>
  );
}

export default App;
