import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router";

const Pricing = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });

  return (
    <Box>
      <Box marginBottom={4}>
        <Typography
          variant='h4'
          align={"center"}
          data-aos={"fade-up"}
          gutterBottom
          sx={{
            fontWeight: 700,
            marginTop: theme.spacing(1),
          }}
        >
          Pricing
        </Typography>
        <Typography
          variant='h6'
          align={"center"}
          color={"text.secondary"}
          data-aos={"fade-up"}
        >
          Pick the best plan based on your requirement
        </Typography>
        <Box marginTop={2} display={"flex"} justifyContent={"center"}>
          <Button
            onClick={() => navigate("/signup")}
            variant='contained'
            color='primary'
            size='large'
            endIcon={
              <Box
                onClick={() => navigate("/signup")}
                component={"svg"}
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                width={24}
                height={24}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M17 8l4 4m0 0l-4 4m4-4H3'
                />
              </Box>
            }
          >
            Learn more
          </Button>
        </Box>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Card data-aos={isMd ? "fade-right" : "fade-up"}>
            <CardContent sx={{ padding: { sm: 4 } }}>
              <Box display={"flex"} justifyContent={"center"} marginBottom={4}>
                <Button
                  value='monthly'
                  size={"small"}
                  sx={{
                    backgroundColor: "transparent",
                    border: `1px solid ${theme.palette.primary.main}`,
                  }}
                >
                  <Typography
                    variant='subtitle2'
                    sx={{
                      fontWeight: "medium",
                      color: "primary",
                    }}
                  >
                    Monthly
                  </Typography>
                </Button>
              </Box>
              <Box marginBottom={4}>
                <Typography
                  fontWeight={600}
                  variant={"h2"}
                  align={"center"}
                  gutterBottom
                >
                  Rs. 99
                </Typography>
                <Typography color='text.secondary' align={"center"}>
                  {/* Including GST.
                  <br /> */}
                  Ongoing technical support.
                  <br />
                  Plus unlimited updates.
                </Typography>
              </Box>
              <Grid container spacing={1}>
                {[
                  "Track Student Location",
                  "Track Student Attendance",
                  "Manage Drivers",
                  "Track Expenses",
                  // "Completion Certifcate",
                  // "Driving Videos",
                ].map((item, i) => (
                  <Grid item xs={12} sm={6} key={i}>
                    <Box
                      component={ListItem}
                      disableGutters
                      width={"auto"}
                      padding={0}
                    >
                      <Box
                        component={ListItemAvatar}
                        minWidth={"auto !important"}
                        marginRight={2}
                      >
                        <Box
                          component={Avatar}
                          bgcolor={theme.palette.secondary.main}
                          width={20}
                          height={20}
                        >
                          <svg
                            width={12}
                            height={12}
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                          >
                            <path
                              fillRule='evenodd'
                              d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                              clipRule='evenodd'
                            />
                          </svg>
                        </Box>
                      </Box>
                      <ListItemText primary={item} />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: "center" }}>
              <Button onClick={() => navigate("/signup")} size={"large"}>
                Learn more
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item container xs={12} md={6} alignItems={"center"}>
          <Card data-aos={isMd ? "fade-right" : "fade-up"}>
            <CardContent sx={{ padding: { sm: 4 } }}>
              <Box display={"flex"} justifyContent={"center"} marginBottom={4}>
                <Button
                  value='annual'
                  size={"small"}
                  sx={{
                    backgroundColor: "transparent",
                    border: `1px solid ${theme.palette.primary.main}`,
                  }}
                >
                  <Typography
                    variant='subtitle2'
                    sx={{
                      fontWeight: "medium",
                      color: "primary",
                    }}
                  >
                    Annual
                  </Typography>
                </Button>
              </Box>
              <Box marginBottom={4}>
                <Typography
                  fontWeight={600}
                  variant={"h2"}
                  align={"center"}
                  gutterBottom
                >
                  Rs. 999
                </Typography>
                <Typography color='text.secondary' align={"center"}>
                  {/* Including GST.
                  <br /> */}
                  Ongoing technical support.
                  <br />
                  Plus unlimited updates.
                </Typography>
              </Box>
              <Grid container spacing={1}>
                {[
                  "Track Student Location",
                  "Track Student Attendance",
                  "Manage Drivers",
                  "Track Expenses",
                  // "Completion Certifcate",
                  // "Driving Videos",
                ].map((item, i) => (
                  <Grid item xs={12} sm={6} key={i}>
                    <Box
                      component={ListItem}
                      disableGutters
                      width={"auto"}
                      padding={0}
                    >
                      <Box
                        component={ListItemAvatar}
                        minWidth={"auto !important"}
                        marginRight={2}
                      >
                        <Box
                          component={Avatar}
                          bgcolor={theme.palette.secondary.main}
                          width={20}
                          height={20}
                        >
                          <svg
                            width={12}
                            height={12}
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                          >
                            <path
                              fillRule='evenodd'
                              d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                              clipRule='evenodd'
                            />
                          </svg>
                        </Box>
                      </Box>
                      <ListItemText primary={item} />
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: "center" }}>
              <Button onClick={() => navigate("/signup")} size={"large"}>
                Learn more
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Pricing;
