const app = require("./src/app");
require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>
  console.log(
    "\x1b[33m%s\x1b[0m",
    `Server is running at ---> http://localhost:${PORT}`
  )
);
