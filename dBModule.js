const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/slutprojekt', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("Its working!");
});

exports.storeElement = (element) => {
  element.save(()=>{
       console.log("Successfully saved element in database!")
  })
}