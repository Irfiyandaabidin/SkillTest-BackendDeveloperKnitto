const {connection, getConnection} = require('../database/index')
const getProduct = async(req, res) => {
  try {
    await getConnection.query(
      `SELECT * FROM produk`, (error, results, fields) => {
        if(error) throw error;
        res.status(200).json({
          message: 'Get Produk Succesfully!',
          error: false,
          data: results,
          statusCode: 200
        })
      }
    )
  } catch(err) {
    res.status(500).send({
      message: err,
      error: true,
      data: null,
      statusCode: 500
    })
  }
}

module.exports = {
  getProduct
}