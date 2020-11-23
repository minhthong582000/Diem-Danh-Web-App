import cookie from 'js-cookie';
import nextCookie from 'next-cookies';
import redirect from './redirect';
export const TOKEN_COOKIE = 'token';
export const USER_COOKIE = 'user';

export const getCookieFromBrowser = (key) => cookie.get(key);

const getCookieFromServer = (ctx, key) => {
  const specifiKey = key === 'token' ? 'token' : 'user';
  const cookieServer = nextCookie(ctx);
  const token = cookieServer && cookieServer[specifiKey] ? cookieServer[specifiKey] : false;
  if (!token) return null;
  return JSON.stringify(token);
};

export const getCookie = (key, context = {}) => (process.browser ? getCookieFromBrowser(key)
  : getCookieFromServer(context, key));

export const secretPage = (ctx) => {
    const token = getCookie(TOKEN_COOKIE, ctx);
    const isLoggedIn = !!token;
    if (!isLoggedIn) {
      redirect(ctx, '/secret-login');
    }
    return { isLoggedIn };
  };
export const seatPage = (ctx) => {
    const token = getCookie(TOKEN_COOKIE, ctx);
    const isLoggedIn = !!token;
    if (!isLoggedIn) {
      redirect(ctx, '/');
    }
    return { isLoggedIn };
  };
export const getIsLoggedIn = (ctx) =>{
  const token = getCookie(TOKEN_COOKIE, ctx);
  const isLoggedIn = !!token;
  return isLoggedIn ;
}

export const getToken = (ctx) => {
  const token = getCookie(TOKEN_COOKIE, ctx);
  return token;
}