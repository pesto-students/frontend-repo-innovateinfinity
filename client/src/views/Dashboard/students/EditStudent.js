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
import setGlobalLoader from '../../../redux/actions/loaderActions'
import { getOrganizations, getStudentById, updateStudent } from '../../../redux/actions/apiActions'
import { STUDENT_STATUS } from '../../../utils/constants';
import { PROFILES } from '../../../utils/constants';


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
})

const EditStudent = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const role = useSelector(state => state.authReducer.role);
    const profile = useSelector(state => state.authReducer.profile);
    const [selectedOrganization, setSelectedOrganization] = useState({});
    const [organizations, setOrganizations] = useState([]);
    // const [drivers, setDrivers] = useState([]);
    const [studentDetails, setStudentDetails] = useState(null);
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
        if (profile === PROFILES.ADMIN) {
            dispatch(setGlobalLoader(true))
            async function organizationFunc() {
                const query = '?approved=true';
                try {
                    const orgRes = await getOrganizations(role, query);
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
        }
    }, [])

    useEffect(() => {
        if (params.id !== null && params.id !== undefined) {
            dispatch(setGlobalLoader(true))
            async function studentFunc() {
                try {
                    const studentRes = await getStudentById(role, params.id);
                    setStudentDetails(studentRes?.data?.data[0]);
                    if (studentRes?.data?.data[0]?.organizationId !== null && studentRes?.data?.data[0]?.organizationId !== undefined) {
                        setSelectedOrganization({ value: studentRes?.data?.data[0]?.organizationId?._id, label: studentRes?.data?.data[0]?.organizationId?.name })
                    }
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

    // useEffect(() => {
    //     if (selectedOrganization.value !== null && selectedOrganization.value !== undefined) {
    //         dispatch(setGlobalLoader(true))
    //         async function driverFunc() {
    //             try {

    //                 let query = "";
    //                 if (profile === PROFILES.ADMIN) {
    //                     query = `?organizationId=${selectedOrganization.value}`;
    //                 }

    //                 const driverRes = await getDrivers(role, query);

    //                 const data = driverRes.data.data.map((d, i) => ({
    //                     label: d?.name,
    //                     value: d?._id,
    //                 }))
    //                 setDrivers(data);
    //                 dispatch(setGlobalLoader(false))
    //             } catch (error) {
    //                 dispatch(setGlobalLoader(false))
    //                 console.log("get driver list error", error);
    //                 toast.error(error.response.data.msg ?? "some error occured while fetching driver list");
    //             }
    //         }
    //         driverFunc();
    //     }
    // }, [selectedOrganization])


    const handleOnSubmit = async (values) => {

        try {
            await updateStudent(role, params.id, values);
            toast.success("Student updated successfully");
            navigate("/students")
            dispatch(setGlobalLoader(false))
        } catch (error) {
            dispatch(setGlobalLoader(false))
            console.log("update student error - admin", error);
            toast.error(error.response.data.msg ?? "Some error occured.");
        }
    }

    const statusOptions = Object.keys(STUDENT_STATUS).map(d => ({
        value: d,
        label: d
    }))

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
                        Edit Student
                    </Typography>

                    <Formik
                        initialValues={{
                            name: studentDetails?.name,
                            phoneNumber: studentDetails?.phoneNumber,
                            organizationId: studentDetails?.organizationId?._id ?? null,
                            // driverId: studentDetails?.driverId?._id ?? null,
                            status: studentDetails?.status
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
                                        {profile === PROFILES.ADMIN &&
                                            <Grid item xs={12} sm={6} md={7}>
                                                <Typography
                                                    variant={"subtitle2"}
                                                    fontWeight={700}
                                                >
                                                    Select Organization
                                                </Typography>
                                                <Select
                                                    isDisabled={studentDetails?.organizationId !== null && studentDetails?.organizationId !== undefined}
                                                    placeholder="Select Organization"
                                                    value={(values.organizationId !== null && values.organizationId !== undefined) ? organizations.filter(d => d.value === values.organizationId)[0] : null}
                                                    options={organizations}
                                                    color="primary"
                                                    fullWidth
                                                    onChange={(e) => {
                                                        setSelectedOrganization(e)
                                                        setFieldValue("organizationId", e.value)
                                                    }}
                                                />
                                            </Grid>
                                        }
                                        {/* <Grid item xs={12} sm={6} md={7}>
                                            <Typography
                                                variant={"subtitle2"}
                                                fontWeight={700}
                                            >
                                                Select Driver
                                            </Typography>
                                            <Select
                                                placeholder="Select Driver"
                                                value={(values.driverId !== null && values.driverId !== undefined) ? drivers.filter(d => d.value === values.driverId)[0] : null}
                                                options={drivers}
                                                color="primary"
                                                fullWidth
                                                onChange={(e) => {
                                                    // setSelectedDriver(e)
                                                    setFieldValue("driverId", e.value)
                                                }}
                                            />
                                        </Grid> */}
                                        <Grid item xs={12} sm={6} md={7}>
                                            <Typography
                                                variant={"subtitle2"}
                                                fontWeight={700}
                                            >
                                                Status
                                            </Typography>
                                            <Select
                                                placeholder="Select Status"
                                                value={statusOptions.filter(d => d.value === values.status)}
                                                options={statusOptions}
                                                color="primary"
                                                fullWidth
                                                onChange={(e) => {
                                                    // setStatus(e)
                                                    setFieldValue("status", e.value)
                                                }}
                                            />
                                        </Grid>
                                        <br />
                                        <br />
                                        <br />
                                        <br />
                                        <br />
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

export default EditStudent;
