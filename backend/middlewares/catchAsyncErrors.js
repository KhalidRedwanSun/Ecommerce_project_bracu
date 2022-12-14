module.exports = (func) => (req, res, next) => {
  // Promise.resolve() will return a promise object
  Promise.resolve(func(req, res, next)).catch(next);
};
