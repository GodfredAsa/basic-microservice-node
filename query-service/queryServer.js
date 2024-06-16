const express = require('express')
const axios = require('axios')
const bodyParser = require("body-parser");
const cors = require('cors')

const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {}
app.get('/posts', (req, res) => {
    return res.send(posts)
})

app.post('/events', (req, res) => {
    const {type, data } = req.body;
    if(type === 'POST_CREATED'){
        const {id, title} = data;
        posts[id] = {id, title, comments: []}
    }
    if(type === 'COMMENT_CREATED'){
        const {id, content, postId} = data;
        const post = posts[postId]
        post.comments.push({id, content})
    }

    res.send({})
    
})

const PORT = 4002;

app.listen(PORT, () => {
    console.log(`Listening on PORT: ${PORT}`);
})