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
  userId: number | unknown;
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
export async function getDetailUser(id: unknown) {
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

// Post Posting User
export async function postPostingan(title: string, body: string, userId: unknown) {
  const endpoint = "https://jsonplaceholder.typicode.com/posts";

  return fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({title, body, userId}),
          }).then(res => res.json());
}

// Put Postingan User
export async function editPostingan(
  userId: string | unknown,
  id: string | unknown,
  title?: string,
  body?: string
) {
  const endpoint = `https://jsonplaceholder.typicode.com/posts/${id}`;

  return fetch(endpoint, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({ id, title, body, userId }),
  }).then((res) => res.json());
}

// Remove Postingan User
export async function removePost(id: number) {
  return fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,{
    method: 'DELETE'
  });
}