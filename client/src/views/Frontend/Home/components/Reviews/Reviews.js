import React from "react";
import { useTheme } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const mock = [
  {
    title: "Manage Attendance",
    subtitle:
      "A very simple and modern template with a very harmonious color scheme. Also the additional plugins like the statistics are great and fit perfectly into the overall picture.",
      icon: '/images/attendance.png',

  },
  {
    title: "Manage Drivers ",
    subtitle:
      "A very simple and modern template with a very harmonious color scheme. Also the additional plugins like the statistics are great and fit perfectly into the overall picture.",
      icon: '/images/driver.png',

  },
  {
    title: "Track Expenses",
    subtitle:
      "A very simple and modern template with a very harmonious color scheme. Also the additional plugins like the statistics are great and fit perfectly into the overall picture.",
      icon: '/images/expense.png',

  },
];

const Reviews = () => {
  const theme = useTheme();

  return (
    <Box>
      <Grid container spacing={2} justifyContent="center">
        {mock.map((item, i) => (
          <Grid item xs={12} md={3} key={i}>
            <Box
              component={"a"}
              href={""}
              display={"block"}
              width={1}
              height={1}
              sx={{
                textDecoration: "none",
                transition: "all .2s ease-in-out",
                "&:hover": {
                  transform: `translateY(-${theme.spacing(1 / 2)})`,
                },
              }}
            >
              <Box
                component={Card}
                width={1}
                height={1}
                data-aos={"fade-up"}
                data-aos-delay={i * 100}
                data-aos-offset={100}
                data-aos-duration={600}
                flexDirection={"column"}
                display={"flex"}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <Box
                    component={Avatar}
                    width={{ xs: 60, md: 80 }}
                    height={{ xs: 60, md: 80 }}
                    marginBottom={2}
                    src={item.icon}
                  />
                  <Typography
                    variant={"h6"}
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    {item.title}
                  </Typography>
                  {/* <Typography color='text.secondary'>
                    {item.subtitle}
                  </Typography> */}
                </CardContent>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Reviews;
