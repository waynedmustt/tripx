export const coreService = {
    setItem: (key, value) => {
        localStorage.setItem(key, value);
    },
    getItem: (key) => {
        return localStorage.getItem(key);
    },
    removeItem: (key) => {
        localStorage.removeItem(key);
    },
    setObjectItem: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    },
    getObjectItem: (key) => {
        return JSON.parse(localStorage.getItem(key));
    },
    isEmptyObject: (value) => {
        if (typeof value !== 'object') {
            return false;
        }
        const param = value || {};
        return Object.keys(param).length === 0;
    },
    scrollUp: () => {
        window.scrollTo(0, 0);
    },
    checkAuthorization: (err) => {
        if (err?.response?.status === 401) {
            coreService.removeItem('isLoggedIn');
            coreService.removeItem('accessToken');
            window.location.replace('/auth/login');
            return;
        }
        return err
    }
}