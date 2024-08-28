const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    taskName: { type: String, required: true },
    taskDuration: { type: Number, required: true }, // مدة المهمة (بالساعات أو الأيام)
    taskNotes: { type: String }, // ملحوظات إضافية
    taskImage: { type: String }, // رابط الصورة
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employees",
      required: true,
    }, // الشخص المكلّف
    assignedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employees",
      required: true,
    }, // الشخص الذي وزع المهمة
    status: {
      type: String,
      enum: ["pending", "fulfilled", "rejected"],
      default: "pending",
    }, // حالة المهمة
    reviewBy: { type: mongoose.Schema.Types.ObjectId, ref: "Employees" }, // الشخص الذي سيراجع المهمة
    reassignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "Employees" }, // الشخص الذي أعيدت له المهمة
    completionDate: { type: Date }, // تاريخ إكمال المهمة
  },
  { timestamps: true }
);

taskSchema.pre(/^find/, function (next) {
  this.populate({
    path: "assignedTo",
    select: "name username role",
  }).populate({ path: "assignedBy", select: "name username role" });
  next();
});



const TaskModel = mongoose.model("Task", taskSchema);
module.exports = TaskModel;
