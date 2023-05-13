
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import { loadNotes } from '../../helpers/loadNotes';
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice"
import { fileUpload } from '../../helpers/fileUpload';

export const startNewNote = () => {
    return async (dispatch, getState) => {
        dispatch(savingNewNote());
        // Obtener UID action reducer
        const { uid } = getState().auth;

        // Collection Firebase body
        const newNote = {
            title: '',
            body: '',
            imageUrls: [],
            date: new Date().getTime()
        };

        // Referencia a Firebase
        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
        // Respuesta Firabase con newNote enviada
        await setDoc(newDoc, newNote);
        newNote.id = newDoc.id;

        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
    }
}

// carga de las notas desde Firebase
export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        // Obtenermos UID del State
        const { uid } = getState().auth;
        if (!uid) throw new Error('El UID del usuario no existe');
        // Promesa que retorna las notas del usuario por UID
        const notes = await loadNotes(uid);
        // Dispatch funcion para enviar una acción a un store de Redux
        dispatch(setNotes(notes));
    }
}


export const startSaveNote = () => {
    return async (dispatch, getState) => {
        dispatch(setSaving());
        // Obtenermos UID del State
        const { uid } = getState().auth;
        // Obtenermos las notas activas
        const { active: note } = getState().journal;
        const noteToFireStore = { ...note };

        delete noteToFireStore.id;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)

        await setDoc(docRef, noteToFireStore, { merge: true });
        dispatch(updateNote(note));
    }
}

export const startUploadingFile = (files = []) => {
    return async (dispatch) => {
        dispatch(setSaving());
        //   await fileUpload( files[0] );
        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file));
        }

        const photoUrls = await Promise.all(fileUploadPromises);
        // console.log(photoUrls);
        dispatch(setPhotosToActiveNote(photoUrls));
    }
}

export const startDeleteNote = () => {
    return async (dispatch, getState) => {
        // Obtenermos UID del State
        const { uid } = getState().auth;
        // Obtenermos las notas activas
        const { active: note } = getState().journal;
        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);

        await deleteDoc(docRef);
        dispatch(deleteNoteById(note.id));
    }
}