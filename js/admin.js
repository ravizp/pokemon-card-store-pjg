function updateTable() {
  const cardData = JSON.parse(localStorage.getItem("cards")) || [];
  const table = document.getElementById("card-table").getElementsByTagName("tbody")[0];
  table.innerHTML = ""; // Clear existing rows

  cardData.forEach((card, index) => {
    addRowToTable(card, index);
  });
}

function addRowToTable(card, index) {
  const table = document.getElementById("card-table").getElementsByTagName("tbody")[0];
  const newRow = `
        <tr data-id="${card.id}">
            <td>${card.name}</td>
            <td>${card.price}</td>
            <td>${card.quantity}</td>
            <td><img src="${card.image}" style="width: 100px; height: auto;" /></td>
            <td>
                <button class="edit-btn" data-id="${card.id}">Edit</button>
                <button class="delete-btn" data-id="${card.id}">Delete</button>
            </td>
        </tr>
    `;
  table.insertAdjacentHTML("beforeend", newRow);

  document.querySelectorAll(".edit-btn").forEach(button => {
    button.addEventListener("click", handleEdit);
  });

  document.querySelectorAll(".delete-btn").forEach(button => {
    button.addEventListener("click", handleDelete);
  });
}

document.getElementById("card-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const cardName = document.getElementById("card-name").value;
  const cardPrice = document.getElementById("card-price").value;
  const cardQuantity = document.getElementById("card-quantity").value;
  const cardImageFile = document.getElementById("card-image").files[0];

  const reader = new FileReader();
  reader.onload = function (event) {
    const cardImage = event.target.result;

    let cardData = JSON.parse(localStorage.getItem("cards")) || [];

    const editingId = document.getElementById("card-form").getAttribute("data-edit-id");
    if (editingId !== null) {
      const index = cardData.findIndex(card => card.id == editingId);
      cardData[index] = { id: editingId, name: cardName, price: cardPrice, quantity: cardQuantity, image: cardImage };
      document.getElementById("card-form").removeAttribute("data-edit-id");
      updateTable();
    } else {
      const newCard = { id: Date.now().toString(), name: cardName, price: cardPrice, quantity: cardQuantity, image: cardImage };
      cardData.push(newCard);
      addRowToTable(newCard, cardData.length - 1);
    }

    localStorage.setItem("cards", JSON.stringify(cardData));

    document.getElementById("addCardModal").style.display = "none";
    document.getElementById("card-form").reset();
  };
  reader.readAsDataURL(cardImageFile);
});

function handleDelete(event) {
  const cardId = event.target.getAttribute("data-id");
  let cardData = JSON.parse(localStorage.getItem("cards")) || [];
  cardData = cardData.filter(card => card.id !== cardId);
  localStorage.setItem("cards", JSON.stringify(cardData));
  updateTable();
}

function handleEdit(event) {
  const cardId = event.target.getAttribute("data-id");
  const cardData = JSON.parse(localStorage.getItem("cards")) || [];
  const card = cardData.find(card => card.id === cardId);

  document.getElementById("card-name").value = card.name;
  document.getElementById("card-price").value = card.price;
  document.getElementById("card-quantity").value = card.quantity;
  document.getElementById("card-form").setAttribute("data-edit-id", card.id);

  document.getElementById("addCardModal").style.display = "block";
}

document.addEventListener("DOMContentLoaded", updateTable);
