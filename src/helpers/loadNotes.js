

import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadNotes = async( uid = '') => {
    if( !uid ) throw new Error('El UID del usuario no existe');
    
    // Referencia a Firebase
    const collectionRef = collection( FirebaseDB, `${ uid }/journal/notes`);
    // Respuesta Firabase para obtener los documentos de Notes
    const docs = await getDocs(collectionRef);

    const notes = [];

    docs.forEach( doc => {
        // console.log(doc.data());
        notes.push({ id: doc.id, ...doc.data() });
    });
    
    // console.log(notes);
    
    return notes;
}