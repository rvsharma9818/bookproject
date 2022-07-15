const express = require("express");
const bodyParser = require("body-parser");
const route = require("./src/routes/route");
const mongoose  = require("mongoose");
const {multererror } =require("./src/Helper/multer")
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require("dotenv").config({
  path:'.env'
})


mongoose
  .connect(
    "mongodb+srv://sangamsuman323:XVZrnDNPfS8c21p8@cluster0.bolaw.mongodb.net/project5",
    {
      useNewUrlParser: true,
    }
  )

  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

app.use("/", route);
app.all('/**',route ,(req, res) => {
  res.status(404).send({ status: false, message: "Either Page Not Found Or Missing Some Of The Parameters " })
})
app.use(multererror)
app.listen(process.env.PORT, function () {
  console.log("Express app running on port " + (process.env.PORT || 3000));
});
