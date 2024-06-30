/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import useMediaQuery from "@mui/material/useMediaQuery";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const WhoWeAre = () => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });

  return (
    <Box>
      <Grid container spacing={4} direction={isMd ? "row" : "column"}>
        <Grid
          item
          container
          alignItems={"center"}
          justifyContent='center'
          xs={12}
          md={6}
        >
          <Box>
            <Typography variant={"h4"} gutterBottom sx={{ fontWeight: 700 }}>
              Who are we?
            </Typography>
            <Typography component={"p"} color={"text.secondary"}>
              We are a team of technology enthusiasts and education reformers.
              Our experts come from diverse backgrounds in tech development,
              educational administration, and business management. United by our
              commitment to enhancing educational experiences through
              technology, we're dedicated to providing solutions that not only
              simplify administrative processes but also enrich the learning
              journey of every student.
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          container
          justifyContent='center'
          alignItems='center'
          xs={12}
          md={6}
        >
          <Box>
            <Typography variant={"h4"} gutterBottom sx={{ fontWeight: 700 }}>
              Our process
            </Typography>
            <Typography component={"p"} color={"text.secondary"}>
              Our process is centered around continuous improvement and
              user-focused design. We start by understanding the unique
              challenges faced by driving schools, then move to develop and
              refine our software based on real-world feedback. This approach
              ensures that IDrive is always evolving — designed for driving
              schools, by the people who know them best. Our deployment includes
              comprehensive training, followed by ongoing support and regular
              updates, ensuring that each client gets the most out of their
              investment.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WhoWeAre;
