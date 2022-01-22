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
    let addTitle = document.getElementById('title');
    let notes = localStorage.getItem('notes');

    if (notes == null) {
        var notesObj = {};
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let title = addTitle.value;
    let text = addTxt.value;
    notesObj[title] = text;
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addTxt.value = '';
    addTitle.value = '';
    // console.log(notesObj);
    showNotes();
    alert("Your note has been added Successfully!");
});


// function to show notes from local storage.
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = {};
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    for (var key in notesObj) {
        html += `<div class="my-2 mx-2 card noteCard" style = "width: 18rem;">
        <div class=" card-body">
            <h5 class="card-title">${key}</h5>
            <p class="card-text">${notesObj[key]}</p>
            <button onclick="deleteNote('${key}')" class="btn btn-primary">Delete note</button>
        </div>
            </div >`;
    };

    let notesElem = document.getElementById('notes');
    if (Object.keys(notesObj).length != 0) {
        notesElem.innerHTML = html;
    }
    else {
        notesElem.innerHTML = `Nothing to show. Please add a note.`;
    }

}

// function to delete notes.
function deleteNote(key) {
    // console.log(key);
    let sure = confirm("Do you really want to delete the note!");
    if (sure) {
        delete notesObj[key];
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
        let cardTitle = element.getElementsByTagName('h5')[0];
        if (cardTxt.innerText.includes(inputVal) || cardTitle.innerText.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }

    });

});
