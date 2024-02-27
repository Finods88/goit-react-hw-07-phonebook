import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { fetchContacts, deleteContact } from '../../../redux/contacts/contacts-operations';

import { selectFilteredContacts, selectContacts } from '../../../redux/contacts/contact-selectors';

import styles from './contactsList.module.css';


const ContactsList = () => {
  const items = useSelector(selectFilteredContacts);
  const { isLoading, error } = useSelector(selectContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts())
  },[dispatch])

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const elements = items.map(({ id, name, phone }) => (
    <li key={id} className={styles.listItem}>
      {name}: {phone}{' '}
      <button
        type="button"
        className={styles.deleteContactBtn}
        onClick={() => handleDeleteContact(id)}
      >
        Delete
      </button>
    </li>
  ));
  return (
    <ul className={styles.contactsList}>
      {isLoading && <p>...Loading</p>}
      {error && <p>{error}</p>}
      {elements}
    </ul>
  );
};

export default ContactsList;
