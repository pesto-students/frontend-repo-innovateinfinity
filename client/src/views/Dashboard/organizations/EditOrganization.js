import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from "formik";
import Button from "@mui/material/Button";
import * as yup from "yup";
import { useNavigate, useParams } from 'react-router-dom';
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
import { states } from "../../../utils/constants";
import { getOrganizationById, updateOrganization } from '../../../redux/actions/apiActions';


const validationSchema = yup.object({
    name: yup
        .string()
        .trim()
        .required("Name is required."),
    phoneNumber: yup
        .string()
        .trim()
        .required("Phone Number is required.")
        .min(10, "Phone number short than 10 digits.")
        .max(10, "Phone number long than 10 digits."),
    address: yup
        .string()
        .trim()
        .required("Address is required."),
    city: yup
        .string()
        .trim()
        .required("City is required."),
    state: yup
        .string()
        .trim()
        .required("State is required."),
    pincode: yup
        .string()
        .trim()
        .required("Pincode is required."),
})

const EditOrganization = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const [organizationDetails, setOrganizationDetails] = useState([]);
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

    useEffect(() => {
        if (params.id !== null && params.id !== undefined) {
            dispatch(setGlobalLoader(true))
            async function orgFunc() {
                try {
                    const orgRes = await getOrganizationById(role, params.id);
                    setOrganizationDetails(orgRes?.data?.data[0]);
                    dispatch(setGlobalLoader(false))
                } catch (error) {
                    dispatch(setGlobalLoader(false))
                    console.log("get organization details error", error);
                    toast.error(error.response.data.msg ?? "some error occured while fetching organization details");
                }
            }
            orgFunc();
        }
    }, [params.id])

    const handleOnSubmit = async (values) => {

        try {
            await updateOrganization(role, params.id, values);
            toast.success("Organization updated successfully");
            navigate("/organizations")
            dispatch(setGlobalLoader(false))
        } catch (error) {
            dispatch(setGlobalLoader(false))
            console.log("update organization error", error);
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
                <br />
                <br />

                <Box
                    overflow="hidden"
                    marginLeft={{ md: '270px' }}
                >
                    <Typography
                        variant={"subtitle2"}
                        sx={{ marginBottom: 2 }}
                        fontWeight={700}
                    >
                        Edit Organization
                    </Typography>

                    <Formik
                        initialValues={{
                            name: organizationDetails?.name,
                            phoneNumber: organizationDetails?.phoneNumber,
                            email: organizationDetails?.email,
                            address: organizationDetails?.address,
                            pincode: organizationDetails?.pincode,
                            city: organizationDetails?.city,
                            state: organizationDetails?.state,
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
                                                Name
                                            </Typography>
                                            <TextField
                                                // label="Name *"
                                                variant="outlined"
                                                name={"name"}
                                                fullWidth
                                                value={values.name}
                                                onChange={(e) =>
                                                    setFieldValue("name", e.target.value)
                                                }
                                                error={
                                                    touched.name && Boolean(errors.name)
                                                }
                                                helperText={touched.name && errors.name}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={7}>
                                            <Typography
                                                variant={"subtitle2"}
                                                sx={{ marginBottom: 2 }}
                                                fontWeight={700}
                                            >
                                                Phone Number
                                            </Typography>
                                            <TextField
                                                // label="Phone Number *"
                                                variant="outlined"
                                                name={"phoneNumber"}
                                                fullWidth
                                                type="number"
                                                value={values.phoneNumber}
                                                onChange={(e) =>
                                                    e.target.value.toString().length > 10 ?
                                                        setFieldValue("phoneNumber", e.target.value.substring(0, 10))
                                                        :
                                                        setFieldValue("phoneNumber", e.target.value)
                                                }
                                                error={
                                                    touched.phoneNumber && Boolean(errors.phoneNumber)
                                                }
                                                helperText={touched.phoneNumber && errors.phoneNumber}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={7}>
                                            <Typography
                                                variant={"subtitle2"}
                                                sx={{ marginBottom: 2 }}
                                                fontWeight={700}
                                            >
                                                Email
                                            </Typography>
                                            <TextField
                                                // label="Email"
                                                variant="outlined"
                                                name={"email"}
                                                fullWidth
                                                value={values.email}
                                                onChange={(e) =>
                                                    setFieldValue("email", e.target.value)
                                                }
                                                error={
                                                    touched.email && Boolean(errors.email)
                                                }
                                                helperText={touched.email && errors.email}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={7}>
                                            <Typography
                                                variant={"subtitle2"}
                                                sx={{ marginBottom: 2 }}
                                                fontWeight={700}
                                            >
                                                Address
                                            </Typography>
                                            <TextField
                                                // label="Address *"
                                                variant="outlined"
                                                name={"address"}
                                                fullWidth
                                                value={values.address}
                                                onChange={(e) =>
                                                    setFieldValue("address", e.target.value)
                                                }
                                                error={
                                                    touched.address && Boolean(errors.address)
                                                }
                                                helperText={touched.address && errors.address}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={7}>
                                            <Typography
                                                variant={"subtitle2"}
                                                sx={{ marginBottom: 2 }}
                                                fontWeight={700}
                                            >
                                                City
                                            </Typography>
                                            <TextField
                                                // label="City *"
                                                variant="outlined"
                                                name={"city"}
                                                fullWidth
                                                value={values.city}
                                                onChange={(e) =>
                                                    setFieldValue("city", e.target.value)
                                                }
                                                error={
                                                    touched.city && Boolean(errors.city)
                                                }
                                                helperText={touched.city && errors.city}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={7}>
                                            <Typography
                                                variant={"subtitle2"}
                                                sx={{ marginBottom: 2 }}
                                            >
                                                State
                                            </Typography>
                                            <Select
                                                // placeholder="State *"
                                                value={values.state !== "" ? states.filter(d => d.value === values.state)[0] : ""}
                                                options={states}
                                                color="primary"
                                                fullWidth
                                                onChange={(e) => {
                                                    console.log(e)
                                                    setFieldValue("state", e.value)
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6} md={7}>
                                            <Typography
                                                variant={"subtitle2"}
                                                sx={{ marginBottom: 2 }}
                                                fontWeight={700}
                                            >
                                                Pincode
                                            </Typography>
                                            <TextField
                                                // label="Pincode *"
                                                variant="outlined"
                                                name={"pincode"}
                                                fullWidth
                                                type="number"
                                                InputProps={{
                                                    inputProps: { min: 0 },
                                                }}
                                                value={values.pincode}
                                                onChange={(e) =>
                                                    setFieldValue("pincode", e.target.value)
                                                }
                                                error={
                                                    touched.pincode && Boolean(errors.pincode)
                                                }
                                                helperText={touched.pincode && errors.pincode}
                                            />
                                        </Grid>
                                        <br />

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
            </main>
        </Box>
    );
};

export default EditOrganization;