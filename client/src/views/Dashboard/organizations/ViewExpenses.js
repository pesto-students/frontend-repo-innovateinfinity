import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { toast } from 'react-toastify';
import { format } from 'date-fns';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Container from "../../../MainLayouts/Container";
import { Topbar, Sidebar, Table } from '../components';
import { getExpenses } from '../../../redux/actions/apiActions'
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

const ViewExpenses = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [expensesList, setExpensesList] = useState([]);
  const params = useParams();
  const { state } = useLocation();
  const role = useSelector(state => state.authReducer.role);


  const theme = useTheme();
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

  const columns = [
    { title: 'Sr no.', field: 'index', filtering: false },
    { title: 'Amount', field: 'amount', filtering: false },
    { title: 'Driver', field: 'driver', filtering: false },
    { title: 'Type', field: 'type', filtering: false },
    { title: 'Date', field: 'createdAt', filtering: false },
  ];

  useEffect(() => {
    dispatch(setGlobalLoader(true))
    async function expensesFunc() {
      try {
        const query = `?organizationId=${params.id}`;
        const orgRes = await getExpenses(role, query);
        const data = orgRes.data.data.map((d, i) => ({
          ...d,
          index: i + 1,
          driver: d?.driverId?.name,
          createdAt: format(new Date(d?.createdAt), 'MMM dd, yyyy'),
        }))
        setExpensesList(data);
        dispatch(setGlobalLoader(false))
      } catch (error) {
        dispatch(setGlobalLoader(false))
        console.log("get expenses list error", error);
        toast.error(error.response.data.msg);
      }
    }
    expensesFunc();
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
                <Typography
                  variant={"subtitle1"}
                  fontWeight={700}
                >
                  Organization - {state?.orgName}
                </Typography>
              </Box>
              <TableComponent data={expensesList} columns={columns} title='Expenses' />
              <Divider />
            </Box>
          </Box>
        </Box>
      </main>
    </Box>
  );
};

export default ViewExpenses;
