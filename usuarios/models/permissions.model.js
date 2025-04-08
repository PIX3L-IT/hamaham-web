const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema(
    {
      permissionName: { type: String },
    },
    {
      collection: "permission",
    }
  );  

const Permission = mongoose.model("permission", permissionSchema);

module.exports = Permission;