import React from "react";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <Grid container spacing={2} sx={{ marginLeft: { xs: 1 } }}>
      <Grid item xs={12}>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"flex-start"}
          width={1}
          flexDirection={{ xs: "column", sm: "row" }}
        >
          <Box>
            <Box
              component='button'
              onClick={() => navigate("/")}
              width={80}
              style={{ all: "unset", cursor: "pointer" }}
            >
              <Box
                component={"img"}
                src='/images/idrive-logo.png'
                height='20vh'
              />
            </Box>
            <br />
            <br />
            <Box
              display={"flex"}
              justifyContent={"space-around"}
              alignItems={"end"}
              ml={2}
            >
            </Box>
            <br />
          </Box>
          <Box>
            <Typography
              variant='h4'
              align={"center"}
              data-aos={"fade-up"}
              gutterBottom
              sx={{
                fontWeight: 700,
                textAlign: "left",
              }}
            >
              Quick Links
            </Typography>
            <Box marginTop={1} marginRight={2}>
              <Link
                underline='none'
                component='button'
                onClick={() => navigate("/about")}
                color='text.primary'
                variant={"subtitle2"}
              >
                About
              </Link>
            </Box>
            <Box marginTop={1} marginRight={2}>
              <Link
                underline='none'
                component='button'
                onClick={() => navigate("/contact")}
                color='text.primary'
                variant={"subtitle2"}
              >
                Contact
              </Link>
              <br />
            </Box>
            <Box marginTop={1} marginRight={2}>
              <Link
                underline='none'
                component='button'
                onClick={() => navigate("/login")}
                color='text.primary'
                variant={"subtitle2"}
              >
                Login
              </Link>
            </Box>
            <Box marginTop={1} marginRight={2}>
              <Link
                underline='none'
                component='button'
                onClick={() => navigate("/signup")}
                color='text.primary'
                variant={"subtitle2"}
              >
                Signup
              </Link>
            </Box>
          </Box>
          <Box>
            <Typography
              variant='h4'
              align={"center"}
              data-aos={"fade-up"}
              gutterBottom
              sx={{
                fontWeight: 700,
                textAlign: "left",
              }}
            >
              Newsletter
            </Typography>
            <TextField
              label='NewsLetter'
              variant='outlined'
              name={"NewsLetter"}
              fullWidth
            />
          </Box>
        </Box>
        <br />
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Typography
          align={"center"}
          variant={"subtitle2"}
          color='text.secondary'
        >
          &copy; IDrive. 2024.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;
