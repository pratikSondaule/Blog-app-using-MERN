const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 8080

dotenv.config()

const app = express()
app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/userRoute");
const blogRoutes = require("./routes/blogRoute");


app.use("/api/v1/user",userRoutes);
app.use("/api/v1/blog",blogRoutes);


mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error(err);
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})