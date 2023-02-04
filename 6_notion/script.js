const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid');
const addItemContainers = document.querySelectorAll('.add-container');
const addItems = document.querySelectorAll('.add-item');
// Item Lists
const listColumns = document.querySelectorAll('.drag-item-list');
const backlogList = document.getElementById('backlog-list');
const progressList = document.getElementById('progress-list');
const completeList = document.getElementById('complete-list');
const onHoldList = document.getElementById('on-hold-list');

// Items
// we have not yet loaded from local storage
let updatedOnLoad = false;

// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listArrays = [];

// Drag & drop Functionality {global vars}
let draggedItem;
let currentColumn;

// Get Arrays from localStorage if available, set default values if not
function getSavedColumns() {
  if (localStorage.getItem('backlogItem s')) {
    backlogListArray = JSON.parse(localStorage.backlogItems);
    progressListArray = JSON.parse(localStorage.progressItems);
    completeListArray = JSON.parse(localStorage.completeItems);
    onHoldListArray = JSON.parse(localStorage.onHoldItems);
  } else {
    backlogListArray = ['Release the course', 'Sit back and relax'];
    progressListArray = ['Work on projects', 'Listen to music'];
    completeListArray = ['Being cool', 'Getting stuff done'];
    onHoldListArray = ['Being uncool'];
  }
}

// to test if it's working:
// getSavedColumns();
// updateSavedColumns();

// Set localStorage Arrays : updating and saving data
function updateSavedColumns() {
  listArrays = [backlogListArray, progressListArray, completeListArray, onHoldListArray];
  const arrayNames = ['backlog', 'progress', 'complete', 'onHold'];
  arrayNames.forEach((arrayName, index) => {
    localStorage.setItem(`${arrayName}Items`, JSON.stringify(listArrays[index]));
  });
  // localStorage.setItem('backlogItems', JSON.stringify(backlogListArray));
  // localStorage.setItem('progressItems', JSON.stringify(progressListArray));
  // localStorage.setItem('completeItems', JSON.stringify(completeListArray));
  // localStorage.setItem('onHoldItems', JSON.stringify(onHoldListArray));
}

// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {
  // console.log('columnEl:', columnEl);
  // console.log('column:', column);
  // console.log('item:', item);
  // console.log('index:', index);
  // List Item
  const listEl = document.createElement('li');
  listEl.classList.add('drag-item');
  listEl.textContent = item;
  // Append
  // columnE1 carreis out
  //  console.log('columnEl:', columnEl);
  // implementing Dragable API
  listEl.draggable = true;
  // add event listerner and event for drag
  listEl.setAttribute('ondragstart', 'drag(event)');

  columnEl.appendChild(listEl);

}

// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
  // Check localStorage once
  if (!updatedOnLoad) {
    getSavedColumns();
  }
  // Backlog Column
  backlogList.textContent = '';
  backlogListArray.forEach((backlogItem, index) => {
    createItemEl(backlogList, 0, backlogItem, index)
  });
  // Progress Column
  progressList.textContent = '';
  progressListArray.forEach((progressItem, index) => {
    createItemEl(progressList, 0, progressItem, index)
  });
  // Complete Column
  completeList.textContent = '';
  completeListArray.forEach((completeItem, index) => {
    createItemEl(completeList, 0, completeItem, index)
  });
  // On Hold Column
  onHoldList.textContent = '';
  onHoldListArray.forEach((onHoldItem, index) => {
    createItemEl(onHoldList, 0, onHoldItem, index)
  });
  // Run getSavedColumns only once, Update Local Storage

}

// When Items Starts Dragging
function drag(e) {
  draggedItem = e.target;
  console.log('draggedItem', draggedItem);
}
// Column Allows item to Drop
function allowDrop(e) {
  e.preventDefault();
}
// Dropping Items in Column
function drop(e) {
  e.preventDefault();
  // Remove background color/Pading
  listColumns.forEach((column) => {
    column.classList.remove('over');
  });

  // Adding Items to Column on drag drop
  const parent = listColumns[currentColumn];
  parent.appendChild(draggedItem);
}
// when Item Enters Column Area
function dragEnter(column) {
  // console.log(listColumns[column]); 
  listColumns[column].classList.add('over');
  currentColumn = column;

}


// On Load
updateDOM();
