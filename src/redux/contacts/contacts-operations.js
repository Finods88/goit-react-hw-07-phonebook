import { createAsyncThunk } from '@reduxjs/toolkit';

import * as contactsApi from '../../api/contacts-api';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const data = await contactsApi.requestContacts();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (body, { rejectWithValue }) => {
    try {
      const data = await contactsApi.requestAddContact(body);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
  {
    condition: ({ name, phone }, { getState }) => {
      const { contacts } = getState();
      const normalizedName = name.toLowerCase();
      const normalizedNumber = phone.trim();

      const dublicate = contacts.items.find(item => {
        const normalizeCurrentName = item.name.toLowerCase();
        const normalizeCurrentNumber = item.phone.trim();
        return (
          normalizeCurrentName === normalizedName ||
          normalizeCurrentNumber === normalizedNumber
        );
      });

      if (dublicate) {
        alert(`${name} with number ${phone} is already on phonebook! `);
        return false;
      }
    },
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, { rejectWithValue }) => {
    try {
      await contactsApi.requestDeleteContact(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
