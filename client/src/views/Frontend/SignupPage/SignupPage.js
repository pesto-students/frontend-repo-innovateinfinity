import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Main from "../../../GeneralComponents/Main/index.js";
import Container from "../../../MainLayouts/Container.js";
import Form from "./Form.js";

const SignupPage = () => {

  return (
    <Main>
      <Box
        position={"relative"}
        minHeight={"calc(100vh - 247px)"}
        display={"flex"}
        justifyContent={"center"}
        height={1}
      >
        <Container>
          <Grid container>
            <Grid item container justifyContent={"center"} xs={12} md={12}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Main>
  );
};

export default SignupPage;
