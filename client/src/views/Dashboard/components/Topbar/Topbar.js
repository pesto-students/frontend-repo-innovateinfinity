import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import MenuIcon from '@mui/icons-material/Menu';
import { logout } from "../../../../redux/actions/authActions"

const mock = [
  // {
  //   title: 'Overview',
  //   href: '#',
  // },
  // {
  //   title: 'Analytics',
  //   href: '#',
  // },
  // {
  //   title: 'Automation',
  //   href: '#',
  // },
];

const Topbar = ({ onSidebarOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      width={1}
    >
      <Box display={'flex'} alignItems={'center'} color={'primary.dark'}>
        <Box component={'button'} onClick={() => navigate("/students")} style={{ all: "unset" }}>
          <img src={'/images/idrive-icon.png'} alt={'IDrive'} height="40vh" />
        </Box>
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          width={40}
          height={40}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
        </svg>
        <Typography fontWeight={700} marginLeft={1}>
          Cube
        </Typography> */}
      </Box>
      <Box display={'flex'}>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }} alignItems={'center'}>
          {mock.map((item, i) => (
            <Box marginLeft={3} key={i}>
              <Link
                underline="none"
                component="a"
                href={item.href}
                color="text.primary"
              >
                {item.title}
              </Link>
            </Box>
          ))}
        </Box>
        <Box sx={{ display: { xs: 'flex', md: 'none' } }} alignItems={'center'}>
          <React.Fragment>
            <Tooltip title="Menu">
              <IconButton onClick={handleClick} size="small">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                  />
                </svg>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 3,
                sx: {
                  overflow: 'visible',
                  mt: 1.5,
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              {mock.map((item, i) => (
                <MenuItem key={i}>
                  <Link
                    underline="none"
                    component="a"
                    href={item.href}
                    color="text.primary"
                  >
                    {item.title}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </React.Fragment>
        </Box>
        <Box marginLeft={{ xs: 2, md: 3 }}>
          <Button
            variant="contained"
            color="primary"
            component="button"
            // target="blank"
            // href="#"
            size="large"
            onClick={() => {
              let text = "Logout Confirmation.";
              if (window.confirm(text) === true) {
                dispatch(logout())
              }
              // dispatch(logout())
              // navigate('/');
            }}
          >
            logout
          </Button>
        </Box>
        <Box sx={{ display: { xs: 'block', md: 'none' } }} marginLeft={2}>
          <Button
            onClick={() => onSidebarOpen()}
            aria-label="Menu"
            variant={'outlined'}
            sx={{
              borderRadius: 2,
              minWidth: 'auto',
              padding: 1,
              borderColor: alpha(theme.palette.divider, 0.2),
            }}
          >
            <MenuIcon />
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

Topbar.propTypes = {
  onSidebarOpen: PropTypes.func,
};

export default Topbar;
