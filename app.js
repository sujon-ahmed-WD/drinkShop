const cardDataList = [];
const loadCard = () => {
  fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
    .then((res) => res.json())
    .then((data) => displayCard(data.drinks))
    .catch((error) => console.log(error));
};

const displayCard = (cards) => {
  const card_container = document.getElementById("card-container");

  cards.forEach((card, index) => {
    cardDataList.push(card);
    const col = document.createElement("div");

    col.classList = "col-12 col-md-6 col-lg-4 mb-4";
    col.innerHTML = `
  <div class="card" style="width: 18rem;">
    <img src="${card.strDrinkThumb}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">Name: ${card.strDrink}</h5>
      <h5 class="card-title">Category: ${card.strCategory}</h5>
      <p class="card-text">${card.strInstructions.slice(0, 15)}</p>
      <button onclick="add_to_card('${index}')" class="btn btn-primary">Add to group</button>
      <button onclick="Details('${index}')" class="btn btn-primary">Details</button>
    </div>
  </div>
`;

    card_container.append(col);
  });
};
const add_to_card = (index) => {
  const name = cardDataList[index];
  const add_to_card_Container = document.getElementById("add_to_card");

  // count
  const count = document.getElementById("count").innerText;
  let convertCount = parseInt(count);
  convertCount = convertCount + 1;
  if (convertCount <= 7) {
    document.getElementById("count").innerText = convertCount;
  } else {
    alert(" more than 7 drinks");
  }

  const col = document.createElement("div");
  col.innerHTML = `
     
  <p> Name:  ${name.strDrink} </p>  
         
  `;
  add_to_card_Container.append(col);
};

const Details = (index) => {
  const Detail = cardDataList[index];

  const model = document.getElementById("modem");

  // Clear previous modal content
  model.innerHTML = `
    <!-- Modal Trigger Button -->
    <button type="button" class="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" id="openModalBtn">
      Open Modal
    </button>

    <!-- Modal Structure -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">${Detail.strDrink}</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
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
            </div>
        </div>
    </div>
  `;

  // Modal automatically open
  const openModalBtn = document.getElementById("openModalBtn");
  openModalBtn.click();
};


loadCard();
