import { h } from 'hyperapp'

export default (props) =>
  <div classList="big-block">
    <h2>Dangers locaux</h2>
    <div classList="container-for-grid">
      {props.slice(0, 6).map(obj => <div classList="big-card">{obj.categorie} <span classList="big-card-pourcent">{obj.prob}<span classList="pourcent-sign">%</span></span><div class="details">(Est plus élevée de {obj.prob}% par rapport à la moyenne française)</div></div>)}
    </div>
  </div>
