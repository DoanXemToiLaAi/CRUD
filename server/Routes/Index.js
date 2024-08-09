const userRouter = require("./User");
const postRouter = require("./Post");
const { notFound, errHandler } = require("../Middleware/ErrHandler");

const initRoutes = (app) => {
  app.use("/api/user", userRouter);
  app.use("/api/post", postRouter);

  app.use(notFound);
  app.use(errHandler);
};

module.exports = initRoutes;
