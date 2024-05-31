import React, { useState, useEffect } from 'react';
import { Avatar, Box, Grid, Typography, Button } from "@mui/material";

// Router DOM
import { useNavigate } from 'react-router-dom';

// import API
import { getDataPengguna, dataPengguna } from './API';

// import icon
import { IoPerson } from "react-icons/io5";

const App = () => {
  const [dataPengguna, setDataPengguna] = useState<Array<dataPengguna>>([]);
  const navigateTo = useNavigate();

  useEffect(() => {
    getDataUser();
  },[]);

  async function getDataUser() {
    const data = await getDataPengguna();
    setDataPengguna(data);
  }

  const movingDetailPosting = (id: number) => {
    navigateTo(`/posting/${id}`);
  }


  return (
    <Box sx={{ width: "100%", flexDirection: "column" }}>
      <Grid
        container
        justifyContent="start"
        rowGap={2}
        columnGap={2}
        sx={{ p: 4 }}
      >
        {dataPengguna.map((user: dataPengguna) => (
          <Grid
            item
            key={user.id}
            xs={2.5}
            sx={{ borderRadius: "10px", border: 1.4, overflow: "hidden" }}
          >
            <Avatar
              alt={user.name}
              sx={{ mx: "auto", my: 1, bgcolor: "#6B8A7A" }}
            >
              <IoPerson />
            </Avatar>
            <Box sx={{ my: 1 }}>
              <Typography sx={{ fontSize: 19, ml: 1 }}>{user.name}</Typography>
              <Typography sx={{ fontSize: 15, ml: 1}}>{user.phone}</Typography>
              <Typography sx={{ fontSize: 15, ml: 1}}>{user.email}</Typography>
            </Box>
            <Button variant='contained' onClick={() => movingDetailPosting(user.id)} sx={{ mx: 5, mb: 1}}>Detail Posting</Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default App;