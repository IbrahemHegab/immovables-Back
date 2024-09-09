const mongoose = require("mongoose");

const createUsers = new mongoose.Schema(
  {
    identity: String,

    name: String,
    username: String,
    password: String,
    role: {
      type: String,
      default: "user",
    },
    phone: String,

    marketers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Employees",
      },
    ],
  },
  { timestamps: true }
);
createUsers.pre(/^find/, function (next) {
  this.populate({
    path: "marketers",
    select: "name",
  });
  next();
});
userSchema.pre('save', async function (next) {
  // فقط نقوم بتشفير كلمة المرور إذا تم تعديلها
  if (!this.isModified('password')) {
    return next();
  }

  // تشفير كلمة المرور
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const createUsersModel = mongoose.model("Users", createUsers);
module.exports = createUsersModel;
