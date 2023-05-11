import { useMemo, useEffect } from 'react';
import { SaveOutlined, UploadOutlined , DeleteOutline} from '@mui/icons-material';
import { Button, FilledInput, Grid, IconButton, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { ImageGallery } from '../components';
import { startSaveNote ,setActiveNote ,startDeleteNote} from '../../store/journal';


export const NoteView = () => {
  const dispatch = useDispatch();

  const { active:note, isSaving } = useSelector( state => state.journal );

   const { body , title, date, onInputChange, formState } = useForm( note );

   const dateString = useMemo( () =>{
        const newDate = new Date( date );
        return newDate.toUTCString();
   },[date]);


   useEffect(() => {
        dispatch( setActiveNote(formState));
   }, [formState])

   const onSaveNote = () => {
        dispatch( startSaveNote() )
   }

   const onDelete = () =>{
        dispatch(startDeleteNote() );
   }

   return (
    <Grid 
        container 
        direction='row' 
        justifyContent='space-between' 
        alignItems='center' sx={{ mb: 1 }}
        >
        <Grid item>
            <Typography fontSize={ 39 } fontWeight='light' >{ dateString }</Typography>
        </Grid>
        <Grid item>
            <input
                type="file"
                multiple
                // ref={ fileInputRef}
                // onChange={ onFileInputChange }
                style={{ display: 'none' }}
            />
            <IconButton
                color="primary"
                disabled={ isSaving }
                // onClick={ () => fileInputRef.current.click() }
            >
                <UploadOutlined />
            </IconButton>

            <Button 
                disabled={ isSaving }
                onClick={ onSaveNote }
                color="primary" 
                sx={{ padding: 2 }}
                >
                <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                Guardar
            </Button>
        
        </Grid>

        <Grid container>
            <TextField 
                type="text"
                variant="filled"
                fullWidth
                placeholder="Ingrese un título"
                label="Título"
                sx={{ border: 'none', mb: 1 }}
                name="title" 
                value={ title }
                onChange={ onInputChange }
            />

            <TextField 
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="¿Qué sucedió en el día de hoy?"
                minRows={ 5 }
                name="body"
                value={ body }
                onChange={ onInputChange }
            />
        </Grid>
        <Grid>
            <Button
                onClick={ onDelete }
                sx={{  mt: 2 }}
                color="error"
                >
                <DeleteOutline/>
            </Button>
        </Grid>

        {/* Image gallery */}
        {/* <ImageGallery/> */}


    </Grid>
  )
}
