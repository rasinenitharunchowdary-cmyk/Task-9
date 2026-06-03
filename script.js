// ── Helpers ────────────────────────────────────────────────────────────────

function truncate(str, max) {
  return str.length > max ? str.slice(0, max) + "..." : str;
}

// ── Card Builder ───────────────────────────────────────────────────────────

function createCard(product) {
  const isExpensive = product.price > 100;

  // Root card
  const card = document.createElement("div");
  card.setAttribute("class", "card");

  // ── Image wrapper
  const imgWrap = document.createElement("div");
  imgWrap.setAttribute("class", "card-img-wrap");

  const img = document.createElement("img");
  img.setAttribute("class", "card-img");
  img.setAttribute("src", product.image);
  img.setAttribute("alt", product.title);
  img.setAttribute("loading", "lazy");
  imgWrap.append(img);

  // Price tag badge
  const tag = document.createElement("span");
  tag.setAttribute("class", isExpensive ? "card-tag expensive" : "card-tag budget");
  tag.textContent = isExpensive ? "Expensive Product" : "Budget Product";
  imgWrap.append(tag);

  card.append(imgWrap);

  // ── Body
  const body = document.createElement("div");
  body.setAttribute("class", "card-body");

  const category = document.createElement("span");
  category.setAttribute("class", "card-category");
  category.textContent = product.category;
  body.append(category);

  const title = document.createElement("h2");
  title.setAttribute("class", "card-title");
  title.textContent = truncate(product.title, 30);
  body.append(title);

  const desc = document.createElement("p");
  desc.setAttribute("class", "card-desc");
  desc.textContent = truncate(product.description, 50);
  body.append(desc);

  const price = document.createElement("div");
  price.setAttribute("class", "card-price");
  price.textContent = "$" + product.price;
  body.append(price);

  card.append(body);

  // ── Actions
  const actions = document.createElement("div");
  actions.setAttribute("class", "card-actions");

  // Show Price button
  const btnPrice = document.createElement("button");
  btnPrice.setAttribute("class", "btn btn-price");
  btnPrice.textContent = "Show Price";
  btnPrice.addEventListener("click", function () {
    alert(product.price);
  });
  actions.append(btnPrice);

  // Show Category button
  const btnCategory = document.createElement("button");
  btnCategory.setAttribute("class", "btn btn-category");
  btnCategory.textContent = "Show Category";
  btnCategory.addEventListener("click", function () {
    alert(product.category);
  });
  actions.append(btnCategory);

  // View Details button
  const btnDetails = document.createElement("button");
  btnDetails.setAttribute("class", "btn btn-details");
  btnDetails.textContent = "View Details";
  btnDetails.addEventListener("click", function () {
    alert(
      "Title: " + product.title +
      "\nPrice: $" + product.price +
      "\nCategory: " + product.category
    );
  });
  actions.append(btnDetails);

  card.append(actions);

  return card;
}

// ── Render Products ────────────────────────────────────────────────────────

function renderProducts(products) {
  const grid = document.querySelector("#product-grid");

  // Stats
  const stats = document.querySelector("#stats");
  stats.textContent = "Total Products: " + products.length;

  products.forEach(function (product) {
    const card = createCard(product);
    grid.append(card);
  });
}

// ── Error Display ──────────────────────────────────────────────────────────

function showError() {
  const container = document.querySelector("#error-container");
  const errorBox = document.createElement("div");
  errorBox.textContent = "Something Went Wrong";
  errorBox.style.backgroundColor = "red";
  errorBox.style.color = "white";
  errorBox.style.textAlign = "center";
  errorBox.style.padding = "16px";
  errorBox.style.fontWeight = "600";
  errorBox.style.fontSize = "16px";
  container.append(errorBox);
}

// ── Fetch ──────────────────────────────────────────────────────────────────

fetch("https://fakestoreapi.com/products")
  .then(function (response) {
    return response.json();
  })
  .then(function (products) {
    renderProducts(products);
  })
  .catch(function () {
    showError();
  })
  .finally(function () {
    const finalDiv = document.querySelector(".final");
    finalDiv.textContent = "API Request Completed Successfully";
  });
