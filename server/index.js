const express = require("express");
const app = express();
const cors = require("cors");
require("./DB/config");
const dotenv = require("dotenv");
dotenv.config();

const DoubtModel = require("./DB/doubtandsolution.js");

app.use(express.json());
app.use(cors());

app.get("/viewdoubts", async (req, resp) => {
  let data = await DoubtModel.find();
  if (data) {
    resp.send(data);
  } else {
    console.log("data not found");
  }
});

app.get("/answerthequestion/:id", async (req, resp) => {
  const my_doubt = await DoubtModel.findOne(req.params._id);
  if (my_doubt) {
    resp.send([my_doubt]);
  } else {
    resp.send("Doubt not found...");
  }
});

// RaiseHand API
app.put("/handraise/:id", async (req, resp) => {
  let hand_raised_doubt = await DoubtModel.findOne(req.params._id);
  console.log(req.params._id);
  let count = hand_raised_doubt.handRaise;
  let result = await DoubtModel.updateOne(
    { _id: req.params.id },
    { $set: { handRaise: count + 1 } }
  );
  count = 0;
  console.log(result);
});

app.post("/postquestion", async (req, resp) => {
  let newDoubtModel = new DoubtModel(req.body);
  let result = await newDoubtModel.save();
  resp.send(result);
});

app.put("/postanswer/:id", async (req, resp) => {
  let result = await DoubtModel.updateOne(
    { _id: req.params.id },
    { solution: req.body }
  );
  if (result) {
    resp.send(result);
  }
});

// app.put("/product/:id", verifyToken, async (req, resp) => {
//   // resp.send("Put is working")
// l
//   let result = await ProductModel.updateOne(
//     { _id: req.params.id },
//     { handRaise:}
//   );
//   resp.send(result);
// });

app.listen(process.env.PORT);
