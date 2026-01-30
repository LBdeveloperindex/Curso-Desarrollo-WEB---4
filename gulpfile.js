import { src, dest, watch, series } from 'gulp'; //Importa funciones, src permite acceder a archivos fuentes y dest es donde se van a almacenar los archivos procesados
import * as dartSass from 'sass';
import gulpSass from 'gulp-sass'; //Dependencia para utilizar SASS en archivo de gulp

const sass = gulpSass(dartSass); //Compila SASS usando gulpsass el cuál se encuentra en dartsaas

export function js(done) {
    src('src/js/scripts.js')
        .pipe(dest('build/js'))
    done();
} 

export function css( done ) { // Función para compilar a CSS
    src('src/scss/app.scss', { sourcemaps: true }) //Identificar archivo fuente, con sourcemaps para ver en el navegador el archivo original
        .pipe( sass().on('error', sass.logError) )
        .pipe( dest('build/css', { sourcemaps: '.' }) )

    done();
}

export function dev() {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', js);
}

export default series(js, css, dev);

/*
export function nombre( done ) {
    console.log("**");

    done();
} //export permite ejecutar la función fuera 
*/