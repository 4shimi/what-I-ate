import FoodList from "./FoodList";
import items from "../mock.json";
import { useState } from "react";

function App() {
  const [order, setOrder] = useState("createdAt");
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

  return (
    <div>
      <button onClick={handleNewestClick}>최신순</button>
      <button onClick={handleLowCalorieClick}>낮은칼로리순</button>
      <button onClick={handleHighCalorieClick}>높은칼로리순</button>
      <FoodList items={sortedItems} />
    </div>
  );
}

export default App;
