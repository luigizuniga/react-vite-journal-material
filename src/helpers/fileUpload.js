export const fileUpload = async( file ) => {
    
    if( !file ) throw new Error('No hay ficheros a subir');
    
    const cloudUrl = 'https://api.cloudinary.com/v1_1/program-course/upload';
    const formData = new FormData();
    
    formData.append('upload_preset','react-journal-material')
    formData.append('file', file);

    try {
        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body:formData
        });

        if( !resp.ok) throw new Error('No se puede cargar la imagen');
        const cloudResp = await resp.json();
        // console.log(cloudResp);

        return cloudResp.secure_url;

    } catch (error) {
        // console.log(error);
        throw new Error(error.message);
    }
}