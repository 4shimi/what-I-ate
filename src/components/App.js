import FoodList from "./FoodList";
import { useState, useEffect } from "react";
import { getFoods } from "../api";

const LIMIT = 5;

function App() {
  // asdfasdfasdfasdfadsfasdfadsfasdfadsfasdasdfas
  const [order, setOrder] = useState("createdAt");
  const [items, setItems] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);
  const [search, setSearch] = useState(``);

  const handleNewestClick = () => setOrder("createdAt");
  //const handleCalorieClick = () => setOrder("calorie");
  const handleLowCalorieClick = () => setOrder("lowCalorie");
  const handleHighCalorieClick = () => setOrder("highCalorie");

  const sortedItems = items.sort((a, b) => {
    // 최신일자순
    if (order === "createdAt") {
      if (a.order > b.order) return -1;
      if (a.order < b.order) return 1;
      return 0;
    }

    // 칼로리 정렬
    // 저칼로리순
    if (order === "lowCalorie") {
      if (a.calorie > b.calorie) return 1;
      if (a.calorie < b.calorie) return -1;
      return 0;
    }

    // 고칼로리순
    if (a.calorie > b.calorie) return 1;
    if (a.calorie < b.calorie) return -1;
    return 0;
  });

  const handleDelete = (i) => {
    const nextItems = items.filter((item) => item.id !== i);
    setItems(nextItems);
  };

  const handleLoad = async (options) => {
    let result;
    try {
      setIsLoading(true);
      setLoadingError(null);
      result = await getFoods(options);
    } catch (error) {
      setLoadingError(error);
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

  const handleLoadMore = () => {
    handleLoad({ order, cursor, search, limit: LIMIT });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSearch(e.target["search"].value);
  };

  useEffect(() => {
    handleLoad({ order, search });
  }, [order, search]);

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <input name="search" />
        <button type="submit">검색</button>
      </form>
      <button onClick={handleNewestClick}>최신순</button>
      <button onClick={handleHighCalorieClick}> 고칼로리순</button>
      <button onClick={handleLowCalorieClick}> 저칼로리순</button>
      <FoodList items={sortedItems} onDelete={handleDelete} />
      {cursor && (
        <button disabled={isLoading} onClick={handleLoadMore}>
          더보기
        </button>
      )}
      {loadingError?.message && <span>{loadingError.message}</span>}
    </div>
  );
}

export default App;
