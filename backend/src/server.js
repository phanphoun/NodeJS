import dotenv from "dotenv";
import express from "express";
import cors from "cors";
dotenv.config();
const app = express();
const port = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// Import Route
import authRoute from "./routes/auth.route.js";


// Use route
app.use("/api/auth", authRoute);

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});