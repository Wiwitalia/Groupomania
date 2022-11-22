const mongoose = require("mongoose");

mongoose  // Connexion a MongoDB
  .connect(
    "mongodb+srv://" + process.env.DB_USER_PASS + "@cluster0.xhntdhf.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));

