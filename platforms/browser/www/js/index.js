var arregloPines = [];
var heatmapData = [];
var db = openDatabase("weather1DB","1.0","Example", 2 * 1024 * 1024);

function temp(){
    nombre = $('#txtNombre').val();
    alert(nombre);
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
        var clima;
        var temperatura;
        var coordenadas;    
        api.onreadystatechange = function(){
            if(this.readyState == 4 && this.status==200){
                let datos = JSON.parse(this.responseText);
                console.log(datos.name);                
                $('#coord').html(" "+datos.coord.lon+" , "+datos.coord.lat);
                coordenadas = " "+datos.coord.lon+" , "+ datos.coord.lat;
                for(let item of datos.weather){
                    $('#weather').html(" "+item.description);
                    clima = item.description;                               
                }                
                $('#temp').html(" "+datos.main.temp);
                temperatura = (datos.main.temp - 273.15);
                $('#wind').html(" "+datos.wind.speed+" m/s");
                
                var pin = new google.maps.Marker({
                    position: new google.maps.LatLng(datos.coord.lat,datos.coord.lon),
                    map: map,
                    title: datos.name
                });

                for(let item of datos.sys.country){
                    var pin1 = new google.maps.LatLng(datos.coord.lat, datos.coord.lon);
                    heatmapData.push(pin1);
                }
                
                var texto = '<h4>'+'<p>'+'City: '+datos.name+'</p>'+'<p>'+'Country: '+datos.sys.country+'</p>'+'<p>'+'Coord: '+coordenadas+'</p>'+'<p>'+'Temperature: '+temperatura+' °C'+'</h4>';
                var informacion = new google.maps.InfoWindow({
                    content: texto
                });

                pin.addListener('click',function(){
                    informacion.open(map,pin);
                });

                db.transaction(function(tx){
                    tx.executeSql('INSERT INTO T_Map (city,country, weather, long, lat, wind) VALUES (?, ?, ?, ?, ?, ?)', [datos.name, datos.sys.country, temperatura,datos.coord.lon, datos.coord.lat,datos.wind.speed]);
                });
            
                table();
                var heatmap = new google.maps.visualization.HeatmapLayer({
                    data: heatmapData
                });
                heatmap.setMap(map);
                arregloPines.push(pin);                  
            }           
        } 
        pin.setMap(null);       
    });
       
}
function consultar(){
    nombre = $('#txtNombre').val();
    alert(nombre);
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
        var clima;
        var temperatura;
        var coordenadas;    
        api.onreadystatechange = function(){
            if(this.readyState == 4 && this.status==200){
                let datos = JSON.parse(this.responseText);
                console.log(datos.name);                
                $('#coord').html(" "+datos.coord.lon+" , "+datos.coord.lat);
                coordenadas = " "+datos.coord.lon+" , "+ datos.coord.lat;
                for(let item of datos.weather){
                    $('#weather').html(" "+item.description);
                    clima = item.description;                               
                }                
                $('#temp').html(" "+datos.main.temp);
                temperatura = (datos.main.temp - 273.15);
                $('#wind').html(" "+datos.wind.speed+" m/s");
                
                var pin = new google.maps.Marker({
                    position: new google.maps.LatLng(datos.coord.lat,datos.coord.lon),
                    map: map,
                    title: datos.name
                });

                for(let item of datos.sys.country){
                    var pin1 = new google.maps.LatLng(datos.coord.lat, datos.coord.lon);
                    heatmapData.push(pin1);
                }
                
                var texto = '<h4>'+'<p>'+'City: '+datos.name+'</p>'+'<p>'+'Country: '+datos.sys.country+'</p>'+'<p>'+'Coord: '+coordenadas+'</p>'+'<p>'+'Weather: '+clima+'</p>'+'</h4>';
                var informacion = new google.maps.InfoWindow({
                    content: texto
                });

                pin.addListener('click',function(){
                    informacion.open(map,pin);
                });

                db.transaction(function(tx){
                    tx.executeSql('INSERT INTO T_Map (city,country, weather, long, lat, wind) VALUES (?, ?, ?, ?, ?, ?)', [datos.name, datos.sys.country, temperatura,datos.coord.lon, datos.coord.lat,datos.wind.speed]);
                });
            
                table();
                var heatmap = new google.maps.visualization.HeatmapLayer({
                    data: heatmapData
                });
                heatmap.setMap(map);
                arregloPines.push(pin);                  
            }           
        } 
        pin.setMap(null);       
    });
       
}
function wind(){
    nombre = $('#txtNombre').val();
    alert(nombre);
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
        var clima;
        var temperatura;
        var coordenadas;    
        api.onreadystatechange = function(){
            if(this.readyState == 4 && this.status==200){
                let datos = JSON.parse(this.responseText);
                console.log(datos.name);                
                $('#coord').html(" "+datos.coord.lon+" , "+datos.coord.lat);
                coordenadas = " "+datos.coord.lon+" , "+ datos.coord.lat;
                for(let item of datos.weather){
                    $('#weather').html(" "+item.description);
                    clima = item.description;                               
                }                
                $('#temp').html(" "+datos.main.temp);
                temperatura = (datos.main.temp - 273.15);
                $('#wind').html(" "+datos.wind.speed+" m/s");
                
                var pin = new google.maps.Marker({
                    position: new google.maps.LatLng(datos.coord.lat,datos.coord.lon),
                    map: map,
                    title: datos.name
                });

                for(let item of datos.sys.country){
                    var pin1 = new google.maps.LatLng(datos.coord.lat, datos.coord.lon);
                    heatmapData.push(pin1);
                }
                
                var texto = '<h4>'+'<p>'+'City: '+datos.name+'</p>'+'<p>'+'Country: '+datos.sys.country+'</p>'+'<p>'+'Coord: '+coordenadas+'</p>'+'<p>'+'Wind: '+datos.wind.speed+' m/s'+'</p>'+'</h4>';
                var informacion = new google.maps.InfoWindow({
                    content: texto
                });

                pin.addListener('click',function(){
                    informacion.open(map,pin);
                });

                db.transaction(function(tx){
                    tx.executeSql('INSERT INTO T_Map (city,country, weather, long, lat, wind) VALUES (?, ?, ?, ?, ?, ?)', [datos.name, datos.sys.country, temperatura,datos.coord.lon, datos.coord.lat,datos.wind.speed]);
                });
            
                table();
                var heatmap = new google.maps.visualization.HeatmapLayer({
                    data: heatmapData
                });
                heatmap.setMap(map);
                arregloPines.push(pin);                  
            }           
        } 
        pin.setMap(null);       
    });
       
}
function cargarMapa(){

    var myOptions = {
        zoom:5,
        center: new google.maps.LatLng(-1.831239,-78.183406),
        mapTypeId: 'satellite'
    };  

    db.transaction(function(tx) {
        tx.executeSql("CREATE TABLE IF NOT EXISTS T_MAP ( id INTEGER PRIMARY KEY, city TEXT, country TEXT, weather TEXT,long TEXT, lat TEXT, wind TEXT)" );
    });
    table();

    map = new google.maps.Map(document.getElementById('map'), myOptions);
    heatmapData = [
        //{location: new google.maps.LatLng(-2.19616, -79.88621), radius: 15000000000000}
        //new google.maps.LatLng(-2.19616, -79.88621),
        //Guayaquil 
        {location: new google.maps.LatLng(-2.19616, -79.88621), radius: 15000000000000},
        new google.maps.LatLng(-2.19616, -79.88621),
        //Quito
        new google.maps.LatLng(-0.22985, -78.52495),
        //Cuenca
        new google.maps.LatLng(-2.90055, -79.00453),
        //Machala
        new google.maps.LatLng(-3.25861, -79.96053),
        //Manta
        new google.maps.LatLng(-0.96212, -80.71271),
        //Portoviejo
        new google.maps.LatLng(-1.05458, -80.45445),
        //Esmeraldas
        new google.maps.LatLng(0.9592, -79.65397),
        //Ambato
        new google.maps.LatLng(-1.24908, -78.61675),
        //Milagro
        new google.maps.LatLng(-2.13404, -79.59415),
        //Ibarra
        new google.maps.LatLng(0.35171, -78.12233),
        //Tulcán
        new google.maps.LatLng(0.81187, -77.71727),
        //Riobamba
        new google.maps.LatLng(-1.67098, -78.64712),
        //Quevedo
        new google.maps.LatLng(-1.02863, -79.46352),
        //Babahoyo
        new google.maps.LatLng(-1.80217, -79.53443),
        //Santo Domingo
        new google.maps.LatLng(-0.25305, -79.17536),
        //Salinas
        new google.maps.LatLng(-2.21452, -80.95151),
        //Santa Elena
        new google.maps.LatLng(-2.22622, -80.85873),
        //Eloy Alfaro
        new google.maps.LatLng(-2.17579, -79.85519),
        //Santa Rosa
        new google.maps.LatLng(-3.44882, -79.95952),
        //Latacunga
        new google.maps.LatLng(-0.93521, -78.61554)
    ];
    var heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData
    });
    heatmap.setMap(map);
}
function table() {
    var table = document.getElementById('tbody');
    db.transaction(function(tx) {
      tx.executeSql('SELECT * FROM T_MAP', [], function (tx, resultado) {
          var rows = resultado.rows;
          var tr = '';
          for(var i = 0; i < rows.length; i++){
                  tr += '<tr>';
                  tr += '<td>'+ rows[i].id +'</td>';                  
                  tr += '<td>' + rows[i].city + '</td>';
                  tr += '<td>' + rows[i].country + '</td>';
                  tr += '<td>' + rows[i].weather + '</td>';
                  tr += '<td>' + rows[i].long + '</td>';
                  tr += '<td>' + rows[i].lat + '</td>';
                  tr += '<td>' + rows[i].wind + '</td>';
                  tr += '</tr>';                   
          }
              table.innerHTML = tr; 
  
      }, null);
    });
}
