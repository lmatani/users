const listaUsuarios = document.getElementById('listaUsuarios');

getUsers();

function getUsers() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
            if (!response.ok) {
                throw new Error('Ha ocurrido un error en la solicitud');
            }
            return response.json();
        })
        .then ((jsonData) => {
            showInfoUsers(jsonData);
        })
        .catch((error) => {
            showError(error);
        });
}

function  showInfoUsers(dataUsers) {
     dataUsers.forEach((user, id) => {
        const userCard = {
            ...user,
            age: randomAge(60,25),
            img: imgPath(id),
        };
       
        insertUserInList(userCard);
    });
}


const randomAge = (max, min) => Math.floor(Math.random() * (max - min) + min);
const imgPath = (id) =>  `..\\assets\\img\\${++id}.jpeg`;

function insertUserInList(userCard){
    let liElem = document.createElement('li');
    let div = document.createElement('div');
    div.id = 'infoUsuario';
 
    const { address: { street } , address: { suite } , address: { city } } = userCard;
    const { company: company } = userCard;
    const { name , username, phone, email, img, age } = userCard;
    liElem.innerHTML = `<img src="${img}">`;
    div.innerHTML += `<p><span>Nombre: </span> ${name}</p>`;
    div.innerHTML += `<p><span>Edad: </span> ${age}</p>`;
    div.innerHTML += `<p><span>Username: </span> ${username}</p>`;
    div.innerHTML += `<p><span>Teléfono: </span> ${phone}</p>`;
    div.innerHTML += `<p><span>Email: </span> ${email}</p>`; 
    liElem.appendChild(div);
    liElem.innerHTML += `<p><span>Compañía: </span> ${company.name}</p>`;
    liElem.innerHTML += `<p><span>Dirección: </span> ${street}, ${suite}, ${city}</p>`;    
    listaUsuarios.appendChild(liElem);
}  


function showError(txt){
    let liElem = document.createElement('li');
    liElem.innerHTML = txt;
    listaUsuarios.appendChild(liElem);
}
