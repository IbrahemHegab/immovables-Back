const mongoose = require("mongoose");
const generateUniqueId = () => {
  let id;
  do {
    id = Math.floor(100000 + Math.random() * 900000); // يولد رقم مكون من 6 أرقام
  } while (isIdTaken(id)); // تحقق من أن الرقم ليس مكرراً
  return id;
};

// دالة للتحقق من أن الرقم غير مكرر (يفترض وجود دالة تحقق أخرى في مكان ما)
const isIdTaken = async (id) => {
  // تحقق من وجود الرقم في قاعدة البيانات (تحتاج إلى تنفيذ دالة تحقق هنا)
  return await YourModel.exists({ id });
};

const createUsers = new mongoose.Schema(
  {
    id: {
      type: Number,
    },

    identity: {
      type: Number,
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
      enum: [
        "user",
        "manager",
        "admin",
        "bookkeeper",
        "supervisor",
        "caulescent",
      ],
      default: "user",
    },
  },
  { timestamps: true }
);

const createUsersModel = mongoose.model("Users", createUsers);
module.exports = createUsersModel;
