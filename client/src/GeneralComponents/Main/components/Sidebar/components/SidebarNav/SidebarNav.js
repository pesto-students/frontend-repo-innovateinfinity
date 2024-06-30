import React from "react";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const SidebarNav = ({ colorInvert = false }) => {
  const navigate = useNavigate();

  return (
    <Box>
      <Box width={1} paddingX={2} paddingY={1}>
        <Box
          display={"flex"}
          component='button'
          title='IDrive'
          onClick={() => navigate("/")}
          width={{ xs: 100, md: 120 }}
          style={{ all: "unset" }}
        >
          <Box component={"img"} src='/images/idrive-logo.png' height='10vh' />
        </Box>
        <br />
        <Divider />
      </Box>
      <Box paddingX={2} paddingY={2}>
        <Box paddingBottom={1}></Box>
        <Box marginTop={1}>
          <Button
            onClick={() => navigate("/")}
            style={{
              marginLeft: "-8px",
            }}
            size='small'
          >
            Home
          </Button>
        </Box>
        <Box marginTop={1}>
          <Button
            onClick={() => navigate("/about")}
            style={{
              marginLeft: "-8px",
            }}
            size='small'
          >
            About
          </Button>
        </Box>
        <Box marginTop={1}>
          <Button
            onClick={() => navigate("/contact")}
            style={{
              marginLeft: "-3px",
            }}
            size='small'
          >
            Contact
          </Button>
        </Box>
        <Box marginTop={1}>
          <Button
            onClick={() => navigate("/login")}
            style={{
              marginLeft: "-8px",
            }}
            size='small'
          >
            Login
          </Button>
        </Box>
        <Box marginTop={1}>
          <Button
            onClick={() => navigate("/signup")}
            style={{
              marginLeft: "-5px",
            }}
            size='small'
          >
            Signup
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default SidebarNav;
