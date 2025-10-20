var esFavorito = false;

// Agregar o quitar de favoritos
function toggleFavorito(paramid, paramname) {
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  let existe = favoritos.some(poke => poke.name === paramname);

  if (existe) {
    favoritos = favoritos.filter(poke => poke.name !== paramname);
    esFavorito = false;
  } else {
    favoritos.push({
      name: paramname,
      url: `https://pokeapi.co/api/v2/pokemon/${paramid}/`
    });
    esFavorito = true;
  }

  localStorage.setItem("favoritos", JSON.stringify(favoritos));

  const boton = document.querySelector(`#corazon-${paramid}`);
  if (boton) boton.textContent = esFavorito ? "❤️" : "🤍";
}

// Mostrar detalle
async function Detalle(parametro) {
  const root = document.getElementById("root");
  root.innerHTML = "Cargando...";

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${parametro}`);
  const data = await res.json();

  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
  esFavorito = favoritos.some(poke => poke.name === data.name);

  let tipoPoke = data.types.map(t => `<span>${t.type.name}</span>`).join(" ");

  root.innerHTML = `
    <section class="c-detalle">
      <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png" 
           alt="${data.name}" height="120">
      <h2>${data.name}</h2>
      <p>ID: ${data.id}</p>
      <p>${tipoPoke}</p>
      <p>Altura: ${data.height / 10} m / Peso: ${data.weight / 10} kg</p>
      <p>HP: ${data.stats[0].base_stat}</p>
      <p>Velocidad: ${data.stats[5].base_stat}</p>
      <p>Ataque: ${data.stats[1].base_stat} / Defensa: ${data.stats[2].base_stat}</p>
      <p>Ataque Especial: ${data.stats[3].base_stat} / Defensa Especial: ${data.stats[4].base_stat}</p>

      <button onClick="toggleFavorito(${data.id}, '${data.name}')">
        <span id="corazon-${data.id}">${esFavorito ? '❤️' : '🤍'}</span> Favorito
      </button>
    </section>
  `;
}
