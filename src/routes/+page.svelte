<script>

  import { onMount } from "svelte";
  import { goto } from '$app/navigation';

  
	function goToAddToken() {
	  goto('/AddToken');
	}
  
	function goToEditToken(id) {
	  goto(`/EditToken?id=${id}`);
	}

  const url = "https://67805ddd85151f714b06955d.mockapi.io/currencies";
  let currenciesList = [];

  // buscar dados API
  async function fetchData() {
    try {
      const response = await fetch(url);
      const data = await response.json();
      currenciesList = data;
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  }

  onMount(() => {
    fetchData();
  });

</script>

<main
  class="m-0 bg-[#13152a] text-white flex justify-center items-center h-screen"
>
<div class="text-center w-[550px] p-5 rounded-[10px]">
    <!-- Logo -->
    <div class="flex justify-center items-center">
      <img src="logo.svg" alt="Klever Logo" class="w-[200px] mb-16" />
    </div>

    <!-- Wish Wallet -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center">
        <img class="w-12 mr-2 mt-1" src="shooting-star.svg" alt="Wish Wallet Icon" />
        <h1 class="text-4xl font-bold m-0">Wish Wallet</h1>
      </div>
      <button on:click={goToAddToken} class="bg-[#aa33b5] text-white px-6 py-2 font-bold text-base rounded-lg">Add Token</button>
    </div>

    <!-- Table Header -->
    <div class="flex justify-between mb-3 font-bold text-lg mt-20">
      <span class="ml-10">Tokens</span>
      <span>Balance</span>
    </div>

<!-- List of Currencies -->
{#each currenciesList as currency (currency.id)}
  <div class="flex justify-between text-4xl font-bold py-2">
    <span class="flex items-center">
      <button 
        class="bg-transparent border-none cursor-pointer mr-1"
        on:click={()=>goToEditToken(currency.id)}>
        <img src="edit-icon.svg" alt="Edit Icon" class="w-5 h-5 mr-4 mt-1" />
      </button>
      {currency.name}
    </span>
    <span class="">{currency.value.toLocaleString()}</span>
  </div>
{/each}

</main>

<style>
</style>
