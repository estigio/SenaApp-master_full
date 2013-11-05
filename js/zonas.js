var API_SOURCE ="http://devtucompass.tk/pici/API/";
$.support.cors = true;
$.mobile.allowCrossDomainPages = true;

function getZonas () {
	var content = "";	
	$.ajax({
		url: API_SOURCE+"getzonas",
		type:'GET',
		async: true,
		format:"jsonp",
		crossDomain: true,
		error: function(jqXHR, textStatus, errorThrown){
                       console.log("hi");
                       console.log(jqXHR);
                       console.log(textStatus);
                       console.log(errorThrown);
                       $("#message").html("Error Al cargar los Datos"+jqXHR);
                },
        cache:false
	}).done( function (data){		
		$.each( data, function ( i, item ){
			
			content  +='<div data-role="collapsible" data-iconpos="bottom">'+
                        '<h3 id="titlebuton">'+item['nombre']+'</h3>';
                        
                       for(departamento in item.dep){
	                        //content += '<li> <a href="'+item.dep[departamento].nombre+'">'+item.dep[departamento].nombre+'</a></li>';							        
					   		content += '<div class="ui-grid-solo" id="contentItem">' +
					                         '<a href="educationPC.html?type=Ciudades&idDep='+item.dep[departamento].id+'" rel="external" data-ajax="false">'+       
					                             '<div id="listItem" class="ui-grid-b">'+
					                                '<div class="ui-block-a"></div> '+ 
					                                 '<div id="textButtonL" class="ui-block-c">'+
					                                  '<div>'+item.dep[departamento].nombre+'</div>'+
					                                '</div>'+
					                               ' <div class="ui-block-d" id="iconoBotonright"><img src="../../img/icons/icons_sena/FlechaBoton.png"></div>'+             
					                            '</div>'+
					                        '</a>'+
					                    '</div>';               

					    }
            content+='</div>';

		});
		$("#contenidoOpciones").append(content);
		
		$('#contenidoOpciones').trigger('create');
		$("#contenidoOpciones").collapsibleset('refresh');
	});

}



function getPlaces(idDep) {
	var content = "";	
	$.ajax({
		url: API_SOURCE+"getPlaces?idDep="+idDep,
		type:'GET',
		async: true,
		format:"jsonp",
		crossDomain: true,
		error: function(jqXHR, textStatus, errorThrown){
                       console.log("hi");
                       console.log(jqXHR);
                       console.log(textStatus);
                       console.log(errorThrown);
                       $("#message").html("Error Al cargar los Datos"+jqXHR);
                },
        cache:false
	}).done( function (data){		
		content  +='<ul data-role="listview" data-inset="true" data-divider-theme="c" id="listaplaces" data-theme="c">';
		$.each( data, function ( i, item ){
			
			
                       content  += '<li data-role="list-divider">'+item['nombre']+'</li>';
                        
                       for(lugar in item.lug){
	                       content += '<li id="itemlista">'+
	                       		'<div class="ui-grid-solo" id="contentItem">' +
					                         '<a id="place" href="#" value="'+item.lug[lugar].id+'"  data-rel="popup" data-position-to="window"   data-inline="true" data-transition="pop"  >'+       
					                             '<div id="listItem" class="ui-grid-b">'+
					                                '<div class="ui-block-a"></div> '+ 
					                                 '<div id="textButtonL" class="ui-block-c">'+
					                                  '<div>'+item.lug[lugar].nombre+'</div>'+
					                                '</div>'+
					                               ' <div class="ui-block-d" id="iconoBotonright"><img src="../../img/icons/icons_sena/FlechaBoton.png"></div>'+             
					                            '</div>'+
					                        '</a>'+
					                    '</div>'+
	                       '</li>';      
					    }
           

		});

		 content+='</ul>';
		$("#contenidoOpciones").append(content);		
		$('#contenidoOpciones').trigger('create');
		$('#contenidoOpciones').trigger('refresh');

		 $("#listaplaces li a").click(function () {
	                   var id = $(this).attr("value"); 
	                  	var content = "";	
						$.ajax({
							url: API_SOURCE+"getPlace?id="+id,
							type:'GET',
							async: true,
							format:"jsonp",
							crossDomain: true,
							error: function(jqXHR, textStatus, errorThrown){
					                       console.log("hi");
					                       console.log(jqXHR);
					                       console.log(textStatus);
					                       console.log(errorThrown);
					                       $("#message").html("Error Al cargar los Datos"+jqXHR);
					                },
					        cache:false
						}).done( function (data){		
							$.each( data, function ( i, item ){
								$("#tituloLugar").html(item.nombre);
								$("#descripcionLugar").html(item.descripcion);
							});	
							$('#infoLugar').trigger('refresh');
							 
							$("#infoLugar").popup("open");

						});
					        			
		 });

		 $("#closepop").click(function (){
		 	$("#infoLugar").popup("close");
		 });


	 });
		
}

function lugar(id) {
	var content = "";	
	$.ajax({
		url: API_SOURCE+"getPlace?id="+id,
		type:'GET',
		async: true,
		format:"jsonp",
		crossDomain: true,
		error: function(jqXHR, textStatus, errorThrown){
                       console.log("hi");
                       console.log(jqXHR);
                       console.log(textStatus);
                       console.log(errorThrown);
                       $("#message").html("Error Al cargar los Datos"+jqXHR);
                },
        cache:false
	}).done( function (data){		
		$.each( data, function ( i, item ){
			$("#tituloLugar").html(item.nombre);
			$("#descripcionLugar").html(item.descripcion);
		});	
		$('#infoLugar').trigger('refresh');
		$.mobile.navigate("#infoLugar");
	});
}

 