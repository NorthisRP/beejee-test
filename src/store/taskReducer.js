const defaultState = { tasks: [], total_task_count: 0 };

const FILL_TASKS = "fillTasks";
const ADD_TASK = "addTask";
export const FETCH_TASKS = "fetchTasks";
export const ASYNC_ADD_TASK = "asyncAddTask";

export const taskReducer = (state = defaultState, action) => {
  switch (action.type) {
    case FILL_TASKS:
      return { ...state, ...action.payload };
    case ADD_TASK:
      return {
        ...state,
        total_task_count: Number(state.total_task_count) + 1,
      };
    default:
      return state;
  }
};

export const getTasks = (payload) => ({
  type: FILL_TASKS,
  payload,
});
export const addTask = (payload) => ({ type: ADD_TASK, payload });

export const fetchTasks = (payload) => ({ type: FETCH_TASKS, payload });
export const asyncAddTask = (payload) => ({ type: ASYNC_ADD_TASK, payload });
