const express = require('express');
const path = require('path');

// port config
const app = express();
const PORT = process.env.PORT || 3000;

// allow data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// server listening on port 3000
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});