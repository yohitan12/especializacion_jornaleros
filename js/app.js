var bdJornaleros = JSON.parse(localStorage.getItem('bdJornaleros'));

//Condicional ternario ? significa si
//                     : significa sino 

//Investigar el error del condicional ternario en
// bdJornaleros === null ? [] : bdJornaleros;

if (bdJornaleros === null) {
    bdJornaleros = [];
}

$(document).ready(function () {

    listar();

    $('#formJornaleros').on('submit', function (event) {
        event.preventDefault();

        guardar();
        listar();
    });

});


function guardar() {

    var jornalero = {};
    jornalero.codigo = new Date().getTime();
    jornalero.nombre = document.getElementById('txtNombre').value;
    jornalero.correoElectronico = $('#txtCorreoElectronico').val();
    jornalero.fechaNacimiento = $('#txtFechaNacimiento').val();
    jornalero.peso = $('#txtPeso').val();

    bdJornaleros.push(jornalero);

    console.log(bdJornaleros);

    var bdJornalerosString = JSON.stringify(bdJornaleros);

    console.log(bdJornalerosString);

    localStorage.setItem('bdJornaleros', bdJornalerosString);

    limpiar();

    alertify.success('Jornalero guardado exitosamente.');
}

function listar() {

    $('#tblJornaleros tbody').empty();

    if (bdJornaleros.length !== 0) {

        var template = '';

        //Foreach
        for (var i in bdJornaleros) {
            var jornalero = bdJornaleros[i];

            template += `<tr>
            <th class="text-center" scope="row">${jornalero.codigo}</th>
            <td>${jornalero.nombre}</td>
            <td>${jornalero.correoElectronico}</td>
            <td>${jornalero.fechaNacimiento}</td>
            <td>${jornalero.peso}Kg</td>
            <td>
                <button class="btn btn-primary" onclick='modificar(${jornalero.codigo})'>
                    <i class="fa fa-edit"></i>
                    Editar
                </button>

                <button class="btn btn-danger btn-eliminar" id="${jornalero.codigo}">
                    <i class="fa fa-trash-alt"></i>
                    Eliminar
                </button>
            </td>
        </tr>`;
        }

        //document.getElementById('tblJornaleros').tBodies[0].innerHTML = template;
        $('#tblJornaleros tbody').append(template);

        $('.btn-eliminar').on('click', function () {

            var codigoJornalero = $(this).attr('id');
            alertify.confirm(
                'Mensaje de alerta',
                `¿En verdad deseas eliminar el elemento: ${codigoJornalero}?`,
                function () {
                    console.log('ok');
                    eliminar(codigoJornalero);
                },
                function () {
                    console.log('cancelar');
                }).set('labels', {
                ok: 'Confirmar',
                cancel: 'Cancelar'
            });
    
        });

    } else {
        $('#tblJornaleros tbody').append('<tr> <td colspan="6"> No se encuentran datos para mostrar </td> </tr>');
    }

}

function limpiar() {
    $('#formJornaleros')[0].reset();
}

function modificar(codigoJornalero) {

    var jornalero = bdJornaleros.filter(function(jornalero, index){
        return jornalero.codigo == codigoJornalero;
    })[0];

    $('#txtNombre').val(jornalero.nombre);
    $('#txtCorreoElectronico').val(jornalero.correoElectronico);
    $('#txtFechaNacimiento').val(jornalero.fechaNacimiento);
    $('#txtPeso').val(jornalero.peso);
}

function eliminar(codigoJornalero){
    bdJornaleros = bdJornaleros.filter(function(jornalero, index){
        return jornalero.codigo != codigoJornalero;
    });
    var bdJornalerosString = JSON.stringify(bdJornaleros);
    localStorage.setItem('bdJornaleros', bdJornalerosString);
    listar();
}