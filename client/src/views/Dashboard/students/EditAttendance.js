import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import Button from "@mui/material/Button";
import * as yup from "yup";
import Divider from '@mui/material/Divider';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { alpha, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { toast } from 'react-toastify';
import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import AppBar from '@mui/material/AppBar';
import Container from "../../../MainLayouts/Container";
import { Topbar, Sidebar } from '../components';
import setGlobalLoader from '../../../redux/actions/loaderActions';
import { updateAttendance } from '../../../redux/actions/apiActions';

const validationSchema = yup.object({
  kmDriven: yup
    .string()
    .trim()
    .required("Km Driven is required."),
})

const EditStudent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const { state } = useLocation();
  const role = useSelector(state => state.authReducer.role);
  const profile = useSelector(state => state.authReducer.profile);
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

  const handleOnSubmit = async (values) => {

    try {
      await updateAttendance(role, params.id, values);
      toast.success("Attendance updated successfully");
      navigate(-1)
      dispatch(setGlobalLoader(false))
    } catch (error) {
      dispatch(setGlobalLoader(false))
      console.log("update student attendance", error);
      toast.error(error.response.data.msg ?? "Some error occured.");
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
                    Student Name -
                  </Typography>
                  <Typography
                    variant={"subtitle2"}
                    fontWeight={600}
                  >
                    {state.studentName}
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
                    Date -
                  </Typography>
                  <Typography
                    variant={"subtitle2"}
                    fontWeight={600}
                  >
                    {state.date}
                  </Typography>
                </Box>

                <Divider />
              </Box>
            </Box>
          </Box>
        </Box>
        <Box p={4}>
          <Box
            overflow="hidden"
            marginLeft={{ md: '270px' }}
          >
            <Typography
              variant={"subtitle2"}
              sx={{ marginBottom: 2 }}
              fontWeight={700}
            >
              Edit Attendance
            </Typography>

            <Formik
              initialValues={{
                kmDriven: state.kmDriven,
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => handleOnSubmit(values)}
              enableReinitialize
            >
              {(formikProps) => {
                const { values, errors, touched, setFieldValue, handleSubmit } =
                  formikProps;
                return (
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={{ xs: 2, md: 4 }} sx={{ padding: '10px' }}>
                      <Grid item xs={12} sm={6} md={7}>
                        <Typography
                          variant={"subtitle2"}
                          sx={{ marginBottom: 2 }}
                          fontWeight={700}
                        >
                          KM Driven
                        </Typography>
                        <TextField
                          // label="Phone Number *"
                          variant="outlined"
                          name={"kmDriven"}
                          fullWidth
                          type="number"
                          InputProps={{
                            inputProps: { min: 0 },
                          }}
                          value={values.kmDriven}
                          onChange={(e) =>
                            setFieldValue("kmDriven", e.target.value)
                          }
                          error={
                            touched.kmDriven && Boolean(errors.kmDriven)
                          }
                          helperText={touched.kmDriven && errors.kmDriven}
                        />
                      </Grid>
                    </Grid>
                    <br />
                    <Button
                      component={'button'}
                      variant={"contained"}
                      fontWeight={700}
                      type='submit'
                    >
                      Submit
                    </Button>
                  </form>
                )
              }}
            </Formik>
          </Box>
        </Box>
      </main>
    </Box>
  );
};

export default EditStudent;
