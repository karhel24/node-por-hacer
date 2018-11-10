const argv = require('./config/yargs').argv;
const porHacer = require('./por-hacer/por-hacer');

let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;

    case 'listar':
        porHacer.getListado();
        break;

    case 'actualizar':
        porHacer.updateTask(argv.descripcion, argv.completado);
        break;

    case 'borrar':
        let res = porHacer.deleteTask(argv.descripcion);
        console.log(`Borrado ${res}`);
        break;

    default:
        console.log('El comando no es reconocido!');
        break;
}