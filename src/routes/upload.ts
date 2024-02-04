import express from 'express';
import multer from 'multer';
import diskStorage from '../middlewares/uploadFile';
import PostFileController from '../controllers/upload'
import checkJwt from '../middlewares/checkJwt';

const route = express.Router();

route.post('/', checkJwt, multer({ storage: diskStorage }).single("file"), PostFileController);

export default route