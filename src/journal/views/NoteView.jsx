import { useMemo, useEffect } from 'react';
import { SaveOutlined } from '@mui/icons-material';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { ImageGallery } from '../components';
import { setActiveNote } from '../../store/journal';


export const NoteView = () => {
  const dispatch = useDispatch();

  const { active:note } = useSelector( state => state.journal );

   const { body , title, date, onInputChange, formState } = useForm( note );

   const dateString = useMemo( () =>{
        const newDate = new Date( date );
        return newDate.toUTCString();
   },[date]);

   useEffect(() => {
        dispatch( setActiveNote(formState));
   }, [formState])
   

  return (
    <Grid container direction='row' justifyContent='space-between' alignItems='center' sx={{ mb: 1 }}>
        <Grid item>
            <Typography fontSize={ 39 } fontWeight='light' >{ dateString }</Typography>
        </Grid>
        <Grid item>
            <Button color="primary" sx={{ padding: 2 }}>
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
                value={ title }
            />

            <TextField 
                type="text"
                variant="filled"
                fullWidth
                multiline
                placeholder="¿Qué sucedió en el día de hoy?"
                minRows={ 5 }
                value={ body }
            />
        </Grid>

        {/* Image gallery */}
        {/* <ImageGallery/> */}


    </Grid>
  )
}
