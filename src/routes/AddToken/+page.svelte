<script>
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";

  function goToHome() {
    goto("/");
  }

  const url = "https://67805ddd85151f714b06955d.mockapi.io/currencies";
  let currenciesList = [];

  //Form
  let name = "";
  let value = "";

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


  

  // Validação do formulário
  function validateForm() {
    if(currenciesList.some((currency) => currency.name === name)){
      alert("O nome já existe.");
      return false;
    }
    if (name.length < 3 || name.length > 8) {
      alert("O nome deve ter entre 3 e 8 caracteres.");
      return false; //impede
    }
    if (isNaN(Number(value)) || Number(value) <= 0) {
      alert("O valor precisa ser um número maior que zero.");
      return false; 
    }
    return true; //envia
  }

  function postCurrency(event) {
  event.preventDefault(); 

  if (!validateForm()) {
    return; // falhar validate encerra
  }

  const newCurrency = {
    name: name,
    value: Number(value),
  };

  fetch(url, {
    method: "POST",
    body: JSON.stringify(newCurrency),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      // handle error
    })
    .then((currency) => {
      console.log("deu bom");
      goToHome();
    })
    .catch((error) => {
      console.log("deu ruim");
    });
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
    <form class="flex flex-col gap-1 ml-10">
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
        type="text"
        id="balance"
        placeholder=""
        required
      />

      <div class="flex justify-between items-center">
        <button
          on:click={postCurrency}
          class="bg-[#aa33b5] text-white border-none p-1.5 w-32 rounded-md cursor-pointer text-base font-bold hover:bg-purple-500 ml-auto"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</main>
