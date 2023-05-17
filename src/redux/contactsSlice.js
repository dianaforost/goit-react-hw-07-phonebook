import { createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./operations";
const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};
// const contactsInitialState = [
//     {id: 'id-1', userName: 'Rosie Simpson', number: '459-12-56'},
//     {id: 'id-2', userName: 'Hermione Kline', number: '443-89-12'},
//     {id: 'id-3', userName: 'Eden Clements', number: '645-17-79'},
//     {id: 'id-4', userName: 'Annie Copeland', number: '227-91-26'}];
    const contactsSlice = createSlice({
        name: "contacts",
        initialState: {
          items : [],
          isLoading: false,
          error: null,
        },
        extraReducers: {
          [fetchContacts.pending]: handlePending,
          [fetchContacts.fulfilled](state, action) {
            state.isLoading = false;
            state.error = null;
            state.items = action.payload;
          },
          [fetchContacts.rejected]:handleRejected,
          [addContact.pending]:handlePending,
          [addContact.fulfilled](state, action) {
            state.isLoading = false;
            state.error = null;
            state.items.push(action.payload);
          },
          [addContact.rejected]:handleRejected,
          [deleteContact.pending]: handlePending,
          [deleteContact.fulfilled]: (store, { payload }) => {
            store.isLoading = false;
            store.items = store.items.filter(item => item.id !== payload);
          },
          [deleteContact.rejected]:handleRejected,
        },
        // reducers : {
        //     addContact: {
        //         reducer(state, action) {
        //           console.log(state, action.payload);
        //           state.items.push(action.payload)
        //         },
        //         prepare(number, userName) {
        //           return {
        //             payload: {
        //               id: nanoid(),
        //               userName: userName,
        //               number: number,
        //             }
        //           }
        //         },
        //       },
            // deleteContact(state, action) {
            //     const index = state.findIndex(contact => contact.id === action.payload)
            //     state.splice(index, 1);
            //     console.log(action.payload);
            // }
        // }
        
    })

      
    // export const {  deleteContact } = contactsSlice.actions;
    export const contactsReducer =  contactsSlice.reducer;