import { h } from 'hyperapp'
import MostIllegalActions from '../MostIllegalActions'
import Header from '../Header'
import LocalDanger from '../LocalDanger'
import RatioPopCrime from '../RatioPopCrime'
import CrimeEvolution from '../CrimeEvolution'

/*
  - Evolution temporelle d'un crime au hover
  - logo de chargement
*/

export default (state, actions) => {
  return (
    <div classList="both-column">
      <div classList="row">
        {Header(state, actions)}
        {(state.datacrime.departement && state.datacrime.departement !== '') ? 'Données sur la zone ' + state.datacrime.departement[0].name + ' (' + state.datacrime.departement[0].numero + ')' : ''}
        {state.datacrime.ratioCrimePop ? RatioPopCrime(state.datacrime.ratioCrimePop) : ''}
        {state.datacrime.crimeForDept ? MostIllegalActions(state.datacrime.crimeForDept, actions) : ''}
      </div>
      <div classList="row">
        {state.datacrime.probCrime ? LocalDanger(state.datacrime.probCrime) : ''}
        {state.timedata.data.length > 0 ? CrimeEvolution(state.timedata) : ''}
      </div>
      <div id="backimg">
        <img src="./assets/datacrime.png"/>
      </div>
    </div>
  )
}
