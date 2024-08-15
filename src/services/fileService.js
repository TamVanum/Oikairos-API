const { bucket } = require("../utils/firebase");


class FileService {

    static async uploadFile(file) {
        try {
            const destination = `profile_photos/${file.originalname}`;

            const fileUpload = bucket.file(destination);
            await fileUpload.save(file.buffer, {
                metadata: {
                    contentType: file.mimetype,
                },
            });

            await fileUpload.makePublic();
            return fileUpload.publicUrl();
        } catch (error) {
            console.error('Error al subir la foto de perfil:', error);
            throw new Error('Error al subir la foto de perfil');
        }
    }
}

module.exports = FileService;