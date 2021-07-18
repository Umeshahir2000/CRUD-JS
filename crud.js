
document.getElementById("save").addEventListener("click", displayTable);

function displayTable() {
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var number = document.getElementById("number").value;

    //hobbies checkbox value get
    var hobbies = [];
    var hobbies1 = document.getElementsByName('hobbies');
    for (var y = 0; y < hobbies1.length; y++) {
        if (hobbies1[y].checked)
            hobbies.push(hobbies1[y].value);
    };

    //gender radio button value get
    var gender1 = document.getElementsByName('gender');
    var gender = [];
    for (var y = 0; y < gender1.length; y++) {
        if (gender1[y].checked)
            gender.push(gender1[y].value)
    };
    createUser(name, age, number, hobbies , gender);
};

//Create User
var users = [];
function createUser(name, age, number, hobbies, gender) {
    var user = {
        name: name,
        age: age,
        number: number,
        hobbies: hobbies,
        gender: gender
    }

    // if condition apply only then insert data
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var number = document.getElementById("number").value;
    var hobbies1 = document.getElementsByName('hobbies');
    var hobbies = [];
    for (var y = 0; y < hobbies1.length; y++) {
        if (hobbies1[y].checked)
            hobbies.push(hobbies1[y].value);
    };

    var index = document.getElementById("index").value;

    if (!name.match(/^[A-Za-z\s]*$/) || !number.match(/^\d{10}$/) || age < 18 || age > 100 || (hobbies.length) < 2) {

    } else {                                      //insert
        if (index == "" || index == undefined) {
            users.push(user);
        } else {                                  //Update
            users.splice(index, 1, user);
            document.getElementById("save").innerText = "Save";
            document.getElementById("index").value = "";
        }

    }
    readUser();
    document.getElementById("form").reset();
}

// Read

function readUser() {
    var user = document.getElementById('table');
    user.innerHTML = `<table class="table table-responsive-sm mt-3" id="table1">
    <thead class="thead">
        <tr class="text-uppercase">
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Age</th>
            <th scope="col">Mobile no.</th>
            <th scope="col">Hobbies</th>
            <th scope="col">Gender</th>
            <th scope="col">Action</th>
        </tr>
    </thead>
    </table>`;

    for (var i = 0; i < users.length; i++) {
        user.innerHTML += `
         <tbody>
        <tr>
            <td>${i + 1}</td>
            <td >
                <div >${users[i].name}</div>
            </td>
            <td>
                <div>${users[i].age}</div>
            </td>
            <td>
                <div>${users[i].number}</div>
            </td>
            <td>
                <div>${(users[i].hobbies)}</div>
            </td>
            <td>
                <div>${users[i].gender}</div>
            </td>
            <td><button type="button" class="btn border-primary" onclick="confirmation('${i}')">Delete</button>
                <button type="button" class="btn border-primary" data-bs-toggle="modal"
                data-bs-target="#exampleModal" id="edit" onclick="editUser('${i}')"> Edit</button>
            </td>
            </tbody>`
    }

}

//Delete confirmation
function confirmation(i) {
    var r = confirm('Are you sure you want to delete this item?');
    if (r == true) {
        deleteUser(i)
    }
}
//Delete
function deleteUser(i) {
    users.splice(i, 1);
    readUser();
}

// Edit 

function editUser(i) {
    readUser(i);
    document.getElementById("name").value = users[i].name;
    document.getElementById("age").value = users[i].age;
    document.getElementById("number").value = users[i].number;
    document.getElementById("index").value = i;
    document.getElementById("save").innerText = "Update"
    isCheckedHobbies(i);
    isCheckedGender(i);
   
}
//Hobbies Update
function isCheckedHobbies(i) {
    hitem = ["Music","Dance","Game","Travelling"];
    var hcheck = users[i].hobbies;

    hitem.map(item =>{
        hcheck.map(element => {
            if (element === item) {
                document.getElementById(item).checked = true;
            }
        });
    })
    
}
//Gender Update
function isCheckedGender(i){
    var gcheck = users[i].gender;
    gcheck.map(element => {
        if(element === "Male"){
            document.getElementById("Male").checked = true;
        }else{
            document.getElementById("Female").checked = true;
        }
    })
}

//Name Validation
function namefunc() {
    var name = document.getElementById("name").value;
    const nameerror = document.getElementById("nameError");

    let errorname = [];
    if (!name.match(/^[A-Za-z\s]*$/)) {
        errorname.push('Name must be alphabet');
    }
    if (name == "") {
        errorname.push('Please insert name');
    }
    nameerror.innerHTML = errorname;

}

//Age Validation
function agefunc() {
    var age = document.getElementById("age").value;
    const ageerror = document.getElementById("ageError");

    let errorage = []
    if (age < 18 || age > 100) {
        errorage.push('Age must be 18 to 100');
    }
    ageerror.innerHTML = errorage;
}

//Mobile Number Validation
function numberfunc() {
    var number = document.getElementById("number").value;
    const numbererror = document.getElementById("numberError");

    let errornumber = []
    if (!number.match(/^\d{10}$/)) {
        errornumber.push('Mobile no. must be 10 digits');
    }
    numbererror.innerHTML = errornumber;

}

//Hobbies Validation
function checkfunc() {
    var hobbies1 = document.getElementsByName('hobbies');
    var hobbies = [];
    for (var y = 0; y < hobbies1.length; y++) {
        if (hobbies1[y].checked)
            hobbies.push(hobbies1[y].value);
    }
    const hobbieserror = document.getElementById("hobbiesError");
    let errorhobbies = []

    if ((hobbies.length) < 2) {
        errorhobbies.push("Minimum two hobbies required");
    }
    hobbieserror.innerHTML = errorhobbies;
}