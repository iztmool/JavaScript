var firebaseConfig = {
    apiKey: "AIzaSyCrbxNfjet0OM2zsLwGWW5PSXGRWhNB-Gw",
    authDomain: "practica-1-javascript-firebase.firebaseapp.com",
    databaseURL: "https://practica-1-javascript-firebase.firebaseio.com",
    projectId: "practica-1-javascript-firebase",
    storageBucket: "practica-1-javascript-firebase.appspot.com",
    messagingSenderId: "119455403765",
    appId: "1:119455403765:web:a4dae7d3e2c3a4264effbc",
    measurementId: "G-DRT9TD93LL"
    .
    .
    .
    measurementId:
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


function resetFields(){
    document.getElementById("Input1").value='';
    document.getElementById("Input2").value='';
    document.getElementById("Input3").value='';
    document.getElementById("Input4").value='selecciona';
}
function createR() {
    document.getElementById("Input1").disabled = false;
    //Guardo los datos capturados usando el id de cada control
    var id = document.getElementById("Input1").value;
    var nombre = document.getElementById("Input2").value;
    var correo = document.getElementById("Input3").value;
    var carrera = document.getElementById("Input4").value;

    //validaciones
    if (id.length > 0) {
        //creo un objeto que guarda los datos
        var Modelo = {
            id, //marca:id
            nombre,
            correo,
            marca,
        }

        //console.log(alumno);

        firebase.database().ref('Modelo/' + id).update(Modelo).then(() => {
           resetFields();
        }).then(()=>{
           read();
        });

        swal("Listo!", "Agregado correctamente", "success");

        
    } 
    else {
        swal("Error", "Llena todos los campos","warning");
    }

    document.getElementById("Input1").disabled = false;
        //firebase.database().ref('users/' + userId).set({
    //    username: name,
    //    email: email,
    //    profile_picture : imageUrl
    //  });
    //https://firebase.google.com/docs/database/web/read-and-write?hl=es

  
    //Esto se usa cuando no tienen un id/matricula y Firebase les genera una
    //automaticamente
    //const key = firebase.database().ref().child('Modelos').push().key;
    //data[`Modelos/${key}`]= Modelo;
    //firebase.database().ref().update(data).then(()=>{
    //  alert('Agregado exitosamente');
    //})
}

function read(){
    document.getElementById("Table1").innerHTML='';

    var ref = firebase.database().ref('Modelos');
/**   
   ref.on('value', function(snapshot) {
        snapshot.forEach(row=>{
            printRow(row.val());
        })
    });
 */
   
    ref.on("child_added", function(snapshot) {
        printRow(snapshot.val());
    });

}

function printRow(Modelo){
    
    if(Modelo!=null){
        var table = document.getElementById("Table1"); 

        //creamos un nuevo elemento en la tabla en la ultima posicion
        var row = table.insertRow(-1);

        //Insertamos cada una de las celdas/columnas del registro
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        
        //Agregamos la informacion a cada una de las columnas del registro
        cell1.innerHTML = Modelo.id;
        cell2.innerHTML = Modelo.nombre; 
        cell3.innerHTML = Modelo.correo;
        cell4.innerHTML = Modelo.Marca; 
        cell5.innerHTML = `<button type="button" class="btn btn-danger" onClick="deleteR(${Modelo.id})">Eliminar</button>`;
        cell6.innerHTML = '<button type="button" class="btn btn-success" onClick="seekR('+Modelo.id+')">Modificar</button>';
    }
}

function deleteR(id){
    firebase.database().ref('Modelos/' + id).set(null).then(() => {
      read();
    }).then(()=>{
       swal("Listo!", "Eliminado correctamente", "success");
    });
}

function seekR(id){
    var ref = firebase.database().ref('Modelos/' + id);
    ref.on('value', function(snapshot) {
      updateR(snapshot.val());
    });
}

function updateR(Modelo){
    if(Modelo!=null)
    {
        document.getElementById("Input1").value=Modelo.id;
        document.getElementById("Input1").disabled = true;
        document.getElementById("Input2").value=Modelos.nombre;
        document.getElementById("Input3").value=Modelos.correo;
        document.getElementById("Input4").value=Modelos.Marca;
    }
}


//Para consulta de carrera
function readQ(){
    document.getElementById("Table2").innerHTML='';
    var c = document.getElementById("Input5").value;

    var ref = firebase.database().ref("Modelos");
    ref.orderByChild("Marca").equalTo(c).on("child_added", function(snapshot) {
        printRowQ(snapshot.val());
    });

}


function printRowQ(Marca){

    var table = document.getElementById("Table2"); 
    
    //creamos un nuevo elemento en la tabla en la ultima posicion
    var row = table.insertRow(-1);

    //Insertamos cada una de las celdas/columnas del registro
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    
    //Agregamos la informacion a cada una de las columnas del registro
    cell1.innerHTML = Marca.id;
    cell2.innerHTML = Marca.nombre; 
    cell3.innerHTML = alumno.correo;
    cell4.innerHTML = Marca.Modelo; 
   
}