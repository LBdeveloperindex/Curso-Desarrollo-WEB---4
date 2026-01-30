document.addEventListener('DOMContentLoaded', function() {
    navegacionnFija();
    crearGaleria()
    resaltarEnlace();
    scrolllNav();
});

function navegacionnFija() {
    const header = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');

    document.addEventListener('scroll', function() {
        if (sobreFestival.getBoundingClientRect().bottom < 1 ) {
            header.classList.add('fixed');
        }
        else {
            header.classList.remove('fixed');
        }
    });
}

function crearGaleria() {

    const cantImagenes = 16;

    const galeria = document.querySelector('.galeria-imagenes')

    for(let i = 1; i <= cantImagenes; i++) {
        const imagen = document.createElement('IMG');
        imagen.src = `src/img/gallery/full/${i}.jpg`;
        imagen.alt = `Imagen galería ${i}`;

        galeria.appendChild(imagen)

        // EVENT HANDLER
        imagen.onclick = function() {
            mostrarImagen(i);
        }
    }
}

function mostrarImagen(i) {
    // Seleccionar la imagen clickeada por la referecnia i
    const imagen = document.createElement('IMG');
    imagen.src = `src/img/gallery/full/${i}.jpg`;

    // Generarl modal
    const modal = document.createElement('DIV'); //CREA UN DIV DENOMINADO MODAL
    modal.classList.add('modal'); //SE AGFREGA LA CLASE MODAL AL DIV
    modal.onclick = cerrarModal;

    // Botón para cerrar el modal
    const cerrarModalBtn = document.createElement('BUTTON');
    cerrarModalBtn.textContent = 'X';
    cerrarModalBtn.classList.add('btn-cerrar');
    cerrarModalBtn.onclick = cerrarModal;

    modal.appendChild(imagen); //SE AGREGA LA IMAGEN
    modal.appendChild(cerrarModalBtn); //SE AGREGA EL BOTÓN

    // Agregar al HTML
    const body = document.querySelector('body');
    body.classList.add('overflow-hidden')
    body.appendChild(modal);
}

function cerrarModal() {
    const modal = document.querySelector('.modal');
    modal.classList.add('fade-out')

    setTimeout(() => {
        modal?.remove();

        const body =document.querySelector('body');
        body.classList.remove('overflow-hidden')
    }, 500)
}

function resaltarEnlace() {
    document.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.navegacion-principal a');

        let actual = '';

        sections.forEach( section => { 
            const sectionTop = section.offsetTop; //Detecta la dstancia desde la parte superior del section hasta el padre
            const sectionHeight = section.clientHeight;

            if(window.scrollY >= (sectionTop - sectionHeight / 3)) {
                actual = section.id;
            }
        })

        navLinks.forEach( link => { 
            if(link.getAttribute('href') === '#' + actual) {
                link.classList.add('active');
            }
            else {
                link.classList.remove('active');
            }
        })
    })
}

function scrolllNav() {
    const navLinks = document.querySelectorAll('.navegacion-principal a');

    navLinks.forEach( link => { 
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const sectionToScroll = e.target.getAttribute('href');
            const section = document.querySelector(sectionToScroll);

            section.scrollIntoView( {behavior: 'smooth'} );
        })
    })
}