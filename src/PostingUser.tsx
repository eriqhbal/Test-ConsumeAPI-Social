import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Paper, Grid  } from '@mui/material';

// import api
import { getUserPosting, getDetailUser, typePostingUser, dataPengguna } from './API';



const PostingUser = () => {
  const [detailUser, setDetailUser] = useState<dataPengguna>();
  const [dataPosting, setDataPosting] = useState<Array<typePostingUser>>([]);
  const { userId } = useParams();

  useEffect(() => {
    const getDataPost = async () => {
      const getDetail = await getDetailUser(userId);
      const getData = await getUserPosting(userId);
      setDetailUser(getDetail);
      setDataPosting(getData);
    }

    getDataPost();
  },[userId]);

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
      </Container>
      <Container maxWidth="lg" sx={{ mt: 2 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {dataPosting?.map((pos) => (
            <Grid item key={pos.id} md={4}>
              <Paper sx={{p: 1, m: 2}} elevation={3} >
                <Typography variant='h6' sx={{px: 2}}>
                  {pos.title}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default PostingUser;