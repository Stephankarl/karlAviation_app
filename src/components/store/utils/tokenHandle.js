module.exports = {
    storeToken: (token) => {
        localStorage.setItem('token', token);
    },
    removeToken: () => {
        localStorage.removeItem('token');
    },
};
