import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tasks: [
    {
      id: 'M-1025',
      craneId: 'C-001',
      task: 'Quarterly Hydraulic Inspection',
      description: 'Check hydraulic system for leaks and pressure',
      type: 'Inspection',
      assignedTo: 'John Doe',
      dueDate: '2023-08-25',
      status: 'Scheduled'
    },
    {
      id: 'M-1024',
      craneId: 'C-002',
      task: 'Replace Worn Cables',
      description: 'Replace main hoist cables showing signs of wear',
      type: 'Repair',
      assignedTo: 'Mike Jones',
      dueDate: '2023-08-22',
      status: 'In Progress'
    },
    {
      id: 'M-1023',
      craneId: 'C-003',
      task: 'Motor Bearing Replacement',
      description: 'Replace main motor bearings showing excessive wear',
      type: 'Repair',
      assignedTo: 'Jane Smith',
      dueDate: '2023-08-15',
      status: 'Overdue'
    }
  ],
  stats: {
    completed: 24,
    upcoming: 12,
    overdue: 3,
    complianceRate: '92%'
  },
  loading: false,
  error: null
};

const maintenanceSlice = createSlice({
  name: 'maintenance',
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTaskStatus: (state, action) => {
      const { id, status } = action.payload;
      const task = state.tasks.find(t => t.id === id);
      if (task) {
        task.status = status;
      }
    },
    assignTask: (state, action) => {
      const { id, assignedTo } = action.payload;
      const task = state.tasks.find(t => t.id === id);
      if (task) {
        task.assignedTo = assignedTo;
      }
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
    updateStats: (state, action) => {
      state.stats = { ...state.stats, ...action.payload };
    }
  }
});

export const {
  addTask,
  updateTaskStatus,
  assignTask,
  removeTask,
  updateStats
} = maintenanceSlice.actions;

export default maintenanceSlice.reducer; 