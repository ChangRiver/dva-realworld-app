const jwtDecode = require('jwt-decode');

const isAuthenticated = () => {
  const token = localStorage.getItem('jwt');
  if(token) {
    const jwtObj = jwtDecode(token);
    const timeNow = new Date().getTime();

    if(jwtObj.exp * 1000 <= timeNow) {
      return false;
    }
    return true;
  }

  return false;
}

export default isAuthenticated;