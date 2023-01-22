//Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");


console.log("Js works");

console.log(todoButton);
//Event Listeners
//selected classs todoButton and added event listner with custom function to execute`
todoButton.addEventListener("click", addToDo);

//Functions

//1: Creating function for addToDo
function addToDo(event) {
    //converting html component into js func
    // <div className="todo">
    //     <li></li>
    //     <button>delete</button>
    //     <button>checked</button>
    // </div>

    //prevent form from submitting 
    event.preventDefault();
    // console.log('hello guys');


    //create element creates html like element tag that can be stored in js var
    //main DIV todo
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //crate LI
    const newToDO = document.createElement('li');
    newToDO.innerText = 'hey';
    newToDO.classList.add('todo-item');
    //sets the newToDo, that contains list, having class todo-item into the main TODO or todoDiv
    todoDiv.appendChild(newToDO);

    // CHECK MARK BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class = "fa-solid fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // CHECK TRASH BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //Appending to list
    //Apppending to the query selected class form todoList var
    todoList.appendChild(todoDiv);
    // https://www.youtube.com/watch?v=Ttf3CEsEwMQ
}   
