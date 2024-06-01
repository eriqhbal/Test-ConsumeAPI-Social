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

// import icon
import { MdEdit, MdDelete } from "react-icons/md";

// import api
import { getUserPosting, 
         getDetailUser, 
         getCommentUser, 
         typeCommentUser, 
         typePostingUser, 
         dataPengguna, 
         postPostingan,
         removePost } from './API';
import FormEdit from './FormEdit';

const PostingUser = () => {
  const [body, setBody] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  const [editButton, setEditButton] = useState<boolean>(false);
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

    const dataId: Array<number> = [];
    dataPosting.map((data) => {
          dataId.push(data.id);
    })

      dataId.forEach(async (number) => {
        const dataComm = await getCommentUser(number);
        setCommentUser(prev => [...prev, ...dataComm]);
      })

  },[dataPosting]);

  const submitNewPosting = async (e: React.FormEvent) => {
    e.preventDefault();
    const newData = await postPostingan(title, body, userId);

    setDataPosting(prev => [...prev, newData]);
    setTitle("");
    setBody("");
  }

  const handleEditPostingan = async (postNum: number,) => {
    console.log(postNum);
    setEditButton(!editButton);
  }

  const handleOkeEdit = async (id: number) => {
    setEditButton(!editButton);
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
          {dataPosting?.map((pos, index) => (
            <Grid item key={pos.id} md={4}>
              <Paper sx={{ p: 1, m: 2 }} elevation={3}>
                <Tooltip title="number" placement="left-start">
                  {index + 1}
                </Tooltip>
                {editButton ? (
                  <FormEdit title={pos.title} body={pos.body} idUser={pos.userId} idPosting={pos.id}/>
                ) : (
                  <React.Fragment>
                    {" "}
                    <Typography variant="h6" sx={{ px: 2, fontWeight: 600 }}>
                      {pos.title}
                    </Typography>
                    <Typography variant="h6" sx={{ px: 2 }}>
                      {pos.body}
                    </Typography>
                  </React.Fragment>
                )}

                <Container>
                  {editButton ? (
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
                        onClick={() => handleOkeEdit(pos.id)}
                        sx={{ width: "100%" }}
                      >
                        Done
                      </Button>
                    </Box>
                  ) : (
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
                        onClick={() => handleEditPostingan(pos.id)}
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
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
}

export default PostingUser;