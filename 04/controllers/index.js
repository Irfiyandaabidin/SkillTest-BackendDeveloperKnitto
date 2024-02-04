const postFile = (req, res) => {
  try {
    if(!req.file) {
      return res.status(400).json({
        message: 'No File is selected',
        error: true,
        data: null,
        statusCode: 400
    })}
    const file = req.file.path;
    res.status(200).send({
      message: 'Upload image successfully.',
      error: false,
      statusCode: 200,
      path: file
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
      error: true,
      data: null,
      statusCode: 500
    })
  }
}

module.exports = {postFile}