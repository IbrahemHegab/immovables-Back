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

