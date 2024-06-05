const mongoose = require("mongoose");
const bcrypt=require("bcrypt");
const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["recruiter", "applicant"],
      required: true,
    },
  },
  { collation: { locale: "en" } }
);
schema.pre("save",async function(next){
    if(!this.isModified("password")){
       return next();
    }
    try{
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});
schema.methods.comparePassword=async function(password){
    return bcrypt.compare(password,this.password);
}
const User = mongoose.model("User", schema);
module.exports = User;