const addForm = document.querySelector('.add');
const toDoList = document.querySelector('.todos');
const search = document.querySelector('.search input');

const generateToDoTemplate = toDoItem => {
    
    const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${toDoItem}</span>
        <i class="far fa-trash-alt delete"></i>
    </li>
    `;

    toDoList.innerHTML += html;
}

addForm.addEventListener('submit', e => {
    
    e.preventDefault();
    const toDoItem = addForm.add.value.trim();
    

    if(toDoItem.length){
        generateToDoTemplate(toDoItem);
        addForm.reset();
    }    
});

toDoList.addEventListener('click', e =>{
    if(e.target.classList.contains('delete')){
        e.target.parentElement.remove();
    }
});

const filterToDos = term => {
    Array.from(toDoList.children)
    .filter(toDo => !toDo.textContent.toLowerCase().includes(term))
    .forEach(toDo => toDo.classList.add('filtered'));
    
    Array.from(toDoList.children)
    .filter(toDo => toDo.textContent.toLowerCase().includes(term))
    .forEach(toDo => toDo.classList.remove('filtered')); 
};

search.addEventListener('keyup', () =>{
    const term = search.value.trim().toLowerCase();
    console.log(term);
    filterToDos(term);
});

