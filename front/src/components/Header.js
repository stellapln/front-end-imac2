import { h } from 'hyperapp'

export default (state, actions) =>
  <header>
    <div classList="big-block">
      <h1>Data Crime</h1>
    </div>
    <div id="research_container">
      <input type="text" id="search-bar" oninput={e => actions.searchCity(e.target.value)} value={state.city} placeholder="Ville"/>
      <button id="research-button" onclick={() => actions.setCity(document.getElementById('search-bar').value)}>
        <img src="assets/search.png" id="search-icon"/>
      </button>
      <div classList="autocomplete">
        {state.autocomplete.map(obj => <div onclick={() => actions.setCity(obj.ville_nom_reel)} class="list-line hover">{obj.ville_nom_reel} ({obj.ville_code_postal})</div>)}
      </div>
      {state.datacrime.error ? <div classList="error"> {state.datacrime.error} </div> : ''}

    </div>
  </header>
