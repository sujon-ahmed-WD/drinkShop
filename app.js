const cardDataList = [];

const loadCard = () => {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
    .then((res) => res.json())
    .then((data) => displayCard(data.drinks))
    .catch((error) => console.log(error));
};
//  search Faction
document.getElementById("searchbutton").addEventListener("click", () => {
  const input_text = document.getElementById("innertext").value.trim();
  if (input_text !== "") {
    searchfun(input_text);
  }
});

const searchfun = (innertext) => {
  fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${innertext}`)
    .then((res) => res.json())
    .then((data) => {
      if (data.drinks) {
        cardDataList.length = 0;
        displayCard(data.drinks);
      } else {
        document.getElementById("card-container").innerHTML = "<p >No results found.</p>";
      }
    })
    .catch((err) => console.log(err));
};

// Card Section
const displayCard = (cards) => {
  const card_container = document.getElementById("card-container");
  card_container.innerHTML = "";

  cards.forEach((card, index) => {
    cardDataList.push(card);
    const col = document.createElement("div");
    col.classList = "col-12 col-md-6 col-lg-4 mb-4";
    col.innerHTML = `
      <div class="card" style="width: 18rem;">
        <img src="${card.strDrinkThumb}" class="card-img-top" alt="${card.strDrink}">
        <div class="card-body">
          <h5 class="card-title">Name: ${card.strDrink}</h5>
          <h5 class="card-title">Category: ${card.strCategory}</h5>
          <p class="card-text">${card.strInstructions.slice(0, 15)}</p>
          <button onclick="add_to_card('${index}')" class="btn btn-primary">Add to group</button>
          <button onclick="Details('${index}')" class="btn btn-secondary">Details</button>
        </div>
      </div>`;
    card_container.appendChild(col);
  });
};
//  Add to card section
const add_to_card = (index) => {
  const name = cardDataList[index];
  const add_to_card_Container = document.getElementById("add_to_card");

  // count Section
  const count = parseInt(document.getElementById("count").innerText);
  if (count < 7) {
    document.getElementById("count").innerText = count + 1;
    const col = document.createElement("div");
    
    col.innerHTML = `<p>Name: ${name.strDrink}</p>`;
    add_to_card_Container.appendChild(col);
  } else {
    alert("More than 7 drinks not allowed");
  }
};

const Details = (index) => {
  const Detail = cardDataList[index];
  const model = document.getElementById("modem");

  model.innerHTML = `
    <button type="button" class="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" id="openModalBtn"></button>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog"><div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">${Detail.strDrink}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="card" style="width: 100%;">
            <img src="${Detail.strDrinkThumb}" class="card-img-top" alt="${Detail.strDrink}">
            <div class="card-body">
              <h5 class="card-title">Name: ${Detail.strDrink}</h5>
              <p class="card-text">Category: ${Detail.strCategory}</p>
              <p class="card-text">${Detail.strInstructions}</p>
              <p class="card-text">Product ID: ${Detail.idDrink}</p>
              <p class="card-text">Alcoholic: ${Detail.strAlcoholic}</p>
            </div>
          </div>
        </div>
      </div></div>
    </div>
  `;

  document.getElementById("openModalBtn").click();
};

loadCard();
