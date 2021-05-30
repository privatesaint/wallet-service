import app from "./app";
import connection from "./config/database";

// app port
const PORT = process.env.PORT || 4500;

// connect to db
connection();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  process.exit(1);
});
