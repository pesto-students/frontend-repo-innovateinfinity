import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { alpha, useTheme } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";

const Topbar = ({ onSidebarOpen, colorInvert = false }) => {
  const navigate = useNavigate();

  const theme = useTheme();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); // This effect runs when the pathname changes
  return (
    <Box
      display={"flex"}
      justifyContent={"space-between"}
      alignItems={"center"}
      width={1}
    >
      <Box
        display={"flex"}
        component='button'
        title='IDrive'
        onClick={() => navigate("/")}
        width={{ xs: 100, md: 120 }}
        style={{ all: "unset" }}
      >
        <Box component={"img"} src='/images/idrive-logo.png' height='20vh' />
      </Box>
      <Box sx={{ display: { xs: "none", md: "flex" } }} alignItems={"center"}>
        <Box marginLeft={4}>
          <Button color='primary' onClick={() => navigate("/")} size='small'>
            Home
          </Button>
        </Box>
        <Box marginLeft={4}>
          <Button
            color='primary'
            onClick={() => navigate("/about")}
            size='small'
          >
            About
          </Button>
        </Box>
        <Box marginLeft={4}>
          <Button
            color='primary'
            onClick={() => navigate("/contact")}
            size='small'
          >
            Contact
          </Button>
        </Box>
        <Box marginLeft={4}>
          <Button
            color='primary'
            onClick={() => navigate("/login")}
            size='small'
          >
            Login
          </Button>
        </Box>
        <Box marginLeft={4}>
          <Button
            variant='contained'
            color='primary'
            onClick={() => navigate("/signup")}
            size='small'
          >
            Signup
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: { xs: "block", md: "none" } }} alignItems={"center"}>
        <Button
          onClick={() => onSidebarOpen()}
          aria-label='Menu'
          variant={"outlined"}
          sx={{
            borderRadius: 2,
            minWidth: "auto",
            padding: 1,
            borderColor: alpha(theme.palette.divider, 0.2),
          }}
        >
          <MenuIcon />
        </Button>
      </Box>
    </Box>
  );
};

Topbar.propTypes = {
  onSidebarOpen: PropTypes.func,
  colorInvert: PropTypes.bool,
};

export default Topbar;
