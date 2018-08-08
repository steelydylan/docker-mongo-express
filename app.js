const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
mongoose.connect('mongodb://mongo/myapp');

const Test = mongoose.model('test', mongoose.Schema({
  name: String
}));

Test.find({name: "test"}, (err, result) => {
  console.log(result);
});

app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.get('/', (request, response) => {
  const car = new Test({name:"test"});
  car.save();
  response.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(app.get('port'), () => {
  console.log("Node app is running at localhost:" + app.get('port'))
});
