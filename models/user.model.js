const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  isDeleted: { type: Boolean, default: false }
}, {
  versionKey: false,
  timestamps: true
});

const UserModel = new mongoose.model("User", UserSchema);

module.exports = UserModel;
