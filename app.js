const loadCard = () => {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
    .then((res) => res.json())
    .then((data) => displayCard(data.drinks))
    .catch((error) => console.log(error));
};

const displayCard = (cards) => {
  // console.log(cards);
  const card_container = document.getElementById("card-container");

  cards.forEach((card) => {
    const col = document.createElement("div");
    col.classList="col-12 col-md-6 col-lg-4 mb-4"
    col.innerHTML = `


    <div class="card" style="width: 18rem;">
  <img src=${card.strDrinkThumb} class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Name:${card.strDrink}</h5>
    <h5 class="card-title">Category:${card.strCategory}</h5>
    <p class="card-text">${card.strInstructions.slice(0, 15)}</p>
    <a href="#" class="btn btn-primary">Add to group</a>
    <a href="#" class="btn btn-primary">Details</a>
  </div>
</div>


        

        `;

    card_container.append(col);
  });
};
loadCard();
