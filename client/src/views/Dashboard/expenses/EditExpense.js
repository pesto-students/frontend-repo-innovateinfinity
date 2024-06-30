import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { useDispatch } from 'react-redux'
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
import setGlobalLoader from '../../../redux/actions/loaderActions'
import { getOrganizations, getDriverById, updateDriver } from '../../../redux/actions/apiActions'


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
        .max(10, "Phone number long than 10 digits.")
})


// NOT being used currently


const EditDriver = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    // const [selectedDriver, setSelectedDriver] = useState({});
    // const [status, setStatus] = useState({});
    const [organizations, setOrganizations] = useState([]);
    const [driverDetails, setDriverDetails] = useState(null);
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

    useEffect(() => {
        dispatch(setGlobalLoader(true))
        async function organizationFunc() {
            try {
                const orgRes = await getOrganizations();
                const data = orgRes.data.data.map((d, i) => ({
                    label: d?.name,
                    value: d?._id,
                }))
                setOrganizations(data);
                dispatch(setGlobalLoader(false))
            } catch (error) {
                dispatch(setGlobalLoader(false))
                console.log("get Organizations error", error);
                toast.error(error.response.data.msg ?? "some error occured while fetching organization list");
            }
        }
        organizationFunc();
    }, [])

    useEffect(() => {
        if (params.id !== null && params.id !== undefined) {
            dispatch(setGlobalLoader(true))
            async function studentFunc() {
                try {
                    const driverRes = await getDriverById(params.id);
                    setDriverDetails(driverRes?.data?.data[0]);
                    // if (driverRes?.data?.data[0]?.organizationId !== null && driverRes?.data?.data[0]?.organizationId !== undefined) {
                    //     setSelectedOrganization({ value: driverRes?.data?.data[0]?.organizationId?._id, label: driverRes?.data?.data[0]?.organizationId?.name })
                    // }
                    dispatch(setGlobalLoader(false))
                } catch (error) {
                    dispatch(setGlobalLoader(false))
                    console.log("get student details error", error);
                    toast.error(error.response.data.msg ?? "some error occured while fetching student details");
                }
            }
            studentFunc();
        }
    }, [params.id])

    const handleOnSubmit = async (values) => {

        const data = { ...values, driverId: params.id }

        try {
            await updateDriver(data);
            toast.success("Driver updated successfully");
            navigate("/drivers")
            dispatch(setGlobalLoader(false))
        } catch (error) {
            dispatch(setGlobalLoader(false))
            console.log("update driver error", error);
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
                        Edit Driver
                    </Typography>

                    <Formik
                        initialValues={{
                            name: driverDetails?.name,
                            phoneNumber: driverDetails?.phoneNumber,
                            organizationId: driverDetails?.organizationId?._id ?? null,
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
                                                Enter Name
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
                                                InputProps={{
                                                    inputProps: { min: 0 },
                                                }}
                                                value={values.phoneNumber}
                                                onChange={(e) =>
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
                                                fontWeight={700}
                                            >
                                                Select Organization
                                            </Typography>
                                            <Select
                                                isDisabled={driverDetails?.organizationId !== null && driverDetails?.organizationId !== undefined}
                                                placeholder="Select Organization"
                                                value={(values.organizationId !== null && values.organizationId !== undefined) ? organizations.filter(d => d.value === values.organizationId)[0] : null}
                                                options={organizations}
                                                color="primary"
                                                fullWidth
                                                onChange={(e) => {
                                                    setFieldValue("organizationId", e.value)
                                                }}
                                            />
                                        </Grid>
                                        <br />
                                        <br />
                                        <br />
                                        <br />
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

export default EditDriver;