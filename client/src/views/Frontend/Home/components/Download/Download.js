import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";

const Download = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Box marginBottom={2}>
        <Typography variant={"h4"} sx={{ fontWeight: 700 }} align={"center"}>
          Everything your school could need.
        </Typography>
        <Typography
          variant='h6'
          component='p'
          color='text.secondary'
          align={"center"}
        >
          If you have suggestions or features you’d like to see in IDrive, let
          us know. Lets redefine driving school management.
        </Typography>
        <Box marginTop={2} display={"flex"} justifyContent={"center"}>
          <Button
            onClick={() => navigate("/contact")}
            color={"primary"}
            variant={"contained"}
            size={"large"}
            startIcon={
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 20 20'
                fill='currentColor'
                width={20}
                height={20}
              >
                <path d='M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z' />
                <path d='M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z' />
              </svg>
            }
          >
            Contact us
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Download;
