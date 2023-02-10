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

console.log(listColumns);
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
let dragging = false;
let currentColumn;

// Get Arrays from localStorage if available, set default values if not
function getSavedColumns() {
  if (localStorage.getItem('backlogItems')) {
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
// filter Arrays to remove empty items
function filterArray(array) {
  // console.log(array);
  const filteredArray = array.filter(item => item !== null);
  // console.log(filteredArray);
  return filteredArray;
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
  listEl.contentEditable = true;
  listEl.id = index;
  listEl.setAttribute('onfocusout', `updateItem(${index}, ${column})`);
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

  backlogListArray = filterArray(backlogListArray);
  // Progress Column
  progressList.textContent = '';
  progressListArray.forEach((progressItem, index) => {
    createItemEl(progressList, 1, progressItem, index)
  });
  progressListArray = filterArray(backlogListArray);
  // Complete Column
  completeList.textContent = '';
  completeListArray.forEach((completeItem, index) => {
    createItemEl(completeList, 2, completeItem, index)
  });
  completeListArray = filterArray(backlogListArray);
  // On Hold Column
  onHoldList.textContent = '';
  onHoldListArray.forEach((onHoldItem, index) => {
    createItemEl(onHoldList, 3, onHoldItem, index)
  });
  onHoldListArray = filterArray(backlogListArray);
  // Run getSavedColumns only once, Update Local Storage
  updatedOnLoad = true;
  updateSavedColumns();
}
// update Item - Delete if necessary , or update Array value
function updateItem(id, column) {
  const selectedArray = listArrays[column];
  // console.log(selectedArray);
  const selectedColumnEl = listColumns[column].children;

  if (!dragging) {
    // console.log(selectedColumnEl[id].textContent);
    if (!selectedColumnEl[id].textContent) {
      delete selectedArray[id];
    } else {
      selectedArray[id] = selectedColumnEl[id].textContent;
    }
    console.log(selectedArray);
    updateDOM();
  }

}

// Add to column List, Reset Textbox
function addToColumn(column) {
  // console.log(addItems[column].textContent);
  const itemText = addItems[column].textContent;
  const selectedArray = listArrays[column];
  selectedArray.push(itemText);
  addItems[column].textContent = '';
  updateDOM();
}

// Show Add Item Input Box
// We can directly style the html class in javascript with .style method. 
function showInputBox(column) {
  addBtns[column].getElementsByClassName.visibility = 'hidden';
  saveItemBtns[column].style.display = 'flex';
  addItemContainers[column].style.display = 'flex';
}
// Hide Item Input Box. 
function hideInputBox(column) {
  addBtns[column].getElementsByClassName.visibility = 'visible';
  saveItemBtns[column].style.display = 'none';
  addItemContainers[column].style.display = 'none';
  addToColumn(column);
}

// Allows array to reflect drag and drop, on page refresh keep consisit data. :Rebuilidng arrays.
function rebuildArrays() {
  // resetting out an array , pusing out makes bug
  backlogListArray = [];
  for (let i = 0; i < backlogList.children.length; i++) {
    backlogListArray.push(backlogList.children[i].textContent);
  }
  progressListArray = [];
  for (let i = 0; i < progressList.children.length; i++) {
    progressListArray.push(progressList.children[i].textContent);
  }
  completeListArray = [];
  for (let i = 0; i < completeList.children.length; i++) {
    completeListArray.push(completeList.children[i].textContent);
  }
  onHoldListArray = [];
  for (let i = 0; i < onHoldList.children.length; i++) {
    onHoldListArray.push(onHoldList.children[i].textContent);
  }

  updateDOM();
  //   console.log(backlogList.children);
  //   console.log(progressList.children);
}

// When Items Starts Dragging
function drag(e) {
  draggedItem = e.target;
  dragging = true;
  // console.log('draggedItem', draggedItem);
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

  // currentcolumn is empty global var
  // listColumns contains the entire list texts.
  // draggedItem is also a global var
  // Adding Items to Column on drag drop
  const parent = listColumns[currentColumn];
  // console.log('parent-1', parent);
  parent.appendChild(draggedItem);
  // console.log('parentapend', parent);
  dragging = false;
  rebuildArrays();
}
// when Item Enters Column Area
function dragEnter(column) {
  // console.log(listColumns[column]); 
  listColumns[column].classList.add('over');
  currentColumn = column;

}
// On Load
updateDOM();
