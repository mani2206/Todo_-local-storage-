// JavaScript Code

const itemArray = []
const getItem = document.getElementById("saveTask");
const item = document.getElementById("item").value;
getItem.addEventListener("click", (e) => {
    createItem();
    displayItems()
})

function createItem() {
    const item = document.getElementById("item").value;
    const data = {
        itemvalue: item,
    }
    itemArray.push(data)

    localStorage.setItem("item", JSON.stringify(itemArray))
    document.getElementById("item").value = ""
}
function displayItems() {
    // let items = ""
    // for (let i = 0; i < itemArray.length; i++) {
    //     items += `<div class="item">
    //               <div class="input-controller">
    //                 <textarea disabled>${itemArray[i].itemvalue}</textarea>
    //                 <div class="edit-controller">
    //                   <i class="fa fa-remove deleteBtn text-danger"></i>
    //                   <i class="fa fa-edit editBtn text-info"></i>
    //                 </div>
    //               </div>
    //               <div class="update-controller">
    //                 <button class="saveBtn">Save</button>
    //                 <button class="cancelBtn">Cancel</button>
    //               </div>
    //             </div>`
    // }
    // document.querySelector("#to-do-list").innerHTML = items

    const itemsHTML = itemArray.map(item => `
                    <div class="item">
                        <div class="input-controller">
                        <textarea disabled>${item.itemvalue}</textarea>
                        <div class="edit-controller">
                            <i class="fa fa-remove deleteBtn text-danger"></i>
                            <i class="fa fa-edit editBtn text-info"></i>
                        </div>
                        </div>
                        <div class="update-controller">
                        <button class="saveBtn">Save</button>
                        <button class="cancelBtn">Cancel</button>
                        </div>
                    </div>
                    `).join('');

    document.querySelector("#to-do-list").innerHTML = itemsHTML;
    activateDeleteListeners()
    activateEditListeners()
    activateSaveListeners()
    activateCancelListeners()
}
function activateDeleteListeners() {
    let deleteBtn = document.querySelectorAll(".deleteBtn")
    deleteBtn.forEach((dB, i) => {
        dB.addEventListener("click", () => { deleteItem(i) })
    })

}
function deleteItem(i) {
    itemArray.splice(i, 1)
    console.log(itemArray, "mani---")
    localStorage.setItem('items', JSON.stringify(itemArray))
    displayItems()
}
function activateEditListeners() {
    const editBtn = document.querySelectorAll(".editBtn")
    const updateController = document.querySelectorAll(".update-controller")
    const inputs = document.querySelectorAll(".input-controller textarea")
    editBtn.forEach((eB, i) => {
        eB.addEventListener("click", () => {
            updateController[i].style.display = "block"
            inputs[i].disabled = false
        })
    })
}

function activateSaveListeners() {
    const saveBtn = document.querySelectorAll(".saveBtn")
    const inputs = document.querySelectorAll(".input-controller textarea");
    saveBtn.forEach((sb, i) => {
        sb.addEventListener("click", () => {

            updateItems(inputs[i].value, i)
        })
    })
}
function activateCancelListeners() {
    const cancelBtn = document.querySelectorAll(".cancelBtn")
    const updateController = document.querySelectorAll(".update-controller")
    const inputs = document.querySelectorAll('.input-controller textarea')
    cancelBtn.forEach((cB, i) => {
        cB.addEventListener("click", () => {
            updateController[i].style.display = "none"
            inputs[i].disabled = true
            inputs[i].style.border = "none"
        })
    })
}
function updateItems(text, i) {
    if (!itemArray[i]) {
        itemArray[i] = {}
    }

    itemArray[i] = text
    console.log(itemArray[i])
    localStorage.setItem("item", JSON.stringify(itemArray))

}
function displayDate() {
    let showDate = document.getElementById("showDate")
    let date = new Date();
    let formattedDate = date.toLocaleString()
    showDate.innerHTML = formattedDate;
    console.log(formattedDate);
}
window.onload = function () {
    displayDate();
    // displayItems()
}
