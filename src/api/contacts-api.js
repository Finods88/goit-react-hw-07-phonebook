import axios from 'axios';

const contactsInstance = axios.create({
  baseURL: 'https://65ddf8eddccfcd562f55fbda.mockapi.io/api/contacts',
});

export const requestContacts = async () => {
  const { data } = await contactsInstance.get('/');
  return data;
};

export const requestAddContact = async body => {
  const { data } = await contactsInstance.post('/', body);
  return data;
};

export const requestDeleteContact = async id => {
  const { data } = await contactsInstance.delete(`/${id}`);
  return data;
};
