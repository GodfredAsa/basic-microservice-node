const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

const commentsByPostId = [];

app.get("/posts/:id/comments", (req, res) => {
  return res.status(201).send(commentsByPostId);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  console.log("Comment created: " + commentId);
  // const id = req.params.id
  const { content } = req.body;
  const newComment = { id: commentId, content };
  // if undefined return empty array.
  // const comments = commentsByPostId[id] || []
  // comments.push({id: commentId, content})
  await axios.post("http://localhost:4005/events", {
    type: "COMMENT_CREATED",
    data: {
      id: commentId,
      comment: content,
      postId: req.params.id,
    },
  });
  commentsByPostId.push(newComment);
  return res.status(201).send(newComment);
});

app.post("/events", (req, res) => {
  console.log("RECEIVED EVENTS", req.body.type);
  res.send({});
});

app.listen(4001, () => {
  console.log("Listening on port 4001");
});
