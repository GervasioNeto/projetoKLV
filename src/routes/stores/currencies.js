// src/stores/currencies.js
import { writable } from 'svelte/store';

// Um store com dados iniciais
export const currencies = writable([
  { id: 1, name: 'Bitcoin', value: 50000 },
  { id: 2, name: 'Ethereum', value: 3500 },
  { id: 3, name: 'Ripple', value: 1.2 }
]);

// Função para adicionar uma nova moeda
export function addCurrency(currency) {
  currencies.update((list) => [...list, currency]);
}

// Função para editar uma moeda existente
export function editCurrency(id, updatedData) {
  currencies.update((list) =>
    list.map((currency) => (currency.id === id ? { ...currency, ...updatedData } : currency))
  );
}