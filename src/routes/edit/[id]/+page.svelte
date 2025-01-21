<script>
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { page } from "$app/stores";

  const url = "https://67805ddd85151f714b06955d.mockapi.io/currencies";

  // let currenciesList = [];

  let id = $page.params.id;
  // let id = $page.url.searchParams.get("id");

  //Form
  let name = "";
  let value = "";

  function goToHome() {
    goto("/");
  }

  // buscar dados API
  async function fetchToken() {
    try {
      const response = await fetch(`${url}/${id}`); // Busca o token pelo ID
      if (!response.ok) throw new Error("Erro ao carregar dados do token.");
      const token = await response.json();
      name = token.name;
      value = token.value;
    } catch (error) {
      console.error("Erro ao carregar dados:", error);
    }
  }

  //montar o componente
  onMount(() => {
    if (id) {
      fetchToken();
    }
  });

  // Validação do form
  function validateForm() {
    
    if (name.length < 3 || name.length > 8) {
      alert("O nome deve ter entre 3 e 8 caracteres.");
      return false;
    }
    if (isNaN(Number(value)) || Number(value) <= 0) {
      alert("O valor precisa ser um número maior que zero.");
      return false;
    }
    return true;
  }

  function deleteCurrency() {
    console.log(id);
    fetch(`${url}/${id}`, {
      method: "DELETE",
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

  function updateCurrency(event) {
    event.preventDefault();

    if (!validateForm()) {
      return; //encerra
    }
    
    // Preparar dados para envio
    const updatedCurrency = {
      name: name,
      value: Number(value),
    };

    fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCurrency),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Erro ao atualizar");
      })
      .then((currency) => {
        console.log("Atualizado com sucesso:", currency);
        goToHome();
      })
      .catch((error) => {
        console.error("Erro ao atualizar:", error);
      });
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
    <form class="flex flex-col gap-1 ml-10">
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
      bind:value={value}
        class="p-2.5 text-base border border-gray-700 rounded-md bg-white text-black placeholder-gray-400 mb-10"
        type="text"
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
          on:click={updateCurrency}
          class="bg-[#aa33b5] text-white border-none p-1.5 w-32 rounded-md cursor-pointer text-base font-bold hover:bg-purple-500"
          >Save</button
        >
      </div>
    </form>
  </div>
</main>

<style>
</style>
