require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");

const app = express();
const PORT = process.env.PORT || 5000;
//mongodb connection
connectDB();
//middlewares
app.use(cookieParser());
app.use(express.json());
  app.use(
    cors({
      origin: ["https://test-telephone-client.onrender.com"],
      allowedHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    })
  );

  app.use(
    cookieSession({
      name: "token",
      keys: ["key1", "key2"],
      secure: true,
      sameSite: "None",
    })
  );
//main routes
app.post("/root", require("./controllers/Admin/admin_register"));
app.post("/login", require("./controllers/Admin/admin_login"));
app.use("/telephone", require("./Routes/telephone"));
app.use("/admin", require("./cookie_authoriser"), require("./Routes/admin"));

//starting server
app.listen(PORT, () => {
  console.log(`Server Started at ${PORT}`);
});
