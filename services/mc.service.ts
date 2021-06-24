export async function getMarks() {
    const response = await fetch("/api/marca");
    return response.json();
}

export async function getCategories() {
    const response = await fetch("/api/categoria");
    return response.json();
}