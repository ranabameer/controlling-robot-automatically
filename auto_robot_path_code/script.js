var index = 0;
var array = Array();

function add_element_to_array()
{

 magnitude=document.getElementById("value").value;
 //var line=new Line(this.id,magnitude)	
 array[index] = {
 	direction:this.id,
	 magnitude:magnitude
 };
 index++;
 document.getElementById("value").value = "";
 display_draw_array();
}

function display_draw_array()
{
   var element = "<hr/>";  
   var canves = document.getElementById("myCanvas");
	var context = canves.getContext("2d");
	context.beginPath();
	var x_axis=40;
	var y_axis=20;
	var is_x_axis=false;
	context.moveTo(x_axis, y_axis); 

    
   for (var index=0; index<array.length; index++)
   {

     element += "Direction: " + array[index].direction + ",  magnitude:" + array[index].magnitude + "<br/>";
     direction=array[index].direction;
     magnitude= parseFloat(array[index].magnitude);

     if(index==0){
     	switch(direction){
     	case "forwards":
     		x_axis+=magnitude;
     		is_x_axis=true;
     	break;
     	case "right":
     		y_axis+=magnitude;
     	break;
     	case "left":
     		y_axis-=magnitude;
     	break;
     					}}
     	else {

     		var previous_index=index-1;
     		var previous_direction= array[previous_index].direction;
     		//var previous_magnitude= parseFloat(array[previous_index].magnitude);
     		switch(direction){
	     	case "forwards":
	     		if(is_x_axis){
	     			if(previous_direction=="left")
	     				x_axis-=magnitude;
	     			else
	     				x_axis+=magnitude;
	     			is_x_axis=true;
	     		}
	     		else{
	     			if(previous_direction=="left")
	     				y_axis-=magnitude;
	     			else
	     				y_axis+=magnitude;
	     			is_x_axis=false;
	     		}

	     	break;
	     	case "right":
	     		if(is_x_axis){
	     			y_axis+=magnitude;
	     			is_x_axis=false;
	     		}
	     		else{
	     			x_axis+=magnitude;
	     			is_x_axis=true;
	     		}
	     	break;
	     	case "left":
	     		if(is_x_axis){
	     			y_axis-=magnitude;
	     			is_x_axis=false;
	     		}
	     		else{
	     			x_axis-=magnitude;
	     			is_x_axis=true;
	     		}
	     	break;
     					}
     		}
     	
     	context.lineTo(x_axis, y_axis);
     	context.stroke();

   }
   document.getElementById("Result").innerHTML = element;
}

function delete_array(){
	 location.reload(true);
	
}

function save_array(){
	path_name=document.getElementById("pathname").value;
	array.push(path_name);
	$.ajax({
		url:"saveDB.php",
		method:"post",
		data:{ path : JSON.stringify(array) },
		success: function(res){
			
			console.log(res);
		}})

	
	
}


class Line{
	constructor(direction,magnitude){
		this.direction=direction;
		this.magnitude=magnitude;
	}
}


var f_button=document.getElementById("forwards");
var r_button=document.getElementById("right");
var l_button=document.getElementById("left");
var d_button=document.getElementById("delete");
var s_button=document.getElementById("save");

f_button.addEventListener("click",add_element_to_array);
r_button.addEventListener("click",add_element_to_array);
l_button.addEventListener("click",add_element_to_array);
d_button.addEventListener("click",delete_array);
s_button.addEventListener("click",save_array);





