export async function getFoods({
  order = ``,
  cursor = ``,
  limit = 5,
  search = ``,
}) {
  const query = `order=${order}&cursor=${cursor}&limit=${limit}&search=${search}`;
  const response = await fetch(`http://learn.codeit.kr/9984/foods?${query}`);
  if (!response.ok) {
    throw new Error(`로딩에 실패하였습니다.`);
  }
  const body = await response.json();
  return body;
}
