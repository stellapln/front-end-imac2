import { h } from 'hyperapp'

export default (props) =>
  <div classList="block-card">
    <h2>Ratio Action illégale / Population</h2>
    <div classList="list-line"><span class="data-big">{Math.round(props.ratio * 10000) / 100}<span class="par_an">%</span></span><span classList="data-description">Soit {props.nbcrime} actions illégales comises pour une population de {props.pop} habitants. (La moyenne en France est de 5.83%)</span></div>
  </div>
