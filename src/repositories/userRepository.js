const { db, bucket } = require('../utils/firebase.js');
const BaseRepository = require('./baseRepository.js');

class UserRepository extends BaseRepository {
    constructor() {
        super(db.collection('users'));
    }

    async getUserByUid(uid) {
        const snapshot = await this.collection.where('auth_uid', '==', uid).get();

        console.log("snapshot", snapshot);
        if (snapshot.empty) {
            throw new Error('User not found');
        }
        return { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
    }


    async updateUserProfilePicture(uid, file) {
        try {
            const destination = `profile_photos/${file.originalname}`;

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

            const user = await this.getUserByUid(uid);
            this.collection.doc(user.id).update({ profile_img_url: publicUrl });
            
            return { ...user, profile_img_url: publicUrl }; 
        } catch (error) {
            console.error('Error al subir la foto de perfil:', error);
            throw new Error('Error al subir la foto de perfil');
        }
    }
}

module.exports = UserRepository;