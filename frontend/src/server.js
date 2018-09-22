let streamKey = "rmw98nzey9p8";
let streamSecret =
  "jc9wc5gpb642bjmqv6ptbacckhf6nagpptuf3p5peeksa3sqywxy88npz7cxna5u";
let streamAppID = "40881";

const express = require("express");
const stream = require("getstream");
const cors = require("cors");

const streamClient = stream.connect(
  streamKey,
  streamSecret,
  streamAppID
);

let app = express();

app.use(cors());

app.get("/feeds/:feedID/token", (req, res) => {
  // req.params.feedID will usually look something like `profile:1234`
  let [slug, id] = req.params.feedID.split(":"); // this splits the "profile" and "1234" into separate variables, using array destructuring, but is only available in ES6 (node.js 6+)
  let token = streamClient.feed(slug, id).token;
  res.send(token);
});

console.log("Server starting...");
app.listen(9999, () => {
  console.log("Listening on 9999");
});
