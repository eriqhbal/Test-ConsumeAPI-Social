export type dataPengguna = {
  address: {
    city: string;
    geo: {
      lat: string;
      lng: string;
    };
    street: string;
    suite: string;
    zipcode: string;
  };
  company: {
    bs: string;
    catchPhrase: string;
    name: string;
  };
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
};

export type typePostingUser = {
  body: string;
  id: number;
  title: string;
  userId: number;
};

export type typeCommentUser = {
  postId: number,
  id: number,
  name: string,
  email: string,
  body: string
}

// Get User
export async function getDataPengguna() {
  const endpoint = "https://jsonplaceholder.typicode.com/users";
  return await (await fetch(endpoint)).json();
}

// get detail user
export async function getDetailUser(id: string | unknown) {
   const endpoint = `https://jsonplaceholder.typicode.com/users/${id}`;

   return await (await fetch(endpoint)).json();
}

// Get Posting User
export async function getUserPosting(id?: string | number) {
  const endpoint = "https://jsonplaceholder.typicode.com/posts";
  const dataPost: typePostingUser[] = await (await fetch(endpoint)).json();

  return dataPost.filter((value) => value.userId == id);
}

// Get Posting Comment
export async function getCommentUser(id?: string | number) {
  const endpoint = `https://jsonplaceholder.typicode.com/posts/${id}/comments`;

  return await (await fetch(endpoint)).json();
}
