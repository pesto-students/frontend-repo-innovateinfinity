import React, { useState, useEffect } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
// import Button from '@mui/material/Button';
import { alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { toast } from 'react-toastify';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { format } from 'date-fns';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Container from "../../../MainLayouts/Container";
import { Topbar, Sidebar, Table } from '../components';
import { getOrganizations } from '../../../redux/actions/apiActions'
import setGlobalLoader from '../../../redux/actions/loaderActions'
import { updateOrganization } from '../../../redux/actions/apiActions'

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

const OrganizationSignup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [organizations, setOrganizations] = useState([]);
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

  const approveOrganization = async (rowData) => {
    console.log(rowData)
    let text = `Are you sure you want to approve ${rowData.name}`;
    if (window.confirm(text) === true) {
      const values = { approved: true }
      try {
        await updateOrganization(role, rowData._id, values);
        toast.success("Organization updated successfully");
        navigate("/organizations")
        dispatch(setGlobalLoader(false))
      } catch (error) {
        dispatch(setGlobalLoader(false))
        console.log("update organization error", error);
        toast.error(error.response.data.msg ?? "Some error occured.");
      }
    } else {
      toast.error('Request Cancelled');
    }
  }

  const columns = [
    { title: 'Sr no.', field: 'index', filtering: false },
    { title: 'Title', field: 'name', filtering: false },
    { title: 'Phone', field: 'phoneNumber', filtering: false },
    { title: 'Registered On', field: 'registeredOn', filtering: false },
    {
      title: 'Actions',
      field: '',
      filtering: false,
      render: (rowData) => (
        <div className="tableActions ">
          <Tooltip title="View">
            <VisibilityIcon onClick={() =>
              navigate(`/organizations/view/${rowData._id}`)} />
          </Tooltip>
          <Tooltip title="Approve">
            <CheckCircleIcon
              onClick={() => approveOrganization(rowData)}
            />
          </Tooltip>
        </div>
      ),
    },
  ];

  useEffect(() => {
    dispatch(setGlobalLoader(true))
    async function organizationFunc() {
      try {
        const query = '?joinedFrom=SIGNUP_PAGE&approved=false'
        const orgRes = await getOrganizations(role, query);
        const data = orgRes.data.data.map((d, i) => ({
          ...d,
          index: i + 1,
          registeredOn: format(new Date(d?.createdAt), 'MMM dd, yyyy'),
        }))
        setOrganizations(data);
        dispatch(setGlobalLoader(false))
      } catch (error) {
        dispatch(setGlobalLoader(false))
        console.log("get Organizations error", error);
        toast.error(error.response.data.msg);
      }
    }
    organizationFunc();
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
              {/* <Box marginTop={3}
                marginRight='35px'
                marginLeft={{ xs: 3, md: 4 }}
                display="flex" flex="1 1 auto" 
                justifyContent="space-between"
              >
                <Button
                  variant="contained"
                  color="primary"
                  component="button"
                  size="medium"
                  onClick={() => {
                    navigate('/organizations/add');
                  }}
                >
                  View Signups
                </Button>

                <Button
                  variant="contained"
                  color="primary"
                  component="button"
                  size="medium"
                  onClick={() => {
                    navigate('/organizations/add');
                  }}
                >
                  Add Organization
                </Button>
              </Box> */}
              <TableComponent data={organizations} columns={columns} title='Organizations Signups' />
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

export default OrganizationSignup;
