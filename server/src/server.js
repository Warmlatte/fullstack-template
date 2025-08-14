import app from "./app.js";
import http from "http";
import "dotenv/config";

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, "::", () => {
  console.log(`Server running on port ${port}`);
<<<<<<< HEAD
});
=======
});
>>>>>>> 038d29b7c025044669326c8d9d5b262c9d06317e
