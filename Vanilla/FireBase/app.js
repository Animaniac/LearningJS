const list = document.querySelector('ul');
const form = document.querySelector('form');
const button = document.querySelector('button');


const addRecipe = (recipie,id) => {
    let html = `
        <li data-id ="${id}">
            <div>${recipie.title}</div>
            <div>${recipie.created_at.toDate()}</div>
            <button class="btn btn-danger btn-sm my-2">Delete</button>
        </li>        
    `;
    list.innerHTML += html;
};

const deleteRecipe = id => {
    const recipies = document.querySelectorAll('li');

    recipies.forEach(recipe =>{
        if (recipe.getAttribute('data-id') === id){
            recipe.remove();
        }
    });
};

const unsub = db.collection('recipes').onSnapshot(snapshot => {
    snapshot.docChanges().forEach(change => {
        const doc = change.doc;

        if(change.type === 'added'){
            addRecipe(doc.data(), doc.id);
        }else if(change.type = 'remove'){
            deleteRecipe(doc.id);
        }
    });
})

form.addEventListener('submit', e => {
    e.preventDefault();

    const now = new Date();
    const recipe = {
        title: form.recipe.value,
        created_at: firebase.firestore.Timestamp.fromDate(now)
    };

    db.collection('recipes').add(recipe).then(() => {
        console.log('recipe added');
    }).catch(err => console.log(err));
});

list.addEventListener('click', e => {
    if(e.target.tagName === 'BUTTON'){
        const id = e.target.parentElement.getAttribute('data-id');
        db.collection('recipes').doc(id).delete().then(() => {
            console.log('recipe deleted');
        }).catch(err => console.log(err));
    }
})

button.addEventListener('click', () => {
    unsub();
    console.log('unsubbed');
})