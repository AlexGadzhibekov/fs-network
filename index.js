import express from "express";
import path from "path";
import mongoose from "mongoose";

const PORT = 8080;

const mongoUri =
  "mongodb+srv://SevenNights:16081974Cfif@sevennights.ffufgve.mongodb.net/NewsApp?retryWrites=true&w=majority";

const app = express();

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log("DB has benn connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("views", path.resolve("views"));
app.set("view engine", "ejs");

app.use(express.static(path.resolve("public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}...`);
});
