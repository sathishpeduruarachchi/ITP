const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const port = 8070;

// const express = require("express");
// const nodemailer = require("nodemailer");
// const bodyParser = require("body-parser");

// const app = express();
// app.use(bodyParser.json());


dotenv.config();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

const patientRouter = require("./routes/patients");
app.use("/patient", patientRouter);

const admintRouter = require("./routes/admins");
app.use("/admin", admintRouter);

const doctorRouter = require("./routes/doctors");
app.use("/doctor", doctorRouter);

const channelRouter = require("./routes/channels");
app.use("/channel", channelRouter);

const appointmentRouter = require("./routes/appointments");
app.use("/appointment", appointmentRouter);


const prescriptionRouter = require("./routes/prescriptions");
app.use("/prescription", prescriptionRouter);

const reportRouter = require("./routes/reports");
app.use("/report", reportRouter);


const testRouter = require("./routes/tests");
app.use("/test", testRouter);


// const recordtRouter = require("./routes/records");
// app.use("/record", recordtRouter);
const recordtRouter = require("./routes/records");
app.use("/record", recordtRouter);

const recordDetailstRouter = require("./routes/recordDetails");
app.use("/recordDetails", recordDetailstRouter);
//

const inventoryRoutes = require("./routes/inventory.js")
app.use("/Inventory", inventoryRoutes);

const orderRoutes = require("./routes/order.js");
app.use("/Order", orderRoutes);

const stockRouter = require("./routes/stock.js");
app.use("/stock", stockRouter);


app.listen(process.env.PORT || port, () =>
  console.log(`Hospital app listening on port ${process.env.PORT}!`)
);
