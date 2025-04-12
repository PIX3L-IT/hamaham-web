const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
      name: { type: String },
      email: { type: String, required: true },
      firebaseUID: { type: String },
      permissions: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Permission"
        }
      ]
    },
    {
      collection: "user",
    }
  );  

const User = mongoose.model("user", userSchema);

module.exports = User;