const route = require('express').Router();
const multer = require('multer');
const diskStorage = require('../middleware/uploadFile');
const {postFile} = require('../controllers/index')

route.post('/file', multer({ storage: diskStorage }).single("file"), postFile);

module.exports = route