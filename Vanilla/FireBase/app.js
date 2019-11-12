const list = document.querySelector('ul');

const addRecipe = recipie => {
    let html = `
        <li>
            <div>${recipie.title}</div>
            <div>${recipie.created_at.toDate()}</div>
        </li>
    `;
    list.innerHTML += html;
};

db.collection('recipes').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
        addRecipe(doc.data());
    });
}).catch(err => console.log(err));