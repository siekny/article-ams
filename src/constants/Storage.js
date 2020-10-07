export const saveStorage = (loginEmail, loginUserId, loginUserName, loginProfile) => {
    userLogout()
    window.location.reload(true);

    localStorage.setItem("loginEmail", loginEmail);
    localStorage.setItem("loginUserId", loginUserId);
    localStorage.setItem("loginUserName", loginUserName);
    localStorage.setItem("loginProfile", loginProfile);
}

export const userLogout = () => {
    localStorage.removeItem("loginEmail");
    localStorage.removeItem("loginUserId");
    localStorage.removeItem("loginUserName");
    localStorage.removeItem("loginProfile");
}

export const getUserStorage = () => {
    const email = localStorage.getItem("loginEmail");
    const userId = localStorage.getItem("loginUserId");
    const userName = localStorage.getItem("loginUserName");
    const userProfile = localStorage.getItem("loginProfile");
    return ({
        userId,
        userName,
        email,
        userProfile
    })
}
export const isAuth = (userId) => {
    if (localStorage.getItem('loginUserId') == userId) {
        return true;
    }
    return false;
}