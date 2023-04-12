import app from "./app.js";
import connectionState  from "./infrastructure/database/connection.js";

const main = async () => {
  try {
    await connectionState.connectionState()
    // if (!(await connectionState)) {
    //   throw error;
    // }
    const port = app.get("port");
    app.listen(port);
    console.log(`ICD-10 API rocks 🚀, "http://localhost:${port}"`);
  } catch (error) {
    console.log("ICD-10 API start failed", error);
  }
};

main();
