let navigateFn = null;

export const setNavigate = (fn) => {
  navigateFn = fn;
};

export const navigate = (to, options) => {
  if (navigateFn) {
    navigateFn(to, options);
  } else {
    console.warn("Navigate function is not set yet.");
  }
};