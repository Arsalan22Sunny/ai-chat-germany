// const BASE_URL = 'http://217.160.190.143:8050';
const API_URL = 'https://back.sanbjur.de/api';

async function query(question, chatHistory, token) {
    const response = await fetch(`${API_URL}/query`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            question,
            chat_history: chatHistory || []
        })
    });
    return response.json();
}

async function signUp(username, password) {
    const response = await fetch(`${API_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    });
    return response.json();
}

async function signIn(username, password) {
    const response = await fetch(`${API_URL}/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({ username, password })
    });
    return response.json();
}

async function verifyEmailStatus(email) {
    const response = await fetch(`${API_URL}/verify-email-status/${encodeURIComponent(email)}`);
    return response.json();
}

async function extractPDF(pdfFileName, token) {
    const response = await fetch(`${API_URL}/pdf_content/${encodeURIComponent(pdfFileName)}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    return response.json();
}

async function saveChat(username, content) {
    const response = await fetch(`${API_URL}/save-chat`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, content })
    });
    return response.json();
}

async function changePassword(current_password, new_password, token) {
    const response = await fetch(`${API_URL}/change-password`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ current_password, new_password })
    });
    return response.json();
}

async function blockUser(username, blockStatus) {
    const response = await fetch(`${API_URL}/api/block-user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, blockStatus })
    });
    return response.json();
}

const credentials = {
    username: 'santokhan1999@gmail.com',
    password: 'santo@1234'
}

// signUp(credentials.username, credentials.password).then(console.log).catch(console.error);

signIn(credentials.username, credentials.password).then((token => {
    console.log(token);
    const { access_token } = token
    // query('Hi', [], access_token).then(console.log).catch(console.error);
    changePassword(credentials.password, 'santo@12345', access_token).then(console.log).catch(console.error);
})).catch(console.error);

// verifyEmailStatus(credentials.username).then(console.log).catch(console.error);
