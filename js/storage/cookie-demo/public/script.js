// console.log('智能前端, 智能后端, 笑傲秋招');

const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    console.log(username, password);
    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
        const data = await response.json();
        console.log(data);
        
    } catch (err) {
        console.error('登录失败');
    }
})

document.addEventListener('DOMContentLoaded',async () => {
    // 登录了吗？
    try {
        const response = await fetch('/check-login')
        const data = await response.json();
        // console.log(data); 
        if (data.loggedIn) {
            document.getElementById('loginSection').style.display = 'none';
            document.getElementById('welcomeSection').style.display = 'block';
            document.getElementById('userDisplay').textContent = data.username;
        } else {
            document.getElementById('loginSection').style.display = 'block';
            document.getElementById('welcomeSection').style.display = 'none';
          }
    } catch (err) {
        console.error('登录失败');
    }
})
