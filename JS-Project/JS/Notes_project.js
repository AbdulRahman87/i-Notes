// console.log("Welcome to First project.");
showNotes();

/* < div class="my-2 mx-2 card noteCard" style = "width: 18rem;" >
    <div class=" card-body">
        <h5 class="card-title">Note</h5>
        <p class="card-text"></p>
        <button class="btn btn-primary">Delete note</button>
    </div>
        </div > */

// If user adds a notes, add it to the localstorage.

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem('notes');

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    notesObj.push(addTxt.value);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addTxt.value = '';
    // console.log(notesObj);
    alert("Your note has been added Successfully!");
    showNotes();
});


// function to show notes from local storage.
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `<div class="my-2 mx-2 card noteCard" style = "width: 18rem;">
        <div class=" card-body">
            <h5 class="card-title">Note ${index + 1}</h5>
            <p class="card-text">${element}</p>
            <button onclick="deleteNote(${index})" class="btn btn-primary">Delete note</button>
        </div>
            </div >`;
    });

    let notesElem = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElem.innerHTML = html;
    }
    else {
        notesElem.innerHTML = `Nothing to show. Please add a note.`;
    }

}

// function to delete notes.
function deleteNote(index) {
    let sure = confirm("Do you really want to delete the note!");
    if (sure) {
        notesObj.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notesObj));
        showNotes();
    }
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {

    inputVal = search.value;
    // console.log(inputVal);
    let noteCard = document.getElementsByClassName("noteCard");
    Array.from(noteCard).forEach(function (element) {
        let cardTxt = element.getElementsByTagName('p')[0];
        if (cardTxt.innerText.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }

    });

});