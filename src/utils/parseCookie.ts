export const parseCookies = (cookie = '') => {
  return cookie
    .split('; ')
    .reduce((acc, v) => {
      const [key, value] = v.split('=');
      return {...acc, [key]: value};
    }, {});
}
