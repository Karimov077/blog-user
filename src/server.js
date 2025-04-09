import app from "./app.js";
import { PORT } from "./config/app.config.js";
import connectDB from "./config/mongo.config.js";

connectDB();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});