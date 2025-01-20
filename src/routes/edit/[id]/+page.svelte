<script>
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { currencies } from "../../stores/currencies"; // Importando a store de currencies

  let id = $page.params.id;
  let name = "";
  let value = "";

  function goToHome() {
    goto("/");
  }

  // Carregar o token do store local usando o ID
  onMount(() => {
    const token = $currencies.find((c) => c.id === Number(id)); // Encontrar o token pelo id
    if (token) {
      name = token.name;
      value = token.value;
    }
  });

  // Validação do f
  function validateForm() {
    if (name.length < 3 || name.length > 8) {
      alert("O nome deve ter entre 3 e 8 caracteres.");
      return false;
    }
    if (isNaN(value) || value <= 0) {
      alert("O valor precisa ser um número maior que zero.");
      return false;
    }
    return true;
  }

  // Atualiza o token na store
  function updateCurrency(event) {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Atualiza
    currencies.update((current) => {
      const updatedCurrencies = current.map((token) =>
        token.id === Number(id)
          ? { ...token, name, value: Number(value) }
          : token
      );
      return updatedCurrencies;
    });
    goToHome();
  }

  // Deleta o token da store
  function deleteCurrency() {
    currencies.update((current) => {
      return current.filter((token) => token.id !== Number(id));
    });
    goToHome();
  }
</script>

<main
  class="m-0 bg-[#13152a] text-white flex justify-center items-center h-screen"
>
  <div class="text-center w-[550px] p-5 rounded-[10px]">
    <!-- Logo -->
    <div class="flex justify-center items-center">
      <img src="/logo.svg" alt="Klever Logo" class="w-[200px] mb-10" />
    </div>

    <!-- Wish Wallet -->
    <div class="flex justify-start items-center my-5">
      <img
        class="w-12 mr-2 mt-1"
        src="/shooting-star.svg"
        alt="Wish Wallet Icon"
      />
      <h1 class="text-4xl font-bold m-0">Wish Wallet</h1>
    </div>

    <!-- Add Token e Voltar -->
    <div class="flex justify-between items-center my-5 ml-10">
      <h2 class="text-2xl font-bold">Edit Token</h2>
      <button
        on:click={goToHome}
        class="bg-[#646464] text-white border-none px-5 py-2.5 rounded-md cursor-pointer text-sm hover:bg-gray-700 font-bold"
        >Voltar</button
      >
    </div>

    <!-- Formulário -->
    <form
      class="flex flex-col gap-1 ml-10"
      on:submit|preventDefault={updateCurrency}
    >
      <label class="text-left text-base font-bold text-white" for="token"
        >Token</label
      >
      <input
        bind:value={name}
        class="p-2.5 text-base border border-gray-700 rounded-md bg-white text-black placeholder-gray-400 mb-10"
        type="text"
        id="token"
        placeholder=""
        required
      />

      <label class="text-left text-base font-bold text-white" for="balance"
        >Balance</label
      >
      <input
        bind:value
        class="p-2.5 text-base border border-gray-700 rounded-md bg-white text-black placeholder-gray-400 mb-10"
        type="number"
        id="balance"
        placeholder=""
        required
      />

      <!-- Botões Save e Remove Token -->
      <div class="flex justify-between items-center">
        <button
          on:click={deleteCurrency}
          class="bg-[#920000] text-white border-none p-1.5 w-32 rounded-md cursor-pointer text-base font-bold hover:bg-red-600"
          >Remove</button
        >
        <button
          type="submit"
          class="bg-[#aa33b5] text-white border-none p-1.5 w-32 rounded-md cursor-pointer text-base font-bold hover:bg-purple-500"
          >Save</button
        >
      </div>
    </form>
  </div>
</main>

<style>
</style>
