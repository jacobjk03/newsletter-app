const express = require("express");
const bodyparser = require("body-parser");
const request = require("request");

const app = express();

// Bodyparser Middleware
app.use(bodyparser.urlencoded({
  extended: true
}))

app.use(express.static("public"));

app.listen(process.env.PORT || 4000, function() {
  console.log("Server is running on port 4000");
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  var firstname = req.body.firstname;
  var secondname = req.body.secondname;
  var email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstname,
          LNAME: secondname
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us10.api.mailchimp.com/3.0/lists/cc82a8ee73",
    method: "POST",
    headers: {
      Authorization: "jacob 8f334ffc8dacfd7251454646ccd90c46-us10"
    },
    body: jsonData
  };

  request(options, function(error, response) {
    if (error || response.statusCode != 200) {
      res.sendFile(__dirname + "/failure.html");
    }
    else {
      res.sendFile(__dirname + "/success.html");
    }
  });

});

app.post("/failure", function(req,res){
  res.redirect("/");
});
