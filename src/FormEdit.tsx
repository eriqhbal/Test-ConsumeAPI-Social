import React, {useState} from 'react';
import { Box, TextField, Button } from '@mui/material';

type Props = {
  title: string;
  body: string;
  idPosting: number;
  eventHandler(
    editBody: string,
    editTitle: string,
    idPosting: number
  ): void;
  editButton: boolean;
  setEditButton: React.Dispatch<React.SetStateAction<boolean>>;
};

const FormEdit = ({title, body, idPosting,  eventHandler, editButton, setEditButton}: Props) => {
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
      <Box
        sx={{
          mx: "auto",
          width: 400,
          textAlign: "center",
          mt: 2,
        }}
      >
        <Button
          variant="contained"
          color="success"
          onClick={() => {
            eventHandler(editBody, editTitle, idPosting);
            setEditButton(!editButton)}}
          sx={{ width: "100%" }}
        >
          Done
        </Button>
      </Box>
      
    </Box>
  );
  
}

export default FormEdit;