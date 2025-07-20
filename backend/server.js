const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const orderRoutes = require("./routes/orderRoutes");
const ticketRoutes = require("./routes/ticketRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", orderRoutes);
app.use("/api", ticketRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => console.error("MongoDB connection error:", err));
