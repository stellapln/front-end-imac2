import { h } from 'hyperapp'

/*
  - indice global
  - Evolution temporelle d'un crime au hover
  - logo de chargement
*/

export default (state, actions) => {
  return (
    <div classList="both-column">
      <div classList="row">
        <div classList="big-block">
          <h1>Indice de criminalité local</h1>
        </div>
        <div id="research_container">
          <input type="text" id="search-bar" oninput={e => actions.searchCity(e.target.value)} value={state.city} placeholder="Ville"/>
          <button id="research-button" onclick={() => actions.setCity(document.getElementById('search-bar').value)}>
            <img src="assets/search.png" id="search-icon"/>
          </button>
          <div classList="autocomplete">
            {state.autocomplete.map(obj => <div onclick={() => actions.setCity(obj.ville_nom_reel)} class="list_line hover">{obj.ville_nom_reel} ({obj.ville_code_postal})</div>)}
          </div>
          {state.datacrime.error ? <div classList="error"> {state.datacrime.error} </div> : ''}
        </div>
        {(state.datacrime.departement && state.datacrime.departement !== '') ? 'Données sur la zone ' + state.datacrime.departement[0].name + ' (' + state.datacrime.departement[0].numero + ')' : ''}
        <div classList="block-card">
          <h2>Actions illégales les plus courantes</h2>
          {state.datacrime.crimeForDept ? state.datacrime.crimeForDept.slice(0, 10).map(obj => <div classList="list_line">{obj.categorie} | {obj.s_nombre}</div>) : ''}
        </div>
      </div>
      <div classList="row">
        <div classList="big-block">
          <h2>Danger locaux</h2>
          <div classList="container-for-flex">
            {state.datacrime.probCrime ? state.datacrime.probCrime.slice(0, 5).map(obj => <div classList="big-card">{obj.categorie} <span classList="big-card-pourcent">{obj.prob}<span classList="pourcent-sign">%</span></span></div>) : ''}
          </div>
        </div>
        <div classList="block-card">
          <h2>Danger par période</h2>
          <p>Évolution du nombre d’infractions / délits / crimes</p>
        </div>
        <div classList="block-card">
          <h2>Risque d'agression</h2>
          <div classList="donut-chart-block block"></div>
        </div>
      </div>
    </div>
  )
}
