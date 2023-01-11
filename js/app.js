//variables

const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarrito = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];


cargarEventListeners();
function cargarEventListeners(){
    //Cuando agregar curso presionando 'Agregar al Carrito'
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    //Vaciar el carrito

    vaciarCarrito.addEventListener('click', () =>{
        articulosCarrito = []; //Se resetea el arreglo y se convierte en uno

        limpiarHTML(); //Elinamos todo el HTML
    })
}


//Funciones
function agregarCurso (e){
    e.preventDefault();

    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado); 
    }

}

//Eliminar un curso del carrito

function eliminarCurso(e){
    console.log(e.target.classList);
    if (e.target.classList.contains('borrar-curso')){
        const cursoId= e.target.getAttribute('data-id');

        //Elimina los articulos por el data ID

        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        carritoHTML(); //Iteramos sobre el carrito y mostramos el HTML
    }
}


//Lee el contenido del HTML al que le dimos click y extrae l ainformacion del curso

function leerDatosCurso(curso){
    console.log(curso);

    //Crear objeto con contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //Revisa si un elemento ya existe en el carrito

    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id); //.some revisa si un elemento ya existe en el objeto 

    if(existe) {
        //Actualizar el carrito
        const cursos = articulosCarrito.map(curso =>{
            if (curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; //retorna el objeto actualizado
            } else{
                return curso; //retorna los objetos que no son los duplicados
            }
        })
        articulosCarrito = [...cursos];
    }

    else{
        //Agrega elementos al arreglo del carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    console.log(existe);

    console.log(articulosCarrito);

    carritoHTML();
}

//Muestra el carrito de compras en el HTML

function carritoHTML(){

    //Limpiar el HTML
    limpiarHTML();
    //Recorre el carrito y genera el HTML

    articulosCarrito.forEach((curso) =>{
        // const { imagen, titulo, precio, cantidad,id } = curso; con este codigo podrias eliminar el .titulo, .precio, .cantidad y .id
        const row = document.createElement('tr');
        row.innerHTML = `

            <td>
                <img src="${curso.imagen}" width="100">
            </td>

            <td>
                ${curso.titulo}
            </td>

            <td>
                ${curso.precio}
            </td>

            <td>
                ${curso.cantidad}
            </td>

            <td>
                <a href="#" class="borrar-curso" data-id="${curso.id}" >x</a>
            </td>
        `;

        //Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}

//Elimina los cursos del tbody
function limpiarHTML(){
    //Forma Lenta
    // contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}