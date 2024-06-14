const securePath = ["/dashboard"];

export const redirectMiddleware = (req, res, next) => {
  if (
    securePath.includes(req.path) &&
    (!req.session.user || !req.session.user._id)
  ) {
    res.redirect("/");
    return;
  }
  next();
};

export const loggerMiddleware = (req, res, next) => {
  const counter = req.counter || 0;
  const method = req.method.toUpperCase();
  const path = req.path;
  const query = isEmpty(req.query) ? "" : JSON.stringify(req.query);
  const body = isEmpty(req.body) ? "" : JSON.stringify(req.body);

  console.log(`${counter}) ${method} ${path} ${query} ${body}`);

  next();
};

const isEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};
