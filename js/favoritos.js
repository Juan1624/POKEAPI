function Favoritos() {
  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  if (favoritos.length == 0) {
    document.getElementById("root").innerHTML = "no hay favoritos ";
  } else {
    document.getElementById("root").innerHTML = generarLista(favoritos);
  }
}

// 🔹 Esta función genera el HTML con los favoritos en forma de fila
function generarLista(favoritos) {
  let html = "<h2>⭐ Tus Favoritos</h2><div class='fila'>";

  for (let poke of favoritos) {
    const id = poke.url.split("/")[6]; 
    html += `
      <div class="card" onclick="Detalle(${id})">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png" alt="${poke.name}">
        <h3>${poke.name}</h3>
      </div>
    `;
  }

  html += "</div>";
  return html;
}
