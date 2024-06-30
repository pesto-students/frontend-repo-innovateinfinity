import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { alpha, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router";

const Hero = () => {
  const theme = useTheme();

  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });

  const navigate = useNavigate();

  return (
    <Grid container spacing={4}>
      <Grid item container xs={12} md={6} alignItems={"center"}>
        <Box data-aos={isMd ? "fade-right" : "fade-up"}>
          <Box marginBottom={2}>
            <Typography
              variant='h3'
              color='text.primary'
              sx={{ fontWeight: 700 }}
            >
              Streamline with <br />
              <Typography
                color={"primary"}
                component={"span"}
                variant={"inherit"}
                sx={{
                  background: `linear-gradient(180deg, transparent 82%, ${alpha(
                    theme.palette.secondary.main,
                    0.3
                  )} 0%)`,
                }}
              >
                IDrive{" "}
              </Typography>
              Your Online Driving School Manager{" "}
            </Typography>
          </Box>
          <Box marginBottom={3}>
            <Typography variant='h6' component='p' color='text.secondary'>
              Say goodbye to cumbersome attendance sheets. Embrace the ease of
              IDrive – your all-in-one online solution for driving school
              management.
              {/* <br />
              Save yourself time and money. */}
            </Typography>
          </Box>
          <Box
            display='flex'
            flexDirection={{ xs: "column", sm: "row" }}
            alignItems={{ xs: "stretched", sm: "flex-start" }}
          >
            <Button
              variant='contained'
              color='primary'
              size='large'
              fullWidth={isMd ? false : true}
              onClick={() => navigate("/signup")}
            >
              Start now
            </Button>
            {/* <Box
              component={Button}
              variant='outlined'
              color='primary'
              size='large'
              marginTop={{ xs: 2, sm: 0 }}
              marginLeft={{ sm: 2 }}
              fullWidth={isMd ? false : true}
            >
              Learn more
            </Box> */}
          </Box>
        </Box>
      </Grid>
      <Grid
        item
        container
        alignItems={"center"}
        justifyContent={"center"}
        xs={12}
        md={6}
        data-aos='flip-left'
        data-aos-easing='ease-out-cubic'
        data-aos-duration='2000'
      >
        <Box
          component={LazyLoadImage}
          height={1}
          width={1}
          // src={"https://assets.maccarianagency.com/screenshots/dashboard.png"}
          src={'/images/banner_image.png'}
          alt='...'
          effect='blur'
          boxShadow={3}
          borderRadius={2}
          maxWidth={600}
          sx={{
            filter: theme.palette.mode === "dark" ? "brightness(0.7)" : "none",
          }}
        />
      </Grid>
    </Grid>
  );
};

export default Hero;
