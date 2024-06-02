import React, { useState } from 'react';
import {Grid, Paper, Tooltip, Typography, Container, Box, Button } from '@mui/material';

// import icon
import { MdEdit, MdDelete } from "react-icons/md";

// import Component
import FormEdit from "./FormEdit";
import { typeCommentUser, typePostingUser } from './API';

interface Props {
  pos: typePostingUser;
  handleOkeEdit(editBody: string, editTitle: string, idPosting: number): void;
  index: any;
  handleRemovePostingan(id: unknown): void; 
  commentUser: typeCommentUser[];
}

const DataPostingUser = ({pos, handleOkeEdit, index, handleRemovePostingan, commentUser }: Props) => {

  const [editButton, setEditButton] = useState<boolean>(false);

  const openEditButton = () => {
    setEditButton(!editButton);
  } 
  return (
    <Grid item key={pos.id} md={4}>
      <Paper sx={{ p: 1, m: 2 }} elevation={3}>
        <Tooltip title="number" placement="left-start">
          {index + 1}
        </Tooltip>
        {editButton ? (
          <FormEdit
            title={pos.title}
            body={pos.body}
            idPosting={pos.id}
            eventHandler={handleOkeEdit}
            editButton={editButton}
            setEditButton={setEditButton}
          />
        ) : (
          <React.Fragment>
            <Typography variant="h6" sx={{ px: 2, fontWeight: 600 }}>
              {pos.title}
            </Typography>
            <Typography variant="h6" sx={{ px: 2 }}>
              {pos.body}
            </Typography>
          </React.Fragment>
        )}

        <Container>
          {!editButton && (
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
                color="secondary"
                sx={{ mr: 2 }}
                onClick={openEditButton}
              >
                <MdEdit style={{ fontSize: 18, marginRight: 4 }} />
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{ mr: 2 }}
                onClick={() => handleRemovePostingan(pos.id)}
              >
                <MdDelete style={{ fontSize: 18, marginRight: 4 }} />
                Delete
              </Button>
            </Box>
          )}
        </Container>
        <Typography sx={{ mt: 4 }} variant="h6">
          Comments:
        </Typography>
        <Box
          sx={{
            mt: 1,
            borderBlockStart: 1,
            display: "flex",
            flexDirection: "column",
            height: 215,
            overflow: "auto",
          }}
        >
          {commentUser?.map((comm) =>
            pos.id === comm.postId ? (
              <Box
                key={comm.id}
                sx={{ mt: 2, p: 1, border: 1, borderRadius: 4 }}
              >
                <Typography sx={{ fontSize: 19, fontWeight: "bold" }}>
                  {comm.email}
                </Typography>
                <Typography>{comm.body}</Typography>
              </Box>
            ) : (
              ""
            )
          )}
        </Box>
      </Paper>
    </Grid>
  );
}

export default DataPostingUser