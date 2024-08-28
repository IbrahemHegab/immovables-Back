const Task = require('../models/Task');
const User = require('../models/User');

const createTask = async (req, res) => {
  const { taskName, taskDuration, taskType, taskNotes, taskImage, assignedTo } = req.body;
  const assignedBy = req.user._id;  // الشخص الذي ينشئ المهمة (المدير، المشرف، إلخ.)

  try {
    const task = new Task({ taskName, taskDuration, taskType, taskNotes, taskImage, assignedTo, assignedBy });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'خطأ في إنشاء المهمة.' });
  }
};

const completeTask = async (req, res) => {
    const { taskId } = req.params;
    const user = req.user;
  
    try {
      const task = await Task.findById(taskId);
      if (!task) {
        return res.status(404).json({ message: 'المهمة غير موجودة' });
      }
  
      if (user._id.toString() !== task.assignedTo.toString()) {
        return res.status(403).json({ message: 'فقط الشخص المكلف بالمهمة يمكنه إكمالها.' });
      }
  
      task.status = 'review';
      task.completionDate = new Date();
      task.reviewBy = task.assignedBy;  // تعيين الشخص الذي سيراجع المهمة
  
      await task.save();
      res.status(200).json({ message: 'تم إرسال المهمة للمراجعة.' });
    } catch (error) {
      res.status(500).json({ message: 'خطأ في إكمال المهمة.' });
    }
  };
  