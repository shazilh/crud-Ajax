var api = {
  url: 'https://lab-api-test.herokuapp.com/tasks/'
};

var $tasksList = $("#tasks-list");


var cargarPagina = function () {
  cargarTareas();
  $("#add-form").submit(agregarTarea);
  $(document).on("click",".eliminar", borrarTarea);
  $(document).on("click", ".editar",editarTarea);
    
};

var cargarTareas = function () {
  $.getJSON(api.url, function (tareas) {
      $tasksList.html("");
    tareas.forEach(crearTarea);
  });
}
            
var crearTarea = function (tarea) {
    var nombre = tarea.name;
    var estado = tarea.status[0];
    var identificador = tarea._id;
   
    remplazar(nombre,estado,identificador);
    }
    var plantillaBd='<tr class=" ">' +
                '<td>__nombre__</td>' +
                '<td>__estado__</td>' +
                '<td>'+
                    '<span class="glyphicon glyphicon-search editar"></span>'+
                    '<span class="glyphicon glyphicon-pencil"></span>'+
                    '<span class="glyphicon glyphicon-remove-circle eliminar" data-id="__identificador__"></span>' +
                    '</td>'+
                    '</tr>';
    
    var remplazar = function(nombre,estado,identificador){
       var presentar = plantillaBd.replace('__nombre__',nombre).replace('__estado__',estado).replace('__identificador__',identificador);
       $tasksList.append(presentar);
       //console.log(presentar);
    }

var agregarTarea = function (e) {
  e.preventDefault();
  var nombre = $("#nombre-tarea").val();
  $.post(api.url, {
    name: nombre
  }, function (tarea) {
    crearTarea(tarea);
    $("#myModal").modal("hide");
      crearTarea(response)
      $nombre.val("");
  });
};

/*var borrarTarea = function(){   //Con esta funcion se borra del DOM pero no de la base de datos.  
    var $elementoPapa=$(this).parents("tr");
   $elementoPapa.remove();
}*/
var borrarTarea = function(e) {
    var id = $(e.target).data('id');   //En lugar de this poner e.target
    console.log(id);
    jQuery.ajax({
        url: api.url + id,
        type: 'DELETE',
        success: function(data) {
            cargarTareas();
    }
    });
}


$(document).ready(cargarPagina);