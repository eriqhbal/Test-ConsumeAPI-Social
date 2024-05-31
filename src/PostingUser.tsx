import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, 
         Typography, 
         Paper, 
         Grid, 
         Tooltip, 
         Box, 
         TextField,
         Button } from '@mui/material';

// import api
import { getUserPosting, getDetailUser, getCommentUser, typeCommentUser, typePostingUser, dataPengguna } from './API';

const PostingUser = () => {
  const [detailUser, setDetailUser] = useState<dataPengguna>();
  const [commentUser, setCommentUser] = useState<Array<typeCommentUser>>([]);
  const [dataPosting, setDataPosting] = useState<Array<typePostingUser>>([]);
  const { userId } = useParams();

  useEffect(() => {
    const getDataPost = async () => {
      const getDetail = await getDetailUser(userId);
      const getData = await getUserPosting(userId);
      const getComment = await getCommentUser(userId);
      setDetailUser(getDetail);
      setDataPosting(getData);
      setCommentUser(getComment);
    }

    getDataPost();
  },[userId]);

  const submitNewPosting = (e: React.FormEvent) => {
    e.preventDefault();
  }

  console.log(dataPosting);
  return (
    <React.Fragment>
      <Container maxWidth="sm" sx={{ p: 3 }}>
        <Typography sx={{ textAlign: "center", fontSize: "3rem" }}>
          {detailUser?.name}
        </Typography>
        <Typography sx={{ textAlign: "center", fontSize: "2.1rem" }}>
          {detailUser?.username}
        </Typography>
        <Typography sx={{ textAlign: "center", fontSize: "1.6rem", mb: 1 }}>
          {detailUser?.email}
        </Typography>
        <Typography sx={{ textAlign: "center", fontSize: "1.1rem" }}>
          {detailUser?.phone}
        </Typography>
        <Typography variant="h4" sx={{ mt: 4, textAlign: "center" }}>
          POSTINGAN
        </Typography>
      </Container>
      <Container maxWidth="lg">
        <Box sx={{ my: 2 }}>
          <Typography
            sx={{ fontSize: 26, width: "20%", textAlign: "center", mx: "auto" }}
          >
            New Post
          </Typography>
          <Container sx={{ maxWidth: "100%", width: 500 }}>
            <form onSubmit={submitNewPosting}>
              <TextField fullWidth placeholder="New Postingan" />
              <Button type='submit' variant='contained' sx={{mt: 1, mx: '40%'}}>Enter</Button>
            </form>
          </Container>
        </Box>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 8 }}
        >
          {dataPosting?.map((pos, index) => (
            <Grid item key={pos.id} md={4}>
              <Paper sx={{ p: 1, m: 2 }} elevation={3}>
                <Tooltip title="number" placement="left-start">
                  {index + 1}
                </Tooltip>
                <Typography variant="h6" sx={{ px: 2 }}>
                  {pos.title}
                </Typography>
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
                  {commentUser?.map((comm) => (
                    <Box
                      key={comm.id}
                      sx={{ mt: 2, p: 1, border: 1, borderRadius: 4 }}
                    >
                      <Typography sx={{ fontSize: 19, fontWeight: "bold" }}>
                        {comm.email}
                      </Typography>
                      <Typography>{comm.body}</Typography>
                    </Box>
                  ))}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default PostingUser;