
export default {
  exampleSetState: (value) => (state) => ({
    ...state,
    input: {...state.input, value: value}
  }),
  logEvent: (payload) => (state) => {
    console.log(payload.name, payload.event)
    return state
  },
  searchCity: (value) => (state, actions) => {
    if (value !== '') {
      fetch('http://localhost:8080/ville_autocomplete/' + value)
        .then(response => response.json())
        .then(data => {
          actions.setAutocompletion({city: value, autocomp: data})
        })
    } else {
      return {...state, city: value, autocomplete: []}
    }
  },
  setAutocompletion: (probs) => (state) => ({...state, city: probs.city, autocomplete: probs.autocomp, datacrime: {error: ''}}),
  setCity: (value) => (state, actions) => {
    if (value !== '') {
      fetch('http://localhost:8080/crime/' + value)
        .then(response => response.json())
        .then(data => {
          console.log(data)
          actions.setCrimes({city: value, datacrime: data})
        })
    } else {
      return {...state, datacrime: {error: 'Veuillez entrer le nom d\'une ville'}}
    }
  },
  setCrimes: (probs) => (state) => ({...state, city: probs.city, datacrime: probs.datacrime, autocomplete: []}),
  getTimedata: (value) => (state, actions) => {
    fetch('http://localhost:8080/evolution/' + value)
      .then(response => response.json())
      .then(data => {
        actions.setTimedata({id: value, data: data})
      })
  },
  setTimedata: (probs) => (state) => ({...state, idhover: probs.id, timedata: {data: probs.data, maxtimedata: probs.data.length > 0 ? probs.data.map(obj => obj.n).reduce((acc, val) => val > acc ? val : acc) : 0}})
}
