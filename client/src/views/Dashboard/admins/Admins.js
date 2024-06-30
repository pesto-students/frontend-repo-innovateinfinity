import React, { useState, useEffect } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';
import { format } from 'date-fns';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Container from "../../../MainLayouts/Container";
import { Topbar, Sidebar, Table } from '../components';
import { getAdmins, deleteAdmin } from '../../../redux/actions/apiActions'
import setGlobalLoader from '../../../redux/actions/loaderActions'

const TableComponent = ({ columns, data, title }) => {
  const theme = useTheme();

  return (
    <Box p={4}>
      <Box
        width={1}
        height={1}
        // minHeight={800}
        borderRadius={2}
        border={`2px solid ${theme.palette.divider}`}
        sx={{
          borderStyle: 'dashed',
        }}
      >
        <Table columns={columns}
          data={data}
          export={false}
          // search
          selection={false}
          toolbar
          title={title} />
      </Box>
    </Box>
  );
};

const Admins = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [admins, setAdmins] = useState([]);
  const theme = useTheme();
  const role = useSelector(state => state.authReducer.role);
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
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

  const handleDeleteAdmin = async (rowData) => {
    let text = `Are you sure you want to delete ${rowData.name}`;
    if (window.confirm(text) === true) {
      const confirmation_pin = window.prompt("Confirmation Password")
      dispatch(setGlobalLoader(true))
      const query = `?pin=${confirmation_pin}`
      try {
        await deleteAdmin(role, rowData._id, query);
        setAdmins(admins.filter(d => d._id !== rowData._id))
        dispatch(setGlobalLoader(false))
      } catch (error) {
        dispatch(setGlobalLoader(false))
        console.log("delete admin error", error);
        toast.error(error?.response?.data?.message);
      }
    } else {
      toast.success('Request Cancelled');
    }
  }

  const columns = [
    { title: 'Sr no.', field: 'index', filtering: false },
    { title: 'Title', field: 'name', filtering: false },
    { title: 'Phone', field: 'phoneNumber', filtering: false },
    // { title: 'Organization', field: 'organization', filtering: false },
    { title: 'Registered On', field: 'registeredOn', filtering: false },
    {
      title: 'Actions',
      field: '',
      filtering: false,
      render: (rowData) => (
        <div className="tableActions ">
          <Tooltip title="Delete">
            <DeleteIcon
              onClick={() => handleDeleteAdmin(rowData)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  useEffect(() => {
    dispatch(setGlobalLoader(true))
    async function adminFunc() {
      try {
        const driverRes = await getAdmins(role);
        const data = driverRes.data.data.map((d, i) => ({
          ...d,
          index: i + 1,
          registeredOn: format(new Date(d?.createdAt), 'MMM dd, yyyy'),
        }))
        setAdmins(data);
        dispatch(setGlobalLoader(false))
      } catch (error) {
        dispatch(setGlobalLoader(false))
        console.log("get admins error", error);
        toast.error(error.response.data.msg);
      }
    }
    adminFunc();
  }, [])

  return (
    <Box>
      <AppBar
        position={'fixed'}
        sx={{
          backgroundColor: theme.palette.background.paper,
          borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        }}
        elevation={0}
      >
        <Container maxWidth={1} paddingY={{ xs: 1, sm: 1.5 }}>
          <Topbar onSidebarOpen={handleSidebarOpen} />
        </Container>
      </AppBar>
      <Sidebar
        onClose={handleSidebarClose}
        open={open}
        variant={isMd ? 'permanent' : 'temporary'}
      />
      <main>
        <Box height={{ xs: 58, sm: 66, md: 71 }} />
        <Box
          display="flex"
          flex="1 1 auto"
          overflow="hidden"
          paddingLeft={{ md: '256px' }}
        >
          <Box display="flex" flex="1 1 auto" overflow="hidden">
            <Box flex="1 1 auto" height="100%" overflow="auto">
              <Box marginTop={3}
                marginLeft={{ xs: 3, md: 4 }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  component="button"
                  size="large"
                  onClick={() => {
                    navigate('/admins/add');
                  }}
                >
                  Add Admin
                </Button>
              </Box>
              <TableComponent data={admins} columns={columns} title='Admins' />
              <Divider />
              {/* <Container paddingY={4}>
                <Footer />
              </Container> */}
            </Box>
          </Box>
        </Box>
      </main>
    </Box>
  );
};

export default Admins;
