const express = require("express");
const app = express();
const https = require("https");
const port = 3000;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.listen(process.env.PORT || 3000, () =>
  console.log(`Example app listening on port ${port}!`)
);

app.get("/", (req, res) => res.sendFile(__dirname + "/index.html"));

app.post("/", (req, res) => {
  var data = req.body;
  var email_data = {
    members: [
      {
        email_address: data.email,
        status: "subscribed",
        merge_fields: {
          FNAME: data.fname,
          LNAME: data.lname,
        },
      },
    ],
  };

  var json_data = JSON.stringify(email_data);

  Options = {
    method: "POST",
    auth: "Ankush:44f0dd7895a80810aaf28636559f566a-us21",
  };

  const url = "https://us21.api.mailchimp.com/3.0/lists/ecdc0857aa";

  const request_on_server = https.request(url, Options, function (response) {
    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/sucess.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    });
  });
  request_on_server.write(json_data);
  request_on_server.end();
});

app.post("/failure", (req, res) => {
  res.redirect("/");
});
// 44f0dd7895a80810aaf28636559f566a-us21 -->API KEY
// ecdc0857aa  --> list id
//  ecdc0857aa
