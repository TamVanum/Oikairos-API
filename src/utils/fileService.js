const { bucket } = require("../config/firebase");




const fileUpload = async (destination, file) => {
    try {
        const url = `${destination}${file.originalname}`;

        const fileUpload = bucket.file(url);
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


module.exports = fileUpload;