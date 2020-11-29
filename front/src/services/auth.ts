export function loginUser(token: string) {
    const headers = new Headers();
  
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${token}`);
  
    return fetch('http://localhost:4000/api/login', {
      method: 'GET',
      headers: headers,
    })
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('userId', res.id);
        localStorage.setItem('username', res.name);
      })
      .catch((error) => {
        console.log('login error');
      });
  }

  export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
  }
  
  