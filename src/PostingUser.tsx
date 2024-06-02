import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, 
         Typography, 
         TextField,
         Box,
         Button,
         Grid,
         } from '@mui/material';

// import api
import { getUserPosting, 
         getDetailUser, 
         getCommentUser, 
         typeCommentUser, 
         typePostingUser, 
         dataPengguna, 
         postPostingan,
         editPostingan,
         removePost } from './API';
import DataPostingUser from './DataPostingUser';

const PostingUser = () => {
  const [body, setBody] = useState<string>("");
  const [title, setTitle] = useState<string>("");

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
    setCommentUser([]);
  },[userId]);

  useEffect(() => {
    setCommentUser([]);
    const dataId: Array<number> = [];
    dataPosting.map((data) => {
          dataId.push(data.id);
    })

      dataId.forEach(async (number) => {
        const dataComm = await getCommentUser(number);

        if(commentUser.some((val) => val.id === number)) {
          return;
        } else {
          setCommentUser((commentUser) => [...commentUser, ...dataComm]);
        }
        
      })

  },[dataPosting, userId]);

  const submitNewPosting = async (e: React.FormEvent) => {
    e.preventDefault();
    const newData = await postPostingan(title, body, userId);

    setDataPosting(prev => [...prev, newData]);
    setTitle("");
    setBody("");
  }

  const handleOkeEdit = async (editBody: string, editTitle: string, idPosting: number) => {
    const newData = await editPostingan(userId, idPosting, editTitle, editBody);
    console.log(newData, '');
    setDataPosting(dataPosting.map(data => data.id === idPosting ? newData : data));
    setCommentUser([]);
  }

  const handleRemovePostingan = async (id: number) => {
    const removeData = await removePost(id);

    if (removeData.ok) {
      setDataPosting(prev => prev.filter(data => data.id !== id));
      setCommentUser([]);
    }
  }

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
              <TextField
                fullWidth
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                sx={{ mb: 1 }}
              />
              <TextField
                fullWidth
                onChange={(e) => setBody(e.target.value)}
                placeholder="Text..."
              />
              <Button
                type="submit"
                variant="contained"
                sx={{ mt: 1, mx: "40%" }}
              >
                Enter
              </Button>
            </form>
          </Container>
        </Box>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 8 }}
        >
          {dataPosting?.map((pos, index) => {
            return (
            <DataPostingUser key={pos.id} pos={pos} handleOkeEdit={handleOkeEdit} index={index} handleRemovePostingan={handleRemovePostingan} commentUser={commentUser}/>
          )})}
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default PostingUser;