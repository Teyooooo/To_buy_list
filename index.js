import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-database.js"

const firebaseConfig = {
  databaseURL: "YOUR_FIREBASE_DATABASE_URL",
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const dbRef = ref(database, "Items")

const btn_add = document.getElementById("btn_add")
const text_input = document.getElementById("text_input")
const list_items = document.getElementById("list_items")

onValue(dbRef, function(snapshot){
  if(snapshot.exists()){
    let itemsFromDB = Object.entries(snapshot.val())
    clearTheList_items()
    itemsFromDB.forEach(appendItemToList_items)
  } else{
    list_items.innerHTML = `<p>No Items yet...</p>`
  }
})

btn_add.addEventListener("click", function () {
  const value = text_input.value
  if (value !== ""){
    push(dbRef, value)
  }
  clearText_input()
})

function clearText_input(){
  text_input.value = ""
}

function appendItemToList_items(item_value){
  let currentItem = item_value
  let currentValue = currentItem[1]
  let currentID = currentItem[0]

  let newLi = document.createElement("li")
  newLi.textContent = currentValue

  list_items.append(newLi)

  newLi.addEventListener('click', function(){
    console.log(`${currentID} of the value ${currentValue} have been deleted in the database`)

    let exactLocationOfItemInDB = ref(database, `Items/${currentID}`)
    remove(exactLocationOfItemInDB)
    
  })
}

function clearTheList_items(){
  list_items.innerHTML = ""
}

