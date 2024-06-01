import React, {useState} from 'react';
import { Box, TextField } from '@mui/material';

type Props = {
   title: string,
   body: string,
   idUser: number,
   idPosting: number
};

const FormEdit = ({title, body, idUser, idPosting}: Props) => {
  const [editBody, setEditBody] = useState<string>(body);
  const [editTitle, setEditTitle] = useState<string>(title);


  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <TextField
        label="Title"
        value={editTitle}
        onChange={(e) => setEditTitle(e.target.value)}
        sx={{ my: 2 }}
      />
      <TextField
        label="Body"
        value={editBody}
        onChange={(e) => setEditBody(e.target.value)}
      />
    </Box>
  );
  
}

export default FormEdit;