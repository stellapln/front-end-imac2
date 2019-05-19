import { h } from 'hyperapp'

export default (props, actions) =>
  <div classList="block-card">
    <div id="first-illagal-action">
      <h2>Action illégale la plus courante</h2>
      <div classList="list-line timehover" title="Voir l'évolution temporelle"><span class="data-big">{props[0].s_nombre}<span class="par_an">/an</span></span><span classList="data-description">{props[0].categorie}</span></div>
      <div class="details">Données 2014 relevées par les services de police et de gendarmerie. Cette données est à mettre en relation avec le rapport Actions illégales / Population</div>
    </div>
    <div>
      <div classList="list-line">
        Autres actions illégales les plus courantes à proximité
      </div>
      {props.slice(1, 9).map(obj => <div classList="list-line timehover" title="Voir l'évolution temporelle" onclick={() => actions.getTimedata(obj.id)}><span classList="data-big">{obj.s_nombre}<span class="par_an">/an</span></span><span class="data-description">{obj.categorie}</span></div>)}
    </div>
  </div>
