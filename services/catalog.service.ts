export async function getPaginatedProducts(page: number, search: string,order:number) {
    const response = await fetch(`/api/producto/products-paginate?pagina=${page}&producto=${search}&order=${order}`)
    return response.json();
}
export async function getBestRating(page:number,limit?:number){
    const response = await fetch(`/api/producto/more-ratings?pagina=${page}&limit=${limit}`)
    return response.json();
}
export async function getMostSellers(page:number){
    const response = await fetch(`/api/producto/bestSellers?pagina=${page}`)
    return response.json();
}
export function showImage(name: string | undefined) {
    return `/api/producto/image?image=${name}`
}

export async function getProductbyMark(marca: number) {
    const response = await fetch(`/api/producto/product-marca?marca=${marca}`)
    return response.json()
}
export async function getProductbyCategory(category: number) {
    const response = await fetch(`/api/producto/product-categoria?categoria=${category}`)
    return response.json()
}
export async function getProductById(id: string | string[] | number | undefined) {
    const response = await fetch(`/api/producto/${id}`)
    return response.json()
}
export async function getNewProducts(){
    const response = await fetch('/api/producto/news')
    return response.json()
}