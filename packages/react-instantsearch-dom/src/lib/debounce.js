// Debounce the function call to the trailing edge.
export function debounce(func, wait) {
  let timeout;
  return function(...args) {
    const that = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      func.apply(that, args);
    }, wait);
  };
}
