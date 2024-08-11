const express = require('express');
const cors = require('cors')
const multer = require('multer');
const { bucket } = require('./utils/firebase.js');
const logger = require('morgan');
const cookieParser = require('cookie-parser');

const indexRouter = require('./routes/index.js');
const usersRouter = require('./routes/users.js');
const authRoutes = require('./routes/auth.js');

// const authMiddleware = require('./middlewares/firebaseJwtAuth.js');


const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/auth', authRoutes);

const upload = multer({ storage: multer.memoryStorage() });

app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const file = req.file;
        console.log(file);
        if (!file) {
            return res.status(400).send('No file uploaded.');
        }

        // Ruta en Firebase Storage donde se guardará la imagen
        const destination = `uploads/${file.originalname}`;

        // Referencia al archivo en Firebase Storage
        const fileUpload = bucket.file(destination);

        // Subir el archivo a Firebase Storage
        await fileUpload.save(file.buffer, {
            metadata: {
                contentType: file.mimetype,
            },
        });

        // Opcional: hacer el archivo público
        await fileUpload.makePublic();

        // Obtener la URL pública del archivo
        const publicUrl = fileUpload.publicUrl();

        res.status(200).send({ message: 'File uploaded successfully', url: publicUrl });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).send('Error uploading file.');
    }
});
// app.use(authMiddleware);
module.exports = app;