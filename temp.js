console.log('helloConsole')

document.getElementById('loginBlock').style.visibility = "visible";
document.getElementById('tiger').style.visibility = "visible";

var administratorLoginHTML = ''
var administratorTokenHTML = ''
var registeredpersonsHTML = ''
//var formHTML = ''
var administrators = ''
var registeredpersons = ''
var token = ''
var data = {}
const getTokenBTN = document.getElementById('getTokenData')

getTokenBTN.addEventListener('click', () => {
    data = {}
    data = {
        email: document.getElementById('email').value,
        password: document.getElementById('pwd').value
    }
    getToken(data)
})

async function getToken(data) {
    var response = await fetch("/administrators/login", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
        },
        body: JSON.stringify({
            email: data.email,
            password: data.password
        }),
    })

    //INFO:TODO:INFO: https://youtu.be/vjf774RKrLc?t=2231 //INFO:TODO:INFO:
    if (response.status == 200) {
        administrators = await response.json()
        token = administrators.token
        administratorLoginHTML = `<dt>${administrators.fullname.firstname} ${administrators.fullname.lastname}</dt>
    <dd>${administrators.email}</dd>`
        document.getElementById('administratorLogin').innerHTML = administratorLoginHTML
        administratorTokenHTML = `<dt>Token</dt>
    <dd>${administrators.token}</dd>`
        document.getElementById('token').innerHTML = administratorTokenHTML
        
        document.getElementById('viewRegisteredBTN').innerHTML = `
            <div class="card text-center m-2 p-2 w-75 mx-auto" style="background-color: #ED9437;">
                <button type="button" class="btn btn-primary" id="getRegisteredPersonsData" onclick="viewpersonCards()">View registered persons</button>
            </div>
            <div class="card text-center m-2 p-2 w-75 mx-auto" style="background-color: #ED9437;">
                <button type="button" class="btn btn-primary" id="newRegisteredPersonsData" onclick="newpersonCards()">New registered persons</button>
            </div>
        `
    } else {
        alert('....hmmmmm')
    }
}

function viewpersonCards() {
    getPersons(token)
    document.getElementById('loginBlock').innerHTML = ""
    document.getElementById('tiger').innerHTML = ""
    //renderPersonCards()
}

function newpersonCards() {
    console.log('New registered person...')
    let newPerson = (new Person).zeroPersonObject()
    renderPersonEditModal('...form view only, no data storage <i class="bi bi-emoji-smile"></i>', newPerson)
}

async function getPersons(token) {
    var response = await fetch("/registeredpersons", {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Token": token,
        },

    })
    registeredpersons = await response.json()
    console.log(' registeredpersons 😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋😋')
    console.log(registeredpersons)
    renderPersonCards()
}

function renderPersonCards() {
    /* registeredpersonsHTML = `
    <div class="text-center m-2 p-2 display-6">
    <button type="button" class="btn btn-primary" id="exit">EXIT</button>
    </div>
    ` */
    document.getElementById('exitBTN').innerHTML = "<div class='text-center m-2 p-2'><button type='button' class='btn btn-primary' id='exit'>EXIT</button></div>"
    $('#exit').on('click', function () {
        window.location.href = "/"
    })
    for (person of registeredpersons) {
        registeredpersonsHTML += `
    <section class="mx-auto my-5" style="max-width: auto;">
    <div class="card" style="max-width: auto; min-height: 21rem;">
    <div class="card-body d-flex flex-row">
    <img src="${person.picture}" class="rounded-circle me-3" height="50px" width="50px" alt="avatar" />
    <div class="${person.isactive == '1' ? 'text-bg-success' : 'text-bg-danger'} p-3">
    <h5 class="card-title font-weight-bold mb-2">${person.fullname.title} ${person.fullname.firstname} ${person.fullname.lastname}</h5>
    <p class="card-text"><i class="bi bi-envelope"></i> ${person.email}</p>
    </div>
    </div>
    <div class="card-body">
    Gender: ${person.gender}<br>
    Mongo ID: ${person._id}<br>
    Phone: ${person.phone}<br>
    Salary: ${person.salary}<br>
    Work status: ${person.isactive == '1' ? 'active' : 'passive'}<br>
    Company ID: ${person.id}<br>
    <div class="d-flex justify-content-around">

    <button class='btn bg-danger p-2 mt-2 delItem' id=${person._id}><i class="bi bi-person-x"> DEL </i></button>

    <button class='btn bg-primary p-2 mt-2 editItem' id=${person._id}><i class="bi bi-pen-fill"> EDIT </i></button>
    </div>
    
    </div>
    </div>
    </section>
    `
    }
    document.getElementById('personsCard').innerHTML = registeredpersonsHTML
    $('.delItem').on('click', function () {
        console.log('DELETE: ', this.id)
        let _id = this.id
        renderPersonDeleteModal(_id)
        $('#messageModalDELETE').on('click', ()=> {
            console.log('messageModalDELETE uzeni ok')
            console.log('DELETE: (messageModalDELETE)', _id, this.id )
            delItemData(this.id)
        })
        
        async function delItemData(id) {
            //console.log('***************************', `/registeredpersons/delete/${id}`)
            var response = await fetch(`/registeredpersons/delete/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                    "Token": token,
                },

            })
            deleteRespone = await response.json()
            console.log('deleteRespone --------------- ', deleteRespone)
            if (deleteRespone.deletedCount == 1) {
                console.log('SIKER 😛')
                registeredpersonsHTML = ''
                viewpersonCards()//INFO:TODO:INFO://INFO:TODO:INFO:
            }
        }
    })
    $('.editItem').on('click', function () {
        console.log('EDIT: ', this.id)
        let _id = this.id
        let editPerson = new Person
        for(person of registeredpersons) {
            if(person._id == _id) {
                editPerson._id = person._id
                editPerson.id = person.id
                editPerson.gender = person.gender
                editPerson.title = person.fullname.title
                editPerson.firstname = person.fullname.firstname
                editPerson.lastname = person.fullname.lastname
                editPerson.phone = person.phone
                editPerson.email = person.email
                editPerson.picture = person.picture
                editPerson.salary = person.salary
                editPerson.isactive = person.isactive
            }
        }
        renderPersonEditModal(_id, editPerson)
        $('#messageModalSAVE').on('click', ()=> {
            console.log('messageModalSAVE uzeni ok')
            console.log('SAVE: (messageModalSAVE) => go UPDATE function', _id, this.id )
            //INFO:TODO:INFO: UPDATE function

            //createEditPersonDATA(editPerson)//INFO:TODO:INFO://INFO:TODO:INFO:
//BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:
//BUG:updateItemData(_id, createEditPersonDATA(editPerson))                       BUG:
//BUG:elooaalliitom a real szerkezetet, de maar koraabban a sima obcecttet        BUG:
//BUG: kuuldtem 😛fullname.😋 neelkuul                                           BUG:
//BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:BUG:
            updateItemData(_id, createEditPersonDATA(editPerson))
            //INFO:TODO:INFO: UPDATE function
            async function updateItemData(_id, sendEditPersonDATA) {
                //console.log('***************************', `/registeredpersons/delete/${id}`)
                console.log('taaaaarolaaaas eloooot: ',_id,sendEditPersonDATA)
                var response = await fetch(`/registeredpersons/${_id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-type": "application/json",
                        "Token": token,
                    },
                    body: JSON.stringify(
                        sendEditPersonDATA
                    ),
                })
                updateResponse = await response.json()
                console.log('updateResponse --------------- ', updateResponse)
                //console.log('SIKER 😛😛😛😛')
                if (updateResponse.modifiedCount >= 1) {
                    console.log('SIKER 😛😛😛😛😛😛')
                    registeredpersonsHTML = ''
                    viewpersonCards()//INFO:TODO:INFO://INFO:TODO:INFO:
                }
            }
        })
         
    })
}

function renderPersonDeleteModal(_id) {
    $("#personModal").modal('show')
    personModalRESET()
    document.getElementById('modalMessageHEAD').innerHTML = `_id: ${_id}`
    document.getElementById('modalMessageBODY').innerHTML = '<h2>Biztos, hogy töröljem a fenti ID-t?</h2>'
    document.getElementById('modalMessageFOOTER').innerHTML = `
    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" id="messageModalDELETE">DELETE</button>
    `

}

function renderPersonEditModal(_id, getPerson ){
    $("#personModal").modal('show')
    personModalRESET()
    console.table(getPerson)
    console.log(getPerson)
    document.getElementById('modalMessageHEAD').innerHTML = `_id: ${_id}`
    document.getElementById('modalMessageBODY').innerHTML = createForm(getPerson)
    document.getElementById('modalMessageFOOTER').innerHTML = `
    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" id="messageModalSAVE">SAVE</button>
    `
    document.getElementById('gender').value = getPerson.gender
    document.getElementById('isactive').value = (getPerson.isactive == '1' ? '1' : '0')
    console.log('getperson.gender*****************************',getPerson.isactive,)
    /* document.getElementById('modalMessageBODY').innerHTML = `
    ${getPerson._id}, 
    ${getPerson.id}, 
    ${getPerson.gender}
    ${getPerson.gender}
    ` */
    //document.getElementById('modalMessageFOOTER').innerHTML = 'footer...'
}

//getData()
//INFO:TODO:INFO: only for server client communication
//INFO:TODO:INFO: https://stackoverflow.com/questions/49902417/how-to-catch-401-error-using-fetch-method-of-javascript
async function getData() {
    var response = await fetch("/administrators", {
        headers: {
            "Token": token,
        },
    })
        .then(console.log('Hmmmmmmmmm.......... 01'))
        .then(console.log('Hmmmmmmmmm.......... 02'))
        .catch(function (error) {
            console.log('...haaaaaaat ez nem jott ossze. 😛')
            console.log(error)
        })
    administrators = await response.json()
    console.table(administrators)
    administratorLoginHTML = `<dt>${administrators[0].fullname.firstname} ${administrators[0].fullname.lastname}</dt>
    <dd>${administrators[0].email}</dd>`
    document.getElementById('administratorLogin').innerHTML = administratorLoginHTML
    administratorTokenHTML = `<dt>Token</dt>
    <dd>${administrators[0].token}</dd>`
    document.getElementById('token').innerHTML = administratorTokenHTML
}

class Person {
    constructor(_id, id, gender, title, firstname, lastname, phone, email, salary, picture, isactive) {
      this._id = _id
      this.id = id
      this.gender = gender
      this.title = title
      this.firstname = firstname
      this.lastname = lastname
      this.phone = phone
      this.email = email
      this.salary = salary
      this.picture = picture
      this.isactive = isactive
    }

    zeroPersonObject() {
        let data ={
            _id: '',
            id:'',
            gender: '',
            
                title: '',
                firstname: '',
                lastname: '',
           
            phone: '',
            email: '',
            salary: '',
            picture: '',
            isactive: ''
        }
        return data
    }

    createPersonObject() {
        let data ={
            _id: this._id,
            id:this.id,
            gender: this.gender,
            fullname: {
                title: this.title,
                firstname: this.firstname,
                lastname: this.lastname
            },
            phone: this.phone,
            email: this.email,
            salary: this.salary,
            picture: this.picture,
            isactive: this.isactive
        }
        return data
      }
  }

function createForm(person) {
    formHTML = `
    <form class="was-validated row">
    <div class="mb-3 mt-3 col-md-2">
        <label for="id" class="form-label">Id:</label>
        <input type="text" class="form-control" id="id" placeholder="Id" name="id" required value=${person.id}>
        <div class="valid-feedback">Valid.</div>
        <div class="invalid-feedback">Please fill out this field.</div>
    </div>
    <div class="mb-3 mt-3 col-md-3">
    <label for="title" class="form-label">Title:</label>
    <input type="text" class="form-control" id="title" placeholder="title" name="title" value=${person.title}>
    </div>
    <div class="row">
    <div class="mb-3 mt-3 col-md-6">
        <label for="firstname" class="form-label">Firstname:</label>
        <input type="text" class="form-control" id="firstname" placeholder="firstname" name="firstname" required value=${person.firstname}>
        <div class="valid-feedback">Valid.</div>
        <div class="invalid-feedback">Please fill out this field.</div>
    </div>
    <div class="mb-3 mt-3 col-md-6">
        <label for="lastname" class="form-label">Lastname:</label>
        <input type="text" class="form-control" id="lastname" placeholder="lastname" name="lastname" required value=${person.lastname}>
        <div class="valid-feedback">Valid.</div>
        <div class="invalid-feedback">Please fill out this field.</div>
    </div>
    </div>
    <div class="mb-3 mt-3 col-md-3">
    <label for="gender" class="form-label">Gender:</label>
    <select class="form-control" name="gender" id="gender" >
        <option value="male">male</option>
        <option value="female">female</option>
    </select>
    </div>
    <div class="mb-3 mt-3 col-md-2">
    <label for="isactive" class="form-label">isactive:</label>
        <select class="form-control" id="isactive">
            <option value="1">active</option>
            <option value="0">passive</option>
        </select>
    </div>
    <div class="mb-3 mt-3 col-md-6">
        <label for="phone" class="form-label">Phone:</label>
        <input type="text" class="form-control" id="phone" placeholder="phone" name="phone" value="${person.phone}">
    </div>
    <div class="mb-3 mt-3 col-md-6">
        <label for="email" class="form-label">Email:</label>
        <input type="text" class="form-control" id="email" placeholder="email" name="email" required value=${person.email}>
        <div class="valid-feedback">Valid.</div>
        <div class="invalid-feedback">Please fill out this field.</div>
    </div>
    <div class="mb-3 mt-3 col-md-4">
        <label for="salary" class="form-label">Salary:</label>
        <input type="number" class="form-control" id="salary" placeholder="salary" name="salary" value=${person.salary}>
    </div>
    <div class="mb-3 mt-3 col-md-12">
        <label for="picture" class="form-label">Picture:</label>
        <input type="text" class="form-control" id="picture" placeholder="picture" name="picture" value=${person.picture}>
    </div>
    
    </form>
    `
    /* <button type="button" class="btn btn-primary">Save</button> */
    
    return formHTML
}

function personModalRESET() {
    document.getElementById('modalMessageHEAD').innerHTML = ''
    document.getElementById('modalMessageBODY').innerHTML =''
    document.getElementById('modalMessageFOOTER').innerHTML =''
}

function createEditPersonDATA(editPerson) {
    let tempSendEditPersonDATA = new Person
                
                tempSendEditPersonDATA._id = editPerson._id
                tempSendEditPersonDATA.id = document.getElementById('id').value
                tempSendEditPersonDATA.gender = document.getElementById('gender').value
                tempSendEditPersonDATA.title = document.getElementById('title').value
                tempSendEditPersonDATA.firstname = document.getElementById('firstname').value
                tempSendEditPersonDATA.lastname = document.getElementById('lastname').value
                tempSendEditPersonDATA.phone = document.getElementById('phone').value
                tempSendEditPersonDATA.email = document.getElementById('email').value
                tempSendEditPersonDATA.picture = document.getElementById('picture').value
                tempSendEditPersonDATA.salary = parseInt(document.getElementById('salary').value)
                tempSendEditPersonDATA.isactive = document.getElementById('isactive').value
    
    console.log(editPerson)
    console.log(tempSendEditPersonDATA)
    console.log(tempSendEditPersonDATA.createPersonObject())
    return tempSendEditPersonDATA
    //return tempSendEditPersonDATA.createPersonObject()//BUG: leiiraas fent
    
}

/* 
<label for="gender" class="form-label">Gender:</label>
        <input type="text" class="form-control" id="gender" placeholder="gender" name="gender" value=${person.gender}>
        <div class="valid-feedback">Valid.</div>
        <div class="invalid-feedback">Please fill out this field.</div>

<label for="isactive" class="form-label">isactive:</label>
        <input type="text" class="form-control" id="isactive" placeholder="isactive" name="isactive" required value=${person.isactive}>
        <div class="valid-feedback">Valid.</div>
        <div class="invalid-feedback">Please fill out this field.</div>
*/
/* 
{
            id: data.id,
            gender: data.gender,
            fullname: {
                title: data.title,
                firstname: data.firstname,
                lastname: data.lastname,
            },
            phone: data.phone,
            email: data.email,
            salary: data.salary,
            picture: data.picture,
            isactive: data.isactive
        }
*/

/* "Content-type": "application/json",
            "Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MDEyMTAiLCJuYW1lIjoiVGlib3IgVmVnaCIsImlhdCI6MjIxNjIzOTAyMn0.RwLeuxOMyByo5tHLY-Pk1VKCoVUJfUp1yRHqt4Xj6Dw", */
            
        //document.getElementById('loginBlock').style.visibility = "hidden"
        //document.getElementById('loginBlock').style.visibility = "visible"
        //document.getElementById('tiger').style.visibility = "hidden"
        //document.getElementById('tiger').style.visibility = "visible"
        //document.getElementById('insideTOP').innerHTML = "<h1>Hello login TOP!</h1>"
        //document.getElementById('insideBOTTOM').innerHTML = "<h1>Hello login BOTTOM!</h1>"
