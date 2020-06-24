var arregloPines = [];
//var db = openDatabase("proyecto","1.0","Example", 2 * 1024 * 1024);
function consultar(){
    nombre = $('#txtNombre').val();
    alert(nombre);
    var pin;
    var API_KEY = 'c39909d053b8a6c54dffd28ba28c8258';
    var dir = "http://api.openweathermap.org/data/2.5/weather?q="+encodeURIComponent(nombre)+"&appid="+API_KEY;
    
    $.ajax({
        url:dir,
        error:function(err){
            alert("No hay coincidencias");
            console.log(err);
        },
        beforeSend:function(){
            $("#divCargando").show();            
        }
    }).done(function(data){
        
        $("#divCargando").hide();
        console.log('Iniciar la busqueda');
        const api = new XMLHttpRequest();
        api.open('GET', dir, true)
        api.send();    
        api.onreadystatechange = function(){
            if(this.readyState == 4 && this.status==200){
                let datos = JSON.parse(this.responseText);
                console.log(datos.name);                
                $('#coord').html(" "+datos.coord.lon+" , "+datos.coord.lat);
                for(let item of datos.weather){
                    $('#weather').html(" "+item.description);                                
                }                
                $('#temp').html(" "+datos.main.temp);
                $('#wind').html(" "+datos.wind.speed+" m/s");
                pin = new google.maps.Marker({
                    position: new google.maps.LatLng(datos.coord.lat,datos.coord.lon),
                    map: map
                });
                arregloPines.push(pin);                  
            }            
        }        
    });
       
}

function cargarMapa(){

    var myOptions = {
        zoom:7,
        center: new google.maps.LatLng(-1.831239,-78.183406),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };  
    map = new google.maps.Map(document.getElementById('map'), myOptions)
    //pin.setMap(null);
  
    //LISTENER CLICK
    /*map.addListener('click', function(event){
        //console.log(event);
        //agregarMarcador(event.latLng);
        for(var i in arregloPines){
                arregloPines[i].setMap(null);
        }
    });*/

    /*var pin = new google.maps.Marker({
        position: new google.maps.LatLng(-0.168785,-78.470889),
        map: map,
        title:"UDLA Queri"
    });*/

    /*db.transaction(function(tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS T_MAP ( id INTEGER PRIMARY KEY, ciudad TEXT, weather TEXT)" );
    });
    table();*/

    //arregloPines.push(pin);
}
/*function table() {
    var table = document.getElementById('tbody');
    db.transaction(function(tx) {
      tx.executeSql('SELECT * FROM T_MAP', [], function (tx, resultado) {
          var rows = resultado.rows;
          var tr = '';
          for(var i = 0; i < rows.length; i++){
                  tr += '<tr>';
                  tr += '<td>'+ rows[i].id +'</td>';
                  tr += '<td>' + rows[i].lat + '</td>';
                  tr += '<td>' + rows[i].long + '</td>';
                  tr += '</tr>';                   
          }
              table.innerHTML = tr; 
  
      }, null);
    });
  }*/
//Agregando Pines
//function agregarMarcador(location){
    //var pin = new google.maps.Marker({
        //position: new google.maps.LatLng(location.lat(),location.lng()),
        //map: map,
        //animation: google.maps.Animation.Drop
    //});
    //console.log("Latitud: ", location.lat());
    //console.log("Longitud: ", location.lng());
    //var latDb=location.lat();
    //var longDb=location.lng();
    //db.transaction(function(tx){
        //tx.executeSql('INSERT INTO T_Map (long,lat) VALUES (?, ?)', [longDb,latDb]);
    //});
    //table();
    //for(var i in arregloPines){
       // arregloPines[i].setMap(null);
    //}

    //arregloPines.push(pin);
//}