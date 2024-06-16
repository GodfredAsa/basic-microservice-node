const express = require("express");
const bodyParser = require('body-parser')
const {randomBytes} = require('crypto');
const axios = require('axios');

const app = express();
app.use(bodyParser.json())

const posts = {}

app.get("/posts", (req, res) => {
  return res.send(posts)
});

app.post("/posts", async (req, res) => {
    const id = randomBytes(4).toString('hex');
    console.log("POST CREATED")
    const {title} = req.body
    posts[id] = {id, title}
    await axios.post("http://localhost:4005/events", {
      type: "POST_CREATED", 
      data: {id, title}
     
    })

    console.log(req.body)
    return res.status(201).send(posts[id])
});

app.post('/events', (req, res) => {
  console.log("RECEIVED EVENTS", req.body.type);
  res.send({})
})

app.listen(4000, () => {
  console.log("Listening on port 4000");
});
