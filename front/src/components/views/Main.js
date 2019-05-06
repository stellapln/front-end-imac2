import { h } from 'hyperapp'

export default (state, actions) => {
  return (
    <div>
      <h1>{state.input.value}</h1>
      <div>
        <input oninput={e => actions.searchCity(e.target.value)} value={state.city} placeholder="Ville"/>
        <div>
          {state.autocomplete.map(obj => <div onclick={() => actions.setCity(obj.nom)}>{obj.nom}</div>)}
        </div>
      </div>
      {state.datacrime.departement ? 'Données sur la zone ' + state.datacrime.departement[0].name : ''}
      <div>
        <h2>Crimes les plus courants</h2>
        {state.datacrime.crimeForDept ? state.datacrime.crimeForDept.slice(0, 10).map(obj => <div>{obj.categorie} | {obj.s_nombre}</div>) : ''}
      </div>
      <div>
        <h2>Probabilité par rapport aux autres départements</h2>
        {state.datacrime.probCrime ? state.datacrime.probCrime.slice(0, 20).map(obj => <div>{obj.categorie} : {obj.prob}%</div>) : ''}
      </div>
    </div>
  )
}
