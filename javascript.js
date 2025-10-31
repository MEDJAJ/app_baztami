window.addEventListener("load", loadFromLocalStorage);
const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");
const myModal = document.getElementById("myModal");


let currentId = 1;

let transactions = [];


const body = document.getElementById("body");
const button = document.getElementById("theme-toggle");
const icon = document.getElementById("icon");
const savedTheme = localStorage.getItem("theme") || "bg-white";
body.classList.add(savedTheme);
icon.textContent = savedTheme === "bg-black" ? "☀️" : "🌙";
const button_Theme = localStorage.getItem("colorbutton");
button.classList.add(button_Theme === "bg-black" ? "bg-black" : "bg-white");





button.addEventListener("click", () => {
  body.classList.toggle("bg-black");
  body.classList.toggle("bg-white");
  button.classList.toggle("bg-black");
  button.classList.toggle("bg-white");
  const isDark = body.classList.contains("bg-black");
  icon.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("colorbutton", isDark ? "bg-white" : "bg-black");
  localStorage.setItem("theme", isDark ? "bg-black" : "bg-white");
});




class Transaction {
  constructor(description, montant, operation, date) {
    this.id = currentId++;
    this.description = description;
    this.montant = parseFloat(montant);
    this.operation = operation;
    this.date = date;
  }
}

function saveToLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

function loadFromLocalStorage() {
  const data = localStorage.getItem("transactions");
  if (data) {
    transactions = JSON.parse(data);
    currentId = transactions.length > 0 ? transactions[transactions.length - 1].id + 1 : 1;
    transactions.forEach(t => createCard(t));
    updateTotale();
  }
}



function ajauterTransaction(description, montant, operation, date) {

  const transaction = new Transaction(description, montant, operation, date);

  transactions.push(transaction);

  createCard(transaction);
  document.getElementById("desc").value = "";
  document.getElementById("montant").value = "";
  document.getElementById("date").value = "";
  myModal.classList.add('hidden');
  updateTotale();

}






openModal.addEventListener("click", () => {
  myModal.classList.remove("hidden");

});

closeModal.addEventListener("click", () => {
  myModal.classList.add("hidden");
});

function updateTotale() {
  const revenu = document.getElementById("revenu");
  const depense = document.getElementById("depense");
  const solde = document.getElementById("solde");

  let revenus = 0;
  let depenses = 0;
  let solde_net = 0;

  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].operation == 'Revenu') {
      revenus += transactions[i].montant;
    } else {
      depenses += transactions[i].montant;
    }
  }

  solde_net = revenus - depenses;
  revenu.textContent = `+ ${revenus}$`;
  depense.textContent = `- ${depenses}$`;
  if (solde_net < 0) {
    solde.textContent = ` ${solde_net}$`;
    solde.classList.add('text-red-500');
  } else {
    solde.textContent = `+ ${solde_net}$`;
    solde.classList.add('text-green-500');
  }
}







function enregistrerInformations() {
  const description = document.getElementById("desc").value;
  const montant = document.getElementById("montant").value;
  const operation = document.getElementById("operation").value;
  const date = document.getElementById("date").value;
  let valid = false;

  const regexdescription = /^[A-Za-z\s0-9\.]+$/;
  if ((description !== "" && regexdescription.test(description)) && montant !== "" && date !== "") {
    ajauterTransaction(description, montant, operation, date);
    saveToLocalStorage();
  } else {
    alert("toutes les champs obligatoires et aussi valid");
  }










}



function createCard(transactionn) {
  const transaction = document.getElementById("transaction");

  const card = document.createElement("div");

  card.dataset.id = transactionn.id;

  if (transactionn.operation == "Revenu") {
    card.classList.add('ml-4', 'px-12', 'text-center', 'w-80', 'bg-lime-200', 'rounded-lg');
  } else {
    card.classList.add('ml-4', 'px-12', 'text-center', 'w-80', 'bg-red-200', 'rounded-lg');
  }


  const divEnterCard = document.createElement("div");
  divEnterCard.classList.add('border-b-2', 'border-b-gray-400', 'w-64', 'my-4');

  const h = document.createElement("h3");
  h.classList.add('text-black-500', 'font-bold', 'text-slate-600');
  h.textContent = "description :";
  divEnterCard.appendChild(h);

  const p = document.createElement("p");
  p.classList.add('mb-2', 'pdesc', 'font-semibold', 'text-indigo-400');
  p.textContent = `${transactionn.description}`;
  divEnterCard.appendChild(p);
  card.appendChild(divEnterCard);




  const divEnterCard2 = document.createElement("div");
  divEnterCard2.classList.add('border-b-2', 'border-b-gray-400', 'w-64', 'my-4');

  const h2 = document.createElement("h3");
  h2.classList.add('text-black-500', 'font-bold', 'text-slate-600');
  h2.textContent = "Montant";
  divEnterCard2.appendChild(h2);

  const p2 = document.createElement("p");
  p2.classList.add('mb-2', 'pmontant', 'text-indigo-400', 'font-semibold');
  if (transactionn.operation == "Revenu") {
    p2.textContent = `+${transactionn.montant}`;
  } else {
    p2.textContent = `-${transactionn.montant}`;
  }

  divEnterCard2.appendChild(p2);
  card.appendChild(divEnterCard2);




  const divEnterCard3 = document.createElement("div");
  divEnterCard3.classList.add('border-b-2', 'border-b-gray-400', 'w-64', 'my-4');

  const h3 = document.createElement("h3");
  h3.classList.add('text-black-500', 'font-bold', 'text-slate-600');
  h3.textContent = "Type";
  divEnterCard3.appendChild(h3);

  const p3 = document.createElement("p");
  p3.classList.add('mb-2', 'poperation', 'text-indigo-400', 'font-semibold');
  p3.textContent = `${transactionn.operation}`;
  divEnterCard3.appendChild(p3);
  card.appendChild(divEnterCard3);




  const divEnterCard4 = document.createElement("div");
  divEnterCard4.classList.add('border-b-2', 'border-b-gray-400', 'w-64', 'my-4');

  const h4 = document.createElement("h3");
  h4.classList.add('text-black-500', 'font-bold', 'text-slate-600');
  h4.textContent = "Date";
  divEnterCard4.appendChild(h4);

  const p4 = document.createElement("p");
  p4.classList.add('mb-2', 'pdate', 'text-indigo-400', 'font-semibold');
  p4.textContent = `${transactionn.date}`;
  divEnterCard4.appendChild(p4);
  card.appendChild(divEnterCard4);

  const divbtn = document.createElement("div");
  divbtn.classList.add("mt-6", "mb-2");
  const btnsupprimer = document.createElement("button");
  btnsupprimer.classList.add('bg-orange-600', 'p-2', 'rounded-lg', 'font-bold', 'mr-4');
  btnsupprimer.textContent = "supprimer";
  btnsupprimer.addEventListener("click", () => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette transaction ?")) {
      const id = Number(card.dataset.id);
      card.remove();
      const nouvelleTransactions = [];
      for (let i = 0; i < transactions.length; i++) {
        if (transactions[i].id != id) {
          nouvelleTransactions.push(transactions[i]);
        }
      }
      transactions = nouvelleTransactions;
      updateTotale();
      saveToLocalStorage();
    }

  });
  divbtn.appendChild(btnsupprimer);
  const btnmodifier = document.createElement("button");
  btnmodifier.classList.add('bg-green-600', 'p-2', 'rounded-lg', 'font-bold');
  btnmodifier.textContent = "modifier";
  btnmodifier.addEventListener("click", () => {
    const id = Number(card.dataset.id);
    const cardmodifier = document.getElementById("cardmodifier");

    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].id == id) {
        document.getElementById("ndesc").value = transactions[i].description;
        document.getElementById("nmontant").value = transactions[i].montant;
        document.getElementById("noperation").value = transactions[i].operation;
        document.getElementById("ndate").value = transactions[i].date;
        document.getElementById("ntransactionId").value = id;
      }
    }
    updateTotale();
    cardmodifier.classList.remove("hidden");


  });

  divbtn.appendChild(btnmodifier);
  card.appendChild(divbtn);

  transaction.appendChild(card);


}
const ncloseModal = document.getElementById("ncloseModal");
ncloseModal.addEventListener("click", () => {
  const cardmodifier = document.getElementById("cardmodifier");
  cardmodifier.classList.add("hidden");

});

function modifierInformations() {

  const id = Number(document.getElementById("ntransactionId").value);


  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].id === id) {

      transactions[i].description = document.getElementById("ndesc").value;
      transactions[i].montant = parseFloat(document.getElementById("nmontant").value);
      transactions[i].operation = document.getElementById("noperation").value;
      transactions[i].date = document.getElementById("ndate").value;


      const card = document.querySelector(`[data-id='${id}']`);
      card.querySelector(".pdesc").textContent = transactions[i].description;

      if (transactions[i].operation === "Revenu") {
        card.querySelector(".pmontant").textContent = `+${transactions[i].montant}`;
        card.classList.remove("bg-red-200");
        card.classList.add("bg-lime-200");
      } else {
        card.querySelector(".pmontant").textContent = `-${transactions[i].montant}`;
        card.classList.remove("bg-lime-200");
        card.classList.add("bg-red-200");
      }

      card.querySelector(".poperation").textContent = transactions[i].operation;
      card.querySelector(".pdate").textContent = transactions[i].date;
    }
  }


  updateTotale();
  saveToLocalStorage();


  document.getElementById("cardmodifier").classList.add("hidden");
}



