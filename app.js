//variables
const form = document.querySelector(".form");
const caja2 = document.querySelector(".caja2");
const tableInsert = document.querySelector(".tableInsert");
const table = document.querySelector(".tablemain");
const total = document.querySelector("#total");
const completas = document.querySelector("#completas");
const incompletas = document.querySelector("#incompletas");
const dia = document.querySelector("#dia");
let listTask = [];

//eventos
eventos();
function eventos(){
    form.addEventListener("submit", validarForm);
    table.addEventListener("click", modificar);
    mostrarHora = addEventListener( 'DOMContentLoaded', mostrarHora )
}

//funciones
function validarForm(e){
    e.preventDefault();
    //llamando valor del input
    const tarea = document.querySelector('.tarea').value;
    
    //condicionando
    if( !tarea.trim() ){
        mostrarError("la tarea esta vacía")
        return;
    }
    
    //creando el objeto tarea
    objTask = {
        id: Date.now(),
        tarea,
        estate: false
    }

    //agregando el objeto al array de tareas
    listTask = [...listTask, objTask]
    whatchHTML();
    form.reset();


}

function mostrarError(mensaje){
    
    verError = document.querySelector(".error");
    if(!verError){
        const error = document.createElement("p");
        error.textContent = mensaje;
        error.className = 'text-center text-danger p-2 border border-danger error'
        caja2.appendChild(error)

        setTimeout( ()=>{
            error.remove();
        },2000 )
    }
    
}

function whatchHTML(){
    limpiarHTML();
    listTask.forEach( (item, index) => {
        //desestructuracicón
        const {id, tarea, state} = item
        //creando la fila
        const row = document.createElement('tr');
        row.innerHTML = `
        <th scope="row">${index + 1}</th>
        <td class="d-flex justify-content-between">
            <span class="text-secondary">${tarea}</span>
            <div>
                <button class="btn btn-sm btn-danger eliminar" data-id="${id}">
                    <i class="fa-solid fa-square-xmark eliminar" data-id="${id}"></i>
                </button>
                <button class="btn btn-sm btn-success editar" data-id="${id}">
                    <i class="fa-solid fa-check"></i>
                </button>              
            </div>
        </td>
        `
        tableInsert.appendChild(row);
    } )
    verDatos();
}

function limpiarHTML(){
    while(tableInsert.firstChild){
        tableInsert.removeChild(tableInsert.firstChild);
    }
}

function modificar(e){
    const taskDelete = Number(e.target.getAttribute("data-id"));

    if(e.target.classList.contains("eliminar")){
       //filtar
       listTask = listTask.filter( (item) => item.id !== taskDelete  );
       whatchHTML();
    }else if(e.target.classList.contains("editar")){
       const taskEdit = e.target
       //cambiar el boton
       taskEdit.children[0].classList.toggle("fa-check");
       taskEdit.children[0].classList.toggle("fa-check-double");
       //cambiar el texto
       texto = taskEdit.parentElement.parentElement.children[0].classList.toggle("text-secondary")
       texto = taskEdit.parentElement.parentElement.children[0].classList.toggle("text-decoration-underline");

       let verificar = listTask.some( item => item.id === taskDelete )
    if(verificar){
        listTask = listTask.map( item => {
            if(item.id === taskDelete){
                item.estate = !item.estate
                return item
            }else{
                return item
            }
        } )
        listTask = [...listTask];
    }
    }
    verDatos();
}


function verDatos(){
    //total tareas
    totaltask = listTask.length
    total.textContent = totaltask

    //total completas
    let completadasTask = 0;
    listTask.forEach( item => {
        if(item.estate == true){
            completadasTask += 1
        }
        completas.textContent = completadasTask
    } )
        //total incompletas
        let incompletasTask = 0;
        listTask.forEach( item => {
            if(item.estate == false){
                incompletasTask += 1
            }
            incompletas.textContent = incompletasTask
        } )
}

//fecha
function mostrarHora(){
    
        moment.locale('es');
        diaHoy = moment().format('dddd')
        dia.textContent += diaHoy;    
}
