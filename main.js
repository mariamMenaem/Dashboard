const questionForm = document.querySelector('.question-form');
const titleInput = document.getElementById('title');
const c1Input = document.getElementById('choice-1');
const c2Input = document.getElementById('choice-2');
const c3Input = document.getElementById('choice-3');
const c4Input = document.getElementById('choice-4');
const correctInput = document.getElementById('correct');
let dataTable = document.getElementById('data-table');
let questions = [];

let getFormData = function (ev) {
    ev.preventDefault();
    title = titleInput.value;
    choice1 = c1Input.value;
    choice2 = c2Input.value;
    choice3 = c3Input.value;
    choice4 = c4Input.value;
    answer = correctInput.value;

    var question = {
        id: Date.now(),
        title: title,
        choice1: choice1,
        choice2: choice2,
        choice3: choice3,
        choice4: choice4,
        answer: answer
    }

    questions.push(question);
    jsonQuestion = JSON.stringify(questions);
    localStorage.setItem('questions', jsonQuestion);
    showQquestions();
}


let showQquestions = function () {
    getQuestions();
    if (dataTable != null) {
        dataTable.innerHTML = ' '
        for (let index = 0; index < questions.length; index++) {
            let newRow = dataTable.insertRow();
            newRow.setAttribute('class', 'item');

            newRow.setAttribute('data-key', questions[index].id);

            let cell1 = newRow.insertCell(0);
            let cell2 = newRow.insertCell(1);
            let cell3 = newRow.insertCell(2);
            let cell4 = newRow.insertCell(3);
            let cell5 = newRow.insertCell(4);
            let cell6 = newRow.insertCell(5);
            let cell7 = newRow.insertCell(6);

            cell1.innerHTML = questions[index].title;
            cell2.innerHTML = questions[index].choice1;
            cell3.innerHTML = questions[index].choice2;
            cell4.innerHTML = questions[index].choice3;
            cell5.innerHTML = questions[index].choice4;
            cell6.innerHTML = questions[index].answer;
            cell7.innerHTML = `<button class=" btn btn-sm btn-danger delete-button">Delete <i class = "fa fa-trash " ></i></button>`;
        }
    }
}

let getQuestions = function () {
    let data = localStorage.getItem('questions');
    if (data != null) {
        questions = JSON.parse(data);
    }
}

if (dataTable != null) {
    dataTable.addEventListener('click', function (event) {
        console.log(event.target);
        if (event.target.classList.contains('delete-button')) {
            // console.log(event.target.parentElement.parentElement.getAttribute('data-key'));
            deleteQuestion(event.target.parentElement.parentElement.getAttribute('data-key'));
        }
    });
}

function deleteQuestion(id) {
    questions = questions.filter(function (item) {
        return item.id != id;
    });

    jsonQuestion = JSON.stringify(questions);
    localStorage.setItem('questions', jsonQuestion);
    showQquestions();

}

if (questionForm != null) {
    questionForm.addEventListener('submit', getFormData);
}
document.addEventListener('DOMContentLoaded', showQquestions);

// ///////////////////////////////dynamic form handler  ///////////////////////////////////////////////

let addcol = document.getElementById('addColum');
let addrow = document.getElementById('addRow');
let table = document.getElementById('my-table');

function appendRow() {
    let row = table.insertRow(table.rows.length);
    for (let i = 0; i < table.rows[0].cells.length; i++) {
        let cell = row.insertCell(i);
        cell.innerHTML = `<input type="text">`;
        if (i == table.rows[0].cells.length - 1) {
            cell.innerHTML = `<button class="btn btn-sm btn-danger delRow">Delete row</button>`
        }
        console.log(cell);
    }
}

function appendColumn() {
    for (let i = 0; i < table.rows.length; i++) {
        let cell = table.rows[i].insertCell(table.rows[i].cells.length - 1);
        cell.innerHTML = `<input type="text">`;
    }
}

function delrow(event) {
    console.log(event.target);
    if (event.target.classList.contains('delRow')) {
        event.target.parentElement.parentElement.remove();
    }
}

if (addcol != null) {
    addcol.addEventListener('click', appendColumn);
}

if (addrow != null) {
    addrow.addEventListener('click', appendRow);
}

if (table != null) {
    table.addEventListener('click', delrow);
}