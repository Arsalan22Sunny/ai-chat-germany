import getToken, { API_URL } from "./signin.test";

async function getPDFs(token) {
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  const response = await fetch(`${API_URL}/get-pdfs`, { headers });
  return response.json();
}

async function removePDF(document_id, token) {
  if (!document_id) return;
  const headers = {};
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  try {
    const response = await fetch(`${API_URL}/remove`, {
      method: "DELETE",
      headers,
      body: JSON.stringify({ document_id }),
    });

    return response.json();
  } catch (error) {
    console.error(error);
  }
}

getToken().then((token) => {
  const { access_token } = token;

  getPDFs(access_token)
    .then((data) => {
      const pdfs = data?.pdfs || [];
      const firstItem = pdfs[0] || {};
      const document_id = firstItem?.document_id;
      if (!document_id) {
        console.log(firstItem);
        return;
      }
      removePDF(document_id, access_token)
        .then(console.log)
        .catch(console.error);
    })
    .catch(console.error);
});
