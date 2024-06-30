import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Main from "../../../GeneralComponents/Main";
import Container from "../../../MainLayouts/Container";
import Form  from "./Form.js";

const LoginPage = () => {
  return (
    <Main>
      <Box
        position={"relative"}
        minHeight={"calc(100vh - 247px)"}
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        height={1}
      >
        <Container>
          <Grid container >
            <Grid
              item
              container
              justifyContent={"center"}
              xs={12}
              md={12}
            >
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Main>
  );
};

export default LoginPage;
