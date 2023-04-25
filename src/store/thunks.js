
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirabaseDB } from '../firebase/config';
import { addNewEmptyNote, savingNewNote, setActiveNote, setNotes, setSaving, updateNote } from "./journalSlice"


export const startNewNote = () => {
    return async( dispatch , getState ) => {
        dispatch( savingNewNote() );

        const { uid } = getState().auth; 
        const newNote = { title: '' , body: '', date: new Date().getTime() }

        // API end point - tm1eXvadvWfibYnylI051zx48sd2/journal/notes/hCLA1f5iwfxXWLu97V1q
        const newDoc = doc( collection( firabaseDB, `${ uid }/journal/notes`));
        await setDoc( newDoc, newNote );

        newNote.id = newDoc.id;

        dispatch( addNewEmptyNote( newNote ));
        dispatch( setActiveNote( newNote));        
    }
}


export const startLoadingNotes = () => {
        return async( dispatch, getState ) => {
            const { uid } = getState().auth; 

            if( !uid ) throw new Error('El UID del usuario no existe');

            const notes = await loadNotes( uid );
            dispatch( setNotes( notes ));
        }
}

export const startSaveNote = () => {
    return async(dispatch,getState) =>
    {
        dispatch( setSaving() );

        const { uid } = getState().auth; 
        const { active:note } = getState().journal;

        const noteToFireStore = { ...note };
        delete noteToFireStore.id;

        const docRef = doc( FirabaseDB, `${ uid }/journal/notes/${ note.id }`); 
        await setDoc( docRef, noteToFireStore, { merge: true });

        dispatch( updateNote( note));

    }
}
