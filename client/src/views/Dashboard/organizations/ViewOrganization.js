import React, { useState, useEffect } from 'react';
import Divider from '@mui/material/Divider';
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'date-fns';
import Button from '@mui/material/Button';
import { useParams, useNavigate } from 'react-router-dom';
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Container from "../../../MainLayouts/Container";
import { Topbar, Sidebar } from '../components';
import setGlobalLoader from '../../../redux/actions/loaderActions'
import { getOrganizationById } from '../../../redux/actions/apiActions'
import { updateOrganization } from '../../../redux/actions/apiActions'

const ViewOrganization = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [organizationDetails, setOrganizationDetails] = useState({});
  const theme = useTheme();
  const role = useSelector(state => state.authReducer.role);
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });

  const params = useParams();

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };
  const open = isMd ? false : openSidebar;


  useEffect(() => {
    dispatch(setGlobalLoader(true))
    if (params.id !== null && params.id !== undefined) {
      async function orgFunc() {
        try {
          const orgRes = await getOrganizationById(role, params.id);
          setOrganizationDetails(orgRes.data.data[0]);
          dispatch(setGlobalLoader(false))
        } catch (error) {
          dispatch(setGlobalLoader(false))
          console.log("get organization details error", error);
          toast.error(error.response.data.msg ?? "some error occured while fetching organization details.");
        }
      }
      orgFunc();
    }
  }, [params.id])

  const organizationStatusChange = async () => {
    const changingStatus = organizationDetails?.active === true ? "Inactive" : "Active";
    let text = `Are you sure you want to change status to ${changingStatus} `;
    if (window.confirm(text) === true) {
      const values = { active: !organizationDetails.active }
      try {
        await updateOrganization(role, organizationDetails._id, values);
        toast.success("Organization updated successfully");
        navigate(0)
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
          marginLeft={{ md: '290px', xs: "30px" }}
          marginTop={{ md: "20px", xs: "30px" }}
          marginRight={{ md: "40px", xs: "30px" }}
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          flexDirection={{ xs: 'column', sm: 'row' }}
        >
          <Typography
            variant={"subtitle1"}
            fontWeight={700}
          >
            Organization Details
          </Typography>

          <Button
            variant="contained"
            color="primary"
            component="button"
            size="large"
            onClick={() =>
              organizationStatusChange()
            }
          >
            Mark {organizationDetails?.active === true ? "Inactive" : "Active"}
          </Button>
        </Box>

        <Box p={4}>

          <Box
            display="flex"
            flex="1 1 auto"
            overflow="hidden"
            paddingLeft={{ md: '256px' }}
            borderRadius={2}
          >

            <Box display="flex" flex="1 1 auto" overflow="hidden" border={`2px solid ${theme.palette.divider}`}
              sx={{
                borderStyle: 'dashed',
              }}>
              <Box flex="1 1 auto" height="100%" overflow="auto">
                <Box
                  display={'flex'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  flexDirection={{ xs: 'column', sm: 'row' }}
                  padding={2}
                >
                  <Typography
                    variant={"subtitle2"}
                    fontWeight={700}
                  >
                    Name -
                  </Typography>
                  <Typography
                    variant={"subtitle2"}
                    fontWeight={600}
                  >
                    {organizationDetails?.name}
                  </Typography>
                </Box>
                <Divider />
                <Box
                  display={'flex'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  flexDirection={{ xs: 'column', sm: 'row' }}
                  padding={2}
                >
                  <Typography
                    variant={"subtitle2"}
                    fontWeight={700}
                  >
                    Phone Number -
                  </Typography>
                  <Typography
                    variant={"subtitle2"}
                    fontWeight={600}
                  >
                    {organizationDetails?.phoneNumber}
                  </Typography>
                </Box>
                <Divider />
                <Box
                  display={'flex'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  flexDirection={{ xs: 'column', sm: 'row' }}
                  padding={2}
                >
                  <Typography
                    variant={"subtitle2"}
                    fontWeight={700}
                  >
                    Email -
                  </Typography>
                  <Typography
                    variant={"subtitle2"}
                    fontWeight={600}
                  >
                    {organizationDetails?.email}
                  </Typography>
                </Box>
                <Divider />
                <Box
                  display={'flex'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  flexDirection={{ xs: 'column', sm: 'row' }}
                  padding={2}
                >
                  <Typography
                    variant={"subtitle2"}
                    fontWeight={700}
                  >
                    Address -
                  </Typography>
                  <Typography
                    variant={"subtitle2"}
                    fontWeight={600}
                  >
                    {organizationDetails?.address}
                  </Typography>
                </Box>
                <Divider />
                <Box
                  display={'flex'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  flexDirection={{ xs: 'column', sm: 'row' }}
                  padding={2}
                >
                  <Typography
                    variant={"subtitle2"}
                    fontWeight={700}
                  >
                    City -
                  </Typography>
                  <Typography
                    variant={"subtitle2"}
                    fontWeight={600}
                  >
                    {organizationDetails?.city}
                  </Typography>
                </Box>
                <Divider />
                <Box
                  display={'flex'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  flexDirection={{ xs: 'column', sm: 'row' }}
                  padding={2}
                >
                  <Typography
                    variant={"subtitle2"}
                    fontWeight={700}
                  >
                    State -
                  </Typography>
                  <Typography
                    variant={"subtitle2"}
                    fontWeight={600}
                  >
                    {organizationDetails?.state}
                  </Typography>
                </Box>
                <Divider />
                <Box
                  display={'flex'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  flexDirection={{ xs: 'column', sm: 'row' }}
                  padding={2}
                >
                  <Typography
                    variant={"subtitle2"}
                    fontWeight={700}
                  >
                    Pincode -
                  </Typography>
                  <Typography
                    variant={"subtitle2"}
                    fontWeight={600}
                  >
                    {organizationDetails?.pincode}
                  </Typography>
                </Box>
                <Divider />
                <Box
                  display={'flex'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  flexDirection={{ xs: 'column', sm: 'row' }}
                  padding={2}
                >
                  <Typography
                    variant={"subtitle2"}
                    fontWeight={700}
                  >
                    Registered On -
                  </Typography>
                  <Typography
                    variant={"subtitle2"}
                    fontWeight={600}
                  >
                    {organizationDetails.createdAt && format(new Date(organizationDetails?.createdAt), 'MMM dd, yyyy')}
                  </Typography>
                </Box>
                <Divider />
                <Box
                  display={'flex'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  flexDirection={{ xs: 'column', sm: 'row' }}
                  padding={2}
                >
                  <Typography
                    variant={"subtitle2"}
                    fontWeight={700}
                  >
                    Active -
                  </Typography>
                  <Typography
                    variant={"subtitle2"}
                    fontWeight={600}
                  >
                    {organizationDetails?.active?.toString().toUpperCase()}
                  </Typography>
                </Box>
                <Divider />
              </Box>
            </Box>
          </Box>
        </Box>
      </main>
    </Box>
  );
};


export default ViewOrganization;
