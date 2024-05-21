document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  const inputs = form.querySelectorAll("input");
  const buy = document.querySelector("#btn");
  const checedCheck = document.getElementById("check");

  inputs.forEach((input) => {
    const value = localStorage.getItem(input.id);
    if (value) {
      input.value = value;
    }
  });

  checedCheck.addEventListener("change", () => {
    if (checedCheck.checked) {
      inputs.forEach((input) => {
        localStorage.setItem(input.id, input.value);
      });
    } else {
      inputs.forEach((input) => {
        localStorage.removeItem(input.id);
      });
    }
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const emailSignIn = localStorage.getItem("email");
    const passwordSignIn = localStorage.getItem("password");
    const emailSignUp = document.getElementById("emailSignUp").value;
    const passwordSignUp = document.getElementById("passwordSignUp").value;
    if (emailSignUp === emailSignIn && passwordSignUp === passwordSignIn) {
      window.location.href = "./cards.html";
    } else {
      window.location.href = "./index.html";
    }
  });

  window.addEventListener("beforeunload", function (event) {
    if (!checedCheck.checked) {
      inputs.forEach((input) => {
        localStorage.removeItem(input.id);
      });
    }
  });

  if (buy) {
    buy.addEventListener("click", () => {
      let inputsFilled = true;
      inputs.forEach((input) => {
        if (input.value === "") {
          inputsFilled = false;
        }
      });
      if (!inputsFilled) {
        alert("Iltimos, barcha joylarni to'ldiring");
      } else {
        window.location.href = "./cards.html";
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const loader = document.querySelector(".loader");
  loader.style.display = "block";

  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      const cardsContainer = document.querySelector(".cards");
      data.forEach((product) => {
        const card = createCard(product);
        cardsContainer.appendChild(card);
      });
      loader.style.display = "none";
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
      loader.style.display = "none";
    });
});

function createCard(product) {
  const card = document.createElement("div");
  card.classList.add("card");

  const image = document.createElement("img");
  image.src = product.image;
  image.alt = product.title;

  const title = document.createElement("h2");
  title.textContent = product.title.slice(0, 10) + "...";

  const description = document.createElement("p");
  description.textContent = product.description.slice(0, 40) + "...";

  const priceContainer = document.createElement("div");
  priceContainer.classList.add("star");
  const priceLabel = document.createElement("h3");
  priceLabel.textContent = "Summa";
  const price = document.createElement("p");
  price.innerHTML = `<b>-10%</b> ${product.price}$`;

  const buttonsContainer = document.createElement("div");
  buttonsContainer.classList.add("star2");
  const addToCartButton = document.createElement("button");
  addToCartButton.classList.add("btn1");
  addToCartButton.textContent = "Add to cart";
  const buyNowButton = document.createElement("button");
  buyNowButton.classList.add("btn2");
  buyNowButton.textContent = "Buy Now";

  priceContainer.appendChild(priceLabel);
  priceContainer.appendChild(price);

  buttonsContainer.appendChild(addToCartButton);
  buttonsContainer.appendChild(buyNowButton);

  card.appendChild(image);
  card.appendChild(title);
  card.appendChild(description);
  card.appendChild(priceContainer);
  card.appendChild(buttonsContainer);

  return card;
}
main();

// alertda parol chiqishi
document.addEventListener("DOMContentLoaded", function () {
  const name = localStorage.getItem("name");
  const surname = localStorage.getItem("surname");
  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");


  if (name && surname && email && password && !sessionStorage.getItem("registered")) {
    alert(
      `Name: ${name}\nSurname: ${surname}\nEmail: ${email}\nPassword: ${password}`
    );
    
    sessionStorage.setItem("registered", true);
  }
});
