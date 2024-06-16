const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

// now implementing methods to watch out for events

app.post("/events", (req, res) => {
  const event = req.body;

  axios.post("http://localhost:4000/events", event); // POST-SERVICE
  axios.post("http://localhost:4001/events", event); // COMMENT-SERVICE
  axios.post("http://localhost:4002/events", event);  // QUERY SERVICE 

  console.log("EVENT INITIATED ");
  res.send({ status: "OK" });
});

const PORT = 4005;
app.listen(PORT, () => {
  console.log(`Event listening on  ${PORT}`);
});
