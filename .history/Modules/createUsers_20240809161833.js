const mongoose = require("mongoose");

const createUsers = new mongoose.Schema(
  {
    ID: {
      type: Number,
      
    },
   
    Identity: {
      type: آعةلاثق,
    },
    name: {
      type: String,
      required: [true, "Required E-mail User"],
      trim: true,
      unique: [true, "E-mail Must Be Unique"],
    },

    phone: {
      type: Number,
      required: [true, "Required Phone User"],
      unique: [true, "Phone Must Be Unique"],
 
    },

    role: {
      type: String,
      enum: ["user", "admin", "manager" ,"bookkeeper" ,"supervisor" و"],
      default: "user",
    },

    grade: {
      type: String,
      enum: ["first", "second", "third"],
      default: "first",
    },
    code: {
      type: String,
    },

    userVerify: {
      type: Boolean,
      default: false,
    },
    codeExpires: {
      type: String,
    },
    ip:String,
    operatingSystem: [],
  },
  { timestamps: true }
);
const ImageURL = (doc) => {
  if (doc.image && !doc.image.includes(`${process.env.BASE_URL}/admin`)) {
    const image = `${process.env.BASE_URL}/admin/${doc.image}`;
    doc.image = image;
  }
};
createUsers.post("init", (doc) => {
  ImageURL(doc);
});
createUsers.post("save", (doc) => {
  ImageURL(doc);
});
const createUsersModel = mongoose.model("Users", createUsers);
module.exports = createUsersModel;
