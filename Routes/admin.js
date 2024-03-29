const routes = require("express").Router();

routes.post("/add_user", require("../controllers/Admin/add_user"));
routes.get("/get_users", require("../controllers/Admin/get_users"));
routes.post(
  "/forgot_password",
  require("../controllers/Admin/forgot_password")
);
routes.post("/validate_otp", require("../controllers/Admin/otp_validater"));
routes.post(
  "/set_password",
  require("../controllers/Admin/admin_password_reset")
);
routes.post("/delete_user", require("../controllers/Admin/delete_user"));
routes.put("/edit_user/:id", require("../controllers/Admin/edit_user"));
routes.get(
  "/recharge_history",
  require("../controllers/Admin/get_recharge_history")
);
routes.get(
  "/expense_history",
  require("../controllers/Admin/get_expense_history")
);
routes.get("/search_user", require("../controllers/Admin/search_user"));
routes.get(
  "/download_recharge_history",
  require("../controllers/Admin/download_recharge_history")
);
routes.post("/create_hostel", require("../controllers/Admin/create_hostel"));
routes.get("/hostels", require("../controllers/Admin/get_hostels"));

module.exports = routes;
