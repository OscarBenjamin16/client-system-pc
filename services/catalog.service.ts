import { SERVER_API } from "../utils/constants";

export async function getPaginatedProducts(
  page: number,
  search: string,
  order: number,
  price?: number
) {
  const response = await fetch(
    `${SERVER_API}/producto/products-paginate?pagina=${page}&producto=${search}&order=${order}&price=${
      price ? price : 10000
    }`
  );
  return response.json();
}
export async function getBestRating(page: number, price: number) {
  const response = await fetch(
    `${SERVER_API}/producto/more-ratings?pagina=${page}&price=${
      price ? price : 10000
    }`
  );
  return response.json();
}
export async function getMostSellers(page: number, price: number) {
  const response = await fetch(
    `${SERVER_API}/producto/bestSellers?pagina=${page}&price=${
      price ? price : 10000
    }`
  );
  return response.json();
}
export function showImage(name: string | undefined) {
  return `${SERVER_API}/producto/image?image=${name}`;
}

export async function getProductbyMark(marca: number, price: number) {
  const response = await fetch(
    `${SERVER_API}/producto/product-marca?marca=${marca}&price=${
      price ? price : 10000
    }`
  );
  return response.json();
}
export async function getProductbyCategory(category: number, price: number) {
  const response = await fetch(
    `${SERVER_API}/producto/product-categoria?categoria=${category}&price=${
      price ? price : 10000
    }`
  );
  return response.json();
}
export async function getProductById(
  id: string | string[] | number | undefined
) {
  const response = await fetch(`${SERVER_API}/producto/${id}`);
  return response.json();
}
export async function getNewProducts() {
  const response = await fetch(`${SERVER_API}/producto/news`);
  return response.json();
}
