const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true, //<forma tradicional
      required: [true,"Debes colocar tu nombre de usuario"], //<= forma con mensaje para el usuario.
    },
    password: {
      type: String,
      required: true,

    },
    email:{
      type: String,
      required: true,
    },
    profile_pic:{
      type: String,
      default: "https://avatars.githubusercontent.com/u/29002976?v=4"
    }
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
