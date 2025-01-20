<script>
  import { goto } from "$app/navigation";
  import { currencies } from '../stores/currencies';// Importando o store local

  $: console.log($currencies);

  function goToHome() {
    goto("/");
  }

  // form
  let name = "";
  let value = "";

   // validar form
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

    // Adicionar novo token ao store
    function addToken(event) {
    event.preventDefault();

    if (!validateForm()) {
      return; // Impede o envio
    }

    // Atualiza o store com o novo token
    currencies.update((current) => {
    const newId = current.length ? current[current.length - 1].id + 1 : 1;  // Pegando o último id e somando 1
    return [...current, { id: newId, name, value: Number(value) }];
    });
    goToHome();
  }

</script>

<main class="m-0 bg-[#13152a] text-white flex justify-center items-center h-screen">
  <div class="text-center w-[550px] p-5 rounded-[10px]">
    <!-- Logo -->
    <div class="flex justify-center items-center">
      <img src="logo.svg" alt="Klever Logo" class="w-[200px] mb-10" />
    </div>

    <!-- Wish Wallet -->
    <div class="flex justify-start items-center my-5">
      <img class="w-12 mr-2 mt-1" src="shooting-star.svg" alt="Wish Wallet Icon" />
      <h1 class="text-4xl font-bold m-0">Wish Wallet</h1>
    </div>

    <!-- Add Token e Voltar -->
    <div class="flex justify-between items-center my-5 ml-10 mb-10 mt-10">
      <h2 class="text-2xl font-bold">Add Token</h2>
      <button
        on:click={goToHome}
        class="bg-[#646464] text-white border-none px-5 py-2.5 rounded-md cursor-pointer text-sm hover:bg-gray-700 font-bold"
      >
        Voltar
      </button>
    </div>

    <!-- Formulário -->
    <form class="flex flex-col gap-1 ml-10" on:submit|preventDefault={addToken}>
      <label class="text-left text-base font-bold text-white" for="token">Token</label>
      <input
        bind:value={name}
        class="p-2.5 text-base border border-gray-700 rounded-md bg-white text-black placeholder-gray-400 mb-10"
        type="text"
        id="token"
        placeholder=""
        required
      />

      <label class="text-left text-base font-bold text-white" for="balance">Balance</label>
      <input
        bind:value={value}
        class="p-2.5 text-base border border-gray-700 rounded-md bg-white text-black placeholder-gray-400 mb-10"
        type="number"
        id="balance"
        placeholder=""
        required
      />

      <div class="flex justify-between items-center">
        <button
          type="submit"
          class="bg-[#aa33b5] text-white border-none p-1.5 w-32 rounded-md cursor-pointer text-base font-bold hover:bg-purple-500 ml-auto"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</main>
