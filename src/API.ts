// Get User
export async function getDataPengguna() {
   const endpoint = "https://jsonplaceholder.typicode.com/users";
   return await (await fetch(endpoint)).json();
}

// Get Posting User
