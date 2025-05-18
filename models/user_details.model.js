const mongoose = require("mongoose");

const UserDetailsSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, ref: "User" },
    address: { type: String, required: true },
    bloodGroup: { type: String, default: "" },
    isDeleted: { type: Boolean, default: false },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const UserDetailsModel = new mongoose.model("UserDetails", UserDetailsSchema);

module.exports = UserDetailsModel;
