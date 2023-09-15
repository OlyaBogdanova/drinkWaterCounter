const smallCups = document.querySelectorAll(".cup-small");
const liters = document.getElementById("liters");
const percentage = document.getElementById("percentage");
const remained = document.getElementById("remained");

getLocalStorage();
smallCups.forEach((cup, idx) => {
  cup.addEventListener("click", () => highlightCups(idx));
});

function highlightCups(idx) {
  if (
    smallCups[idx].classList.contains("full") &&
    !smallCups[idx].nextElementSibling.classList.contains("full")
  ) {
    idx--;
  }
  smallCups.forEach((cup, idx2) => {
    if (idx2 <= idx) {
      cup.classList.add("full");
    } else {
      cup.classList.remove("full");
    }
  });

  saveInLocalStorage();
  updateBigCup();
}

function updateBigCup() {
  const fullCups = document.querySelectorAll(".cup-small.full").length;
  const totalCups = smallCups.length;
  if (fullCups === 0) {
    percentage.style.visibility = "hidden";
    percentage.style.height = 0;
  } else {
    percentage.style.visibility = "visible";
    percentage.style.height = `${(fullCups / totalCups) * 330}px`;
    percentage.innerText = `${(fullCups / totalCups) * 100}%`;
  }
  if (fullCups === totalCups) {
    remained.style.visibility = "hidden";
    remained.style.height = 0;
  } else {
    remained.style.visibility = "visible";
    liters.innerText = `${2 - (fullCups * 250) / 1000}L`;
  }
}
function saveInLocalStorage() {
  const indexArr = [];
  const fullCups = document.querySelectorAll(".cup-small.full");
  fullCups.forEach((cup, index) => indexArr.push(index));

  localStorage.setItem("water", JSON.stringify({ index: indexArr }));
}
function getLocalStorage() {
  const water = localStorage.getItem("water");
  if (water) {
    const data = JSON.parse(water).index;

    smallCups.forEach((elem, index)=>{
        if(data.includes(index)){
            elem.classList.add('full')
        }
    })
    updateBigCup()
  }
}
getLocalStorage()