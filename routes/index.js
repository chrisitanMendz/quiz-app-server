const authRoutes = require("./auth.routes");
const testRoutes = require("./test.routes");

class Routes {
  static initRoutes(app) {
    app.use("/auth", authRoutes);
    app.use("/test", testRoutes);
  }
}

module.exports = Routes;
