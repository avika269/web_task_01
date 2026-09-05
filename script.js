const canteens = [
    {
        name: "Main Canteen",
        category: "Food",
        location: "Block A",
        rating: 4.5,
        status: "Open",
        items: ["Burger", "Pizza", "Sandwich", "Cold Coffee"]
    },

    {
        name: "Juice Corner",
        category: "Drinks",
        location: "Block B",
        rating: 4.2,
        status: "Open",
        items: ["Mango Juice", "Orange Juice", "Milkshake", "Lassi"]
    },

    {
        name: "South Indian Corner",
        category: "Food",
        location: "Block C",
        rating: 4.7,
        status: "Open",
        items: ["Dosa", "Idli", "Vada", "Sambar"]
    },

    {
        name: "Snack Point",
        category: "Snacks",
        location: "Block D",
        rating: 4.0,
        status: "Closed",
        items: ["Samosa", "Maggi", "Fries", "Momos"]
    }
];


const taskInput=document.getElementById("canteenContainer");
const searchInput = document.getElementById("searchInput");

function displayCanteen(data){
  CSSContainerRule.innerHTML="";

  if(data.length===0){
    container.innerHTML = `
        <p class="no-result">
            No canteen found 😔
        </p>`;
        return;
  }
  data.forEach(canteen=>{
    const card = document.createElement("div");
    card.classList.add("canteen-card");
    card.ineerHTML=`
    <h2>${canteen.name}</h2>
    <p>${canteen.loaction}</p>
     <p>${canteen.rating}</p>
     <p>
     status:
     <span class=

    
    `
  })
}