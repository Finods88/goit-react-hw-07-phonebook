import { createSelector } from "@reduxjs/toolkit";
import { selectFilter } from "../filter/filter-selectors";
export const selectAllContacts = store => store.contacts.items

export const selectContacts = store => store.contacts

export const selectFilteredContacts = createSelector(
    [selectAllContacts, selectFilter],
    (items, filter) => {
        if (!filter) {
            return items;
        }
    const normalizedFilter = filter.toLowerCase();
    const filtredContacts = items.filter(({ name, phone }) => {
      const normalizedName = name.toLowerCase();

      return (normalizedName.includes(normalizedFilter) || phone.includes(normalizedFilter))
    });

    return filtredContacts;
    }
)
