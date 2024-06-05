const mongoose=require('mongoose');
mongoose
  .connect(
      process.env.MONGO_URI,
    {useNewUrlParser: true, useUnifiedTopology: true}
  )
  .then((data) => {
    console.log(`Database connected with server:${data.connection.host}`);
  })
  .catch((err) => {
    console.log(err);
  });