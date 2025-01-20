import { writable } from 'svelte/store';


export const currencies = writable([
  { id: 1, name: 'Bitcoin', value: 50000 },
  { id: 2, name: 'Ethereum', value: 3500 },
  { id: 3, name: 'Ripple', value: 1.2 }
]);

// export function addCurrency(currency) {
//   currencies.update((list) => [...list, currency]);
// }

// export function editCurrency(id, updatedData) {
//   currencies.update((list) =>
//     list.map((currency) => (currency.id === id ? { ...currency, ...updatedData } : currency))
//   );
// }