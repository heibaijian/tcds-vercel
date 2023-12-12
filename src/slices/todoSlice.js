import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const initialValue = {
  filterStatus: 'all',
  todoList: [],
};

const apiUrl =
  'https://us-east-1.data.tidbcloud.com/api/v1beta/app/dataapp-JrRoFmvr/endpoint/todos';
const publicKey = 'C0S3RM70';
const privateKey = 'e9dc2187-c344-4a9e-afb2-78d1318d4900';

export const fetchTodoList = createAsyncThunk('getTodoList', async () => {
  const response = await fetch(apiUrl, {
    method: 'GET',
    headers: new Headers({
      Authorization: `Basic ${btoa(`${publicKey}:${privateKey}`)}`,
    }),
  });
  const list = await response.json();
  return list;
});

export const addTodoItem = createAsyncThunk('addTodoItem', async (data) => {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Basic ${btoa(`${publicKey}:${privateKey}`)}`,
    }),
    body: JSON.stringify({
      description: data.description,
      status: data.status,
      task: data.title,
    }),
  });

  const res = await response.json();
  if (res?.data?.result?.code === 200) {
    toast.success('Task added successfully');
  }
});

export const updateTodoItem = createAsyncThunk(
  'updateTodoItem',
  async (data) => {
    await fetch(apiUrl, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Basic ${btoa(`${publicKey}:${privateKey}`)}`,
      }),
      body: JSON.stringify({
        id: data.id,
        status: data.status,
        task: data.task,
        description: data.description,
      }),
    });
  }
);

export const deleteTodoItem = createAsyncThunk('deleteTodoItem', async (id) => {
  await fetch(`${apiUrl}?id=${id}`, {
    method: 'DELETE',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Basic ${btoa(`${publicKey}:${privateKey}`)}`,
    }),
  });
});

export const todoSlice = createSlice({
  name: 'todo',
  initialState: initialValue,
  reducers: {
    updateFilterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodoList.fulfilled, (state, action) => {
      if (action.payload.data?.result?.code === 200) {
        state.todoList = action.payload.data.rows;
      }
    });
    builder.addCase(addTodoItem.fulfilled, () => {});
    builder.addCase(updateTodoItem.fulfilled, () => {});
    builder.addCase(deleteTodoItem.fulfilled, () => {});
  },
});

export const { updateFilterStatus } = todoSlice.actions;
export default todoSlice.reducer;