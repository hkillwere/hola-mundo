//Declaro las constates
const containerProducts = document.querySelector('.container-products');
const aside = document.querySelector('aside');
const icon = document.querySelector('.icon');
const span = document.querySelector('span');
const borrar = document.querySelector('.Borrar')

//Creo el array de productos que van a ir almacenados en el array
let asideProducts = [];



document.addEventListener('DOMContentLoaded', () => {


    const fetchData = async () => {
        try{
            const url = await fetch ('api.json');
            const data = await url.json();
            pintarData(data)
    
        }
        catch{
            console.log('error')
        }
        
    }
    
    fetchData()
    
    const pintarData = (data) => {
    
       Object.values(data).forEach(product => {
           const div = document.createElement('div');
           div.className = 'card';
           const img = document.createElement('img');
           img.setAttribute('src', product.thumbnailUrl);
           const title = document.createElement('h3');
           title.innerHTML = product.title;
           const precio= document.createElement("h2");
           precio.innerHTML=product.precio;
           precio.className=` item-price`;
           const button = document.createElement('button');
           button.innerHTML = 'Agregar';
           button.className = 'btn';
    
            div.appendChild(img)
            div.appendChild(title)
            div.appendChild(button)   
    
            containerProducts.appendChild(div)
       })
    
    }
    
    document.addEventListener('click', (e) => {
    
        if(e.target.matches('.btn')){      
    
            card = e.target.parentElement
    
            const productoCard = {
                img: card.querySelector('img').src,
                title: card.querySelector('h3').textContent,
                stock: 1
    
            }
    
            asideProducts.push(productoCard)
           
    
            agregarProducto(productoCard)
    
            localStorage.setItem('carrito', JSON.stringify(asideProducts))
            
        }
    
        if(e.target.matches('.icon') || e.target.matches('.icon *')){
            aside.classList.toggle('active')
            
        }  
    
        if(e.target.matches('.fa-circle-plus')){
    
            const obj = {
                span: e.target.parentElement.querySelector('span')
            }
    
            obj.span.innerHTML++;     
            
        } 
    
        if(e.target.matches('.fa-circle-minus')){
            const obj = {
                span: e.target.parentElement.querySelector('span')
            }
    
            obj.span.innerHTML--; 
            
            if(obj.span.innerHTML <= 0){
                e.target.parentElement.remove();
                console.log(asideProducts)
           
                
    
            }
        } 

        // sweet alert en el boton de Compra del carrito

        if(e.target.matches('.botonFinComprar')){
            Swal.fire({
            title: '¡Su compra ha sido realizada con éxito!',
            icon: 'success'
        })
        }

        //Boton de Borrado de Carrito
        if(e.target.matches('.botonBorrar')){ 
            // let borrarProductos= localStorage.getItem(`carrito`,JSON.stringify(asideProducts);
            // if(asideProducts.length >=1 ){
            //     localStorage.clear();
            //     console.log(borrarProductos);
            // }
            
        }
    
    })

    const pintarProductos = (asideProducts) => {

        asideProducts.forEach(producto => {

            const div = document.createElement('div');
            div.className = 'product';
            const img = document.createElement('img');
            img.setAttribute('src', producto.img);
            const title = document.createElement('h3');
            title.innerHTML = producto.title;
            const iconSumar = document.createElement('i');
            iconSumar.className = 'fa-solid fa-circle-plus';
            const iconRestar = document.createElement('i');
            iconRestar.className = 'fa-solid fa-circle-minus';
            const span = document.createElement('span');
            span.textContent = producto.stock;
        
        
            div.appendChild(img)
            div.appendChild(title);
            div.appendChild(iconSumar);
            div.appendChild(span);
            div.appendChild(iconRestar)
        
            aside.appendChild(div)  



        })
        
    }
    
    const agregarProducto = (productoCard) => {
    
        const div = document.createElement('div');
        div.className = 'product';
        const img = document.createElement('img');
        img.setAttribute('src', productoCard.img);
        const title = document.createElement('h3');
        title.innerHTML = productoCard.title;
        const iconSumar = document.createElement('i');
        iconSumar.className = 'fa-solid fa-circle-plus';
        const iconRestar = document.createElement('i');
        iconRestar.className = 'fa-solid fa-circle-minus';
        const span = document.createElement('span');
        span.textContent = productoCard.stock;
    
    
        div.appendChild(img)
        div.appendChild(title);
        div.appendChild(iconSumar);
        div.appendChild(span);
        div.appendChild(iconRestar)
    
        aside.appendChild(div)   
    
    }

    if(localStorage.getItem('carrito') ){
        asideProducts = JSON.parse(localStorage.getItem('carrito'))

        pintarProductos(asideProducts)

    }
})



