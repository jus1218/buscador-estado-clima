
const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
  formulario.addEventListener('submit', buscarClima);
})




function buscarClima(e) {
  e.preventDefault();
  const ciudad = document.querySelector('#ciudad').value
  const pais = document.querySelector('#pais').value

  console.log(ciudad);
  console.log(pais);

  if (ciudad === '' || pais === '') {
    // Hubo un error
    mostrarError('Ambos campos son obligatorios')

    return;
  }
  consultarAPI(ciudad, pais);
}

function mostrarError(mensaje) {
  const alerta = document.querySelector('.bg-red-100');
  if (!alerta) {
    const alerta = document.createElement('div');

    alerta.classList.add('bg-red-100', "border-red-400", "text-red-700", "px-4", "py-3", "rounded", "relative", "max-w-md", "mx-auto", "mt-6", "text-center");

    alerta.innerHTML = `
          <strong class="font-bold">Error!</strong>
          <span class="block sm:inline">${mensaje}</span>
      `;

    container.appendChild(alerta);
    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
}

async function consultarAPI(ciudad, pais) {
  // Consultar la API e imprimir el Resultado...

  // leer la url  y agregar el API key
  const appId = '9dd979fda6c40f00dc3f0ea727937ad4';
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
  console.log(url);
  Spinner();

  try {

    let res = await fetch(url);
    json = await res.json();

    console.log('Valor res: ', res);


    console.log(res, json);


    if (!res.ok) throw { status: res.status, message: res.statusText };
    limpiarHTML();
    mostrarClima(json)

  } catch (err) {
    if (err instanceof TypeError && err.message === 'Failed to fetch') {
      err = { status: 0, message: 'No hay conexión a Internet' };
    }
    msjError(err)
  }

}

function mostrarClima(datos) {

  // Formatear el Clima...

  const { name, main: { temp, temp_max, temp_min } } = datos;


  const grados = KelvinACentigrados(temp);
  const min = KelvinACentigrados(temp_max);
  const max = KelvinACentigrados(temp_min);

  const nombreCiudad = document.createElement('p');
  nombreCiudad.innerHTML = `Clima en: ${name}`;
  nombreCiudad.classList.add('font-bold', 'text-2xl')

  const actual = document.createElement('p');
  actual.innerHTML = `${grados} &#8451;`;
  actual.classList.add('font-bold', 'text-6xl')

  const tempMaxima = document.createElement('p');
  tempMaxima.innerHTML = `Max: ${max} &#8451;`;
  tempMaxima.classList.add('text-xl')


  const tempMinima = document.createElement('p');
  tempMinima.innerHTML = `Min: ${min} &#8451;`;
  tempMinima.classList.add('text-xl')


  const resultadoDiv = document.createElement('div');
  resultadoDiv.classList.add('text-center', 'text-white')
  resultadoDiv.appendChild(nombreCiudad);
  resultadoDiv.appendChild(actual);
  resultadoDiv.appendChild(tempMaxima);
  resultadoDiv.appendChild(tempMinima);

  resultado.appendChild(resultadoDiv)
}

function msjError(objError) {
  limpiarHTML();
  const resultadoDiv = document.createElement('div');

  resultadoDiv.innerHTML = `

  <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
  <strong class="font-bold">ERROR ${objError.status}!</strong>
  <span class="block sm:inline">${objError.message}</span>
</div>
  `;


  limpiarHTML();

  setTimeout(() => {
  
    resultadoDiv.innerHTML = `
    <p class="text-center text-white mt-6">Agrega tu ciudad y país, el resultado se mostrará aquí</p>`;
  }, 3000)






  resultadoDiv.classList.add('text-center', 'text-white')
  resultado.appendChild(resultadoDiv)

}


function KelvinACentigrados(grados) {
  return parseInt(grados - 273.15);
}

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function Spinner() {
  //https://tobiasahlin.com/spinkit/
  limpiarHTML();

  const divSpinner = document.createElement('div');
  divSpinner.classList.add('sk-fading-circle');

  divSpinner.innerHTML = `
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>
  `;
  resultado.appendChild(divSpinner);
}