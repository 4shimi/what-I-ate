export async function getFoods({ order = `calorie`, cursor = ``, limit = 5 }) {
  const query = `order=${order}&cursor=${cursor}&limit=${limit}`;
  const response = await fetch(`http://learn.codeit.kr/9984/foods?${query}`);
  const body = await response.json();
  return body;
}
