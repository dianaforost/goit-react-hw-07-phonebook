import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
axios.defaults.baseURL = "https://6464835d127ad0b8f8a07fc3.mockapi.io";
export const fetchContacts = createAsyncThunk("contacts/fetchAll", async () => {
        const response = await axios.get("/contacts");
        return response.data;
  });
  export const addContact = createAsyncThunk(
    "contacts/addContact",
    async (contact, thunkAPI) => {
      try {
        const response = await axios.post("/contacts", contact);
        return response.data;
      } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  );
  export const deleteContact = createAsyncThunk(
    "contacts/deleteContact",
    async (id, thunkAPI) => {
      try {
        const response = await axios.delete(`/contacts/${id}`);
        thunkAPI.dispatch(fetchContacts());
        return response.data;
      } catch (e) {
        return thunkAPI.rejectWithValue(e.message);
      }
    }
  );