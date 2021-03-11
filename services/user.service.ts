export async function getAllUsers() {
    const response = await fetch('/api/authU/test');
    return await response.json();
}
