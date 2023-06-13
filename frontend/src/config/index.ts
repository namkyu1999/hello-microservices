const loc = window.location;
let authURL;
let apiURL;

if (
    process.env.NODE_ENV.trim() === 'development' ||
    process.env.NODE_ENV.trim() === 'test'
) {
    authURL = `${window.location.protocol}//${window.location.hostname}:8080`;
    apiURL = `${window.location.protocol}//${window.location.hostname}:8001`;
} else {
    authURL = `${process.env.PUBLIC_URL}/auth`;
    apiURL = `${process.env.PUBLIC_URL}/api`;
}
export default {
    environment: process.env.NODE_ENV,
    auth: {
        url: process.env.AUTH_API || authURL,
    },
    apiServerEndpoint: process.env.API_SERVER_API || apiURL,
};
