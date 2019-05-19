import { h } from 'hyperapp'

export default (props) =>
  <div classList="block-card">
    <h2>Évolution de l'action illégale</h2>
    <div class="details">De janvier 2000 à mars 2019</div>
    <div class="graph">
      {props.data.map(obj => <div class="graph-bar" style={'height:' + Math.round((obj.n / props.maxtimedata) * 100) + '%'}></div>)}
    </div>
  </div>
