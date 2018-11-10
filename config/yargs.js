const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'Descripción de la tarea por hacer.'
}

const completado = {
    default: true,
    alias: 'c',
    desc: 'Indica si la tarea ha sido completada.'
}


const opt_crear = {
    descripcion
}

const opt_actualizar = {
    descripcion,
    completado
}

const opt_borrar = {
    descripcion
}

const argv = require('yargs')
    .command('crear', 'Crear un elemento por hacer', opt_crear)
    .command('actualizar', 'Actualiza el estado completado de una tarea', opt_actualizar)
    .command('listar', 'Lista el listado de tareas.', {})
    .command('borrar', 'Borrar una tarea de la lista', opt_borrar)
    .help()
    .argv;


module.exports = {
    argv
}