const { default: mongoose } = require("mongoose");

const dbconnect = async () => {
  try {
    const connectdb = await mongoose.connect(process.env.MONGPDB_URI);
    if (connectdb.connection.readyState === 1)
      console.log("okay lah"); // check connectting db
    else console.log("Fall");
  } catch (error) {
    console.log("Fail");
    throw new Error(error);
  }
};

module.exports = dbconnect;
