function searchPokemon() {
  const input = document.querySelector(".searchInput").value.toLowerCase();
  const cards = document.querySelectorAll(".menu-card");

  cards.forEach(card => {
    const name = card.getAttribute("data-name").toLowerCase();
    if (!name.includes(input)) {
      card.style.display = "none";
    } else {
      card.style.display = "";
    }
  });
}
