const fs = require('fs');
const colors = require('colors');

// Las notas se almacenarán en un array
let listado_por_hacer = [];

// Funcion que crea la tarea y la mete en el array. Completado estará a false porque estará pendiente al crearse.
const crear = (descripcion) => {

    cargarDB(); // Se recupera el json en listado_por_hacer

    let porHacer = {
        descripcion,
        completado: false
    }

    listado_por_hacer.push(porHacer);
    guardarDB();

    return porHacer;

};

const guardarDB = () => {
    let dataToSave = JSON.stringify(listado_por_hacer); // Se convierte a JSON

    fs.writeFile('db/data.json', dataToSave, (err) => {
        if (err) throw new Error('No se pudo guardar en DB', err);

    });
}

const cargarDB = () => {

    try {
        listado_por_hacer = require('../db/data.json'); // Cargamos todo el JSON o DB
    } catch (error) {
        // Si el fichero JSON está vacío, se captura la excepcion y se crea un array vacio.
        listado_por_hacer = [];
    }


}

const getListado = () => {

    cargarDB();

    for (let tarea of listado_por_hacer) {
        console.log('=========== Por hacer ============'.green);
        console.log(tarea.descripcion.red);
        console.log(`Estado: ` + `${tarea.completado}`.yellow);
        console.log('=================================='.green);
    }

}

const updateTask = (tarea, completado) => {

    cargarDB();

    let listado = listado_por_hacer;
    let numTasks = 0;
    let i = 0;
    for (let task of listado) {
        if (task.descripcion === tarea) {
            listado_por_hacer[i].completado = completado;
            numTasks++;
        }
        i++;
    }

    if (numTasks > 0) {
        guardarDB();
        console.log(`Se han actualizado ${numTasks} tareas`);
    } else {
        console.log(`NO se ha encontrado ninguna tarea '${tarea}' para actualizar`);
    }
}

// const deleteTask = (descripcion) => {

//     cargarDB();

//     let index = listado_por_hacer.findIndex(tarea => {
//         return tarea.descripcion === descripcion;
//     });

//     if (index >= 0) {
//         listado_por_hacer.splice(index, 1);
//         guardarDB();
//         return true;
//     } else {
//         return false;
//     }
// }

const deleteTask = (descripcion) => {

    cargarDB();

    let nuevoListado = listado_por_hacer.filter(tarea => tarea.descripcion !== descripcion);

    if (nuevoListado.length === listado_por_hacer.length) {
        return false;
    } else {
        listado_por_hacer = nuevoListado;
        guardarDB();
        return true;
    }
}

module.exports = {
    crear,
    guardarDB,
    getListado,
    updateTask,
    deleteTask
}