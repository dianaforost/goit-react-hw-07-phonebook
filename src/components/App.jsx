import React from 'react';
import {SectionFirst} from './Section/SectionFirst';
import {SectionSec} from './Section/SectionSec'
import {PhoneBook} from './PhoneBook/PhoneBook';
import {Contacts} from './Contacts/Contacts';
import {Filter} from './Filter/Filter';
import { selectContacts, selectIsLoading, selectError } from 'redux/selectors';
import { useSelector } from "react-redux";
import { fetchContacts } from '../redux/operations'
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export function App(){
  const dispatch = useDispatch();
  const contactsArray = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <SectionFirst title="My Phonebook" >
         <PhoneBook/>
       </SectionFirst>
      <SectionSec title="Contacts">
        {isLoading && !error && <b>Request in progress...</b>}
        {contactsArray.length > 1 && (
           <Filter /> 
            )} 
            {contactsArray.length > 0 ? ( 
             <Contacts /> 
             ) : ( 
              <p>Your phonebook is empty.Please add a new contact.</p>
               )}  
            </SectionSec>
      </div>
      );
    }
    