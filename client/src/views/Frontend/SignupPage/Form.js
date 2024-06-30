/* eslint-disable react/no-unescaped-entities */
import React from "react";
import { useNavigate } from "react-router";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import setGlobalLoader from "../../../redux/actions/loaderActions";
import { organizationSignup } from "../../../redux/actions/apiActions";
import { states } from "../../../utils/constants";

const validationSchema = yup.object({
  phoneNumber: yup
    .string()
    .trim()
    .required("Phone Number is required.")
    .min(10, "Phone number short than 10 digits.")
    .max(10, "Phone number long than 10 digits."),
  name: yup.string().trim().required("Name is required."),
  email: yup.string().trim().required("Email is required."),
  address: yup.string().trim().required("Address is required."),
  city: yup.string().trim().required("City is required."),
  pincode: yup.string().trim().required("Pincode is required."),
});

const Form = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnSubmit = async (values) => {
    if (values.state === "") {
      toast.error("Please select a State.");
      return;
    }
    try {
      await organizationSignup(values);
      toast.success("Details saved successfully. We will contact you soon.");
      navigate("/login");
      dispatch(setGlobalLoader(false));
    } catch (error) {
      dispatch(setGlobalLoader(false));
      console.log("create Organization error", error);
      toast.error(
        error.response.data.msg ??
          "some error occured while raising the request."
      );
    }
  };
  return (
    <Box>
      <Formik
        initialValues={{
          phoneNumber: "",
          name: "",
          email: "",
          city: "",
          state: "",
          pincode: "",
          address: "",
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleOnSubmit(values)}
      >
        {(formikProps) => {
          const { values, errors, touched, setFieldValue, handleSubmit } =
            formikProps;
          return (
            <>
              <Box marginBottom={4}>
                <Typography
                  sx={{
                    textTransform: "uppercase",
                    fontWeight: "medium",
                  }}
                  gutterBottom
                  color={"text.secondary"}
                >
                  Signup
                </Typography>
                <Typography
                  variant='h4'
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  Welcome
                </Typography>
                <Typography color='text.secondary'>
                  {/* Login to manage your account. */}
                </Typography>
              </Box>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={4}>
                  <>
                    <Grid item xs={12}>
                      <Typography
                        variant={"subtitle2"}
                        sx={{ marginBottom: 1 }}
                      >
                        Driving School Name
                      </Typography>
                      <TextField
                        label='Name *'
                        variant='outlined'
                        name={"name"}
                        fullWidth
                        value={values.name}
                        onChange={(e) => setFieldValue("name", e.target.value)}
                        error={touched.name && Boolean(errors.name)}
                        helperText={touched.name && errors.name}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        variant={"subtitle2"}
                        sx={{ marginBottom: 1 }}
                      >
                        Phone Number
                      </Typography>
                      <TextField
                        label='Phone Number *'
                        variant='outlined'
                        name={"phoneNumber"}
                        fullWidth
                        type='number'
                        InputProps={{
                          inputProps: { min: 0 },
                        }}
                        value={values.phoneNumber}
                        onChange={(e) =>
                          e.target.value.toString().length > 10
                            ? setFieldValue(
                                "phoneNumber",
                                e.target.value.substring(0, 10)
                              )
                            : setFieldValue("phoneNumber", e.target.value)
                        }
                        error={
                          touched.phoneNumber && Boolean(errors.phoneNumber)
                        }
                        helperText={touched.phoneNumber && errors.phoneNumber}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        variant={"subtitle2"}
                        sx={{ marginBottom: 1 }}
                      >
                        Email
                      </Typography>
                      <TextField
                        label='Email'
                        variant='outlined'
                        name={"email"}
                        fullWidth
                        value={values.email}
                        onChange={(e) => setFieldValue("email", e.target.value)}
                        error={touched.email && Boolean(errors.email)}
                        helperText={touched.email && errors.email}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        variant={"subtitle2"}
                        sx={{ marginBottom: 1 }}
                      >
                        Address
                      </Typography>
                      <TextField
                        label='Address *'
                        variant='outlined'
                        name={"address"}
                        fullWidth
                        value={values.address}
                        onChange={(e) =>
                          setFieldValue("address", e.target.value)
                        }
                        error={touched.address && Boolean(errors.address)}
                        helperText={touched.address && errors.address}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        variant={"subtitle2"}
                        sx={{ marginBottom: 1 }}
                      >
                        City
                      </Typography>
                      <TextField
                        label='City *'
                        variant='outlined'
                        name={"city"}
                        fullWidth
                        value={values.city}
                        onChange={(e) => setFieldValue("city", e.target.value)}
                        error={touched.city && Boolean(errors.city)}
                        helperText={touched.city && errors.city}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        variant={"subtitle2"}
                        sx={{ marginBottom: 1 }}
                      >
                        State
                      </Typography>
                      <Select
                        placeholder='State *'
                        value={
                          values.state !== ""
                            ? states.filter((d) => d.value === values.state)[0]
                            : ""
                        }
                        options={states}
                        color='primary'
                        fullWidth
                        // below 2 settings are required, to fix z-index of the dropdown of select
                        menuPortalTarget={document.body}
                        menuPosition='fixed'
                        onChange={(e) => {
                          setFieldValue("state", e.value);
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography
                        variant={"subtitle2"}
                        sx={{ marginBottom: 1 }}
                      >
                        Pincode
                      </Typography>
                      <TextField
                        label='Pincode *'
                        variant='outlined'
                        name={"pincode"}
                        fullWidth
                        type='number'
                        InputProps={{
                          inputProps: { min: 0 },
                        }}
                        value={values.pincode}
                        onChange={(e) =>
                          setFieldValue("pincode", e.target.value)
                        }
                        error={touched.pincode && Boolean(errors.pincode)}
                        helperText={touched.pincode && errors.pincode}
                      />
                    </Grid>
                  </>
                  <Grid item container xs={12}>
                    <Button
                      id='send_otp'
                      size={"large"}
                      variant={"contained"}
                      type={"submit"}
                    >
                      Confirm
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </>
          );
        }}
      </Formik>
    </Box>
  );
};

export default Form;
