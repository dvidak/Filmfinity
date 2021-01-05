export function getUser() {
    const headers = new Headers();
  
    headers.append('Accept', 'application/json');
    headers.append('Content-Type', 'application/json');
  
    const id = localStorage.getItem('facebookId');
  
    return fetch(`http://localhost:4000/api/users/${id}`, {
      method: 'GET',
      headers: headers,
    }).then((response: any) => response.json());
  }
  