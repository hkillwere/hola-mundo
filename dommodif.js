let vehiculos= [
    {
        id:1,
        tipo: "Auto",
        precio: 10500,
        impuesto: 10,
    },
    {
        id:2,
        tipo: "Moto",
        precio: 20000,
        impuesto: 20,
    },
    {
        id:3,
        tipo: "Avion",
        precio: 50000,
        impuesto: 30,
    },
    {
        id:4,
        tipo: "Lancha",
        precio: 70000,
        impuesto: 15,
    },
];

//Limpio  el local Storage
localStorage.clear();

// REalizo una lista de vehículos con una función para agregar vehiculos mediante javascript al DOM

    function agregarVehiculoAHTML (vehiculo) {
        
        if (document.getElementById("list")){
            document.getElementById("list").remove();
        }

        let ul = document.createElement("ul");
        ul.setAttribute("id","list");
    
        let li1 = document.createElement("li");
        li1.innerText = `El vehiculo que usted seleccionó ${vehiculo.tipo}`;
    
        let li2 = document.createElement("li");
        li2.innerText = `El precio es ${vehiculo.precio}`;
    
        let li3 = document.createElement("li");
        li3.innerText = `El impuesto es ${vehiculo.impuesto} %`;

            ul.append(li1, li2, li3);
    
        contenedor.append(ul);
    }

 let contenedor= document.getElementById ("contenedor");

//Obtengo el elemento del select para poder comenzar a operar con el mismo
let select= document.getElementById("select-vehiculo");

//se crea una opción nula donde podamos empezar a elegir los vehículos

let opcionNula= document.createElement("option");
opcionNula.value= "";
opcionNula.innerText= "Seleccionar Vehículo";
select.append(opcionNula);


//Recorro el array de vehiculos
vehiculos.forEach((vehiculo) => {

    //creamos la opcion del select
    let option= document.createElement("option");
    option.value= vehiculo.precio;
    option.innerText= vehiculo.tipo;
    
    //agregamos la opcion al select
    select.append(option);

});

//Creo el botón "boton1"
let boton= document.getElementById("boton1");

// Le creo un evento "click", para que cada vez que se oprima, se imprima la información seleccionada
//en el DOM, le digo que si encuentra algo en el select me agregue el vehículo seleccionado.

boton.addEventListener("click", () => {
   const valueSelect= select.value;
   
   if(valueSelect != "" ){
       const vehiculoEncontrado= vehiculos.find ((vehiculo) =>{
           return vehiculo.precio == valueSelect;    
       });
       
       agregarVehiculoAHTML(vehiculoEncontrado);

//Seteo el localstorage para que sea seleccionado convierto a JSON el ARRAY
        localStorage.setItem("vehiculos", JSON.stringify 
           (vehiculos));
                      
           const vehiculosJSON= localStorage.getItem ("vehiculos");
           
           //Parseo el JSON al nuevo array para que me muestre específicamente el objeto individual
           const vehiculosArray= JSON.parse(vehiculosJSON);
           
           //En el nuevo array declaro elijo mediante el metodo filter el obeto individual elegido
           const nuevoArray = vehiculosArray.filter ( (elemento) => {
               return  vehiculo.value==valueSelect;
           });
           localStorage.setItem("vehiculos",JSON.stringify(nuevoArray));
    } 
  
});
