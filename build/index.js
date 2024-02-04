"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const produk_js_1 = __importDefault(require("./routes/produk.js"));
const upload_js_1 = __importDefault(require("./routes/upload.js"));
const fetchWilayah_js_1 = __importDefault(require("./routes/fetchWilayah.js"));
const errorController_js_1 = __importDefault(require("./controllers/errorController.js"));
const apiError_js_1 = __importDefault(require("./utils/apiError.js"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET;
app.listen(PORT, () => {
    console.log(`App running on PORT ${PORT}`);
});
app.use((0, morgan_1.default)('combined'));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use('/api/v1/produk', produk_js_1.default);
app.use('/api/v1/file', upload_js_1.default);
app.use('/api/v1/wilayah', fetchWilayah_js_1.default);
// Untuk test middleware check JWT, generate token dengan endpoint ini
app.post('/api/v1/generate-jwt', ((req, res) => {
    jsonwebtoken_1.default.sign({ message: "JWT token for testing middleware" }, JWT_SECRET || "SECRET", { expiresIn: 120000 }, (err, token) => {
        if (err)
            throw err;
        res.json({ token });
    });
}));
app.all('*', (req, res, next) => {
    next(new apiError_js_1.default(`Routes does not exist`, 404));
});
app.use(errorController_js_1.default);
