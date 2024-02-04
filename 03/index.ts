const axios = require('axios');

const fetchAPIGet = async() => {
  try {
    await axios.get('https://osdr.nasa.gov/genelab/data/glds/files/87')
    .then((response) => {
      console.log(response.data)
    })
  } catch (err) {
    console.log(err);
  }
}

const fetchWilayahIndonesia = async() => {
  try {
    await axios.get('https://api.binderbyte.com/wilayah/provinsi?api_key=6f4229418963dfb8ffbd6f6f873a45b5c8fb815aa942c5f711fc72ea7d73f57a')
    .then((response) => {
      console.log(response.data)
    })
  } catch(err) {
    console.log(err)
  }
}

fetchAPIGet()
fetchWilayahIndonesia()