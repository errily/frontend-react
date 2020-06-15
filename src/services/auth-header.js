export default function authHeader() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.accessToken) {
      //  return {Authorization:'Bearer '+ user.accessToken};
        return {'x-access-token' : user.accessToken,"Content-type": "application/json", 'Accept': 'application/json'};

    } else {
        return {};
    }
}