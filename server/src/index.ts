import https from "https";
import { app, options, PORT, connection } from "./configure";
import { isOperationalError } from "./utils/error/errorHandler";

const httpsServer = https.createServer(options, app);

connection.connect();
httpsServer.listen(PORT, (): void => {
  console.log(`Server Running here 👉 https://localhost:${PORT}`);
});

process.on("unhandledRejection", (error) => {
  throw error;
});

process.on("uncaughtException", (error) => {
  if (!isOperationalError(error)) {
    process.exit(1);
  }
});
