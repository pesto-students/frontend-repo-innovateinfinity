import React, { useState } from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Container from "../../MainLayouts/Container";
import { Topbar, Sidebar, Footer } from "./components";

const Main = ({ children, colorInvert = false, bgcolor = "transparent" }) => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up("md"), {
    defaultMatches: true,
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const open = isMd ? false : openSidebar;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 38,
  });

  return (
    <Box>
      <Box bgColor="white" position={"relative"} zIndex={theme.zIndex.appBar}>
      </Box>
      <AppBar
        position={"sticky"}
        sx={{
          top: 0,
          backgroundColor: "white",
        }}
        elevation={trigger ? 1 : 0}
      >
        <Container paddingY={1}>
          <Topbar
            onSidebarOpen={handleSidebarOpen}
          />
        </Container>
      </AppBar>
      <Sidebar
        onClose={handleSidebarClose}
        open={open}
        variant="temporary"
      />
      <main>
        {children}
      </main>
      <Container paddingY={4}>
        <Footer />
      </Container>
    </Box>
  );
};

Main.propTypes = {
  children: PropTypes.node,
  colorInvert: PropTypes.bool,
  bgcolor: PropTypes.string,
};

export default Main;
