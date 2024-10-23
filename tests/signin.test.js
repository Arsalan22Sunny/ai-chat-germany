export const API_URL = 'https://back.sanbjur.de/api';

const credentials = {
  username: "santokhan1999@gmail.com",
  password: "santo@1234",
};

async function signIn(username, password) {
  const response = await fetch(`${API_URL}/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({ username, password }),
  });
  return response.json();
}

const getToken = async () => {
  const token = await signIn(credentials.username, credentials.password)
  return token;
};

export default getToken;