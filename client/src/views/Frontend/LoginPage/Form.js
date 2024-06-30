/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from 'react-redux';
import { Formik } from "formik";
import * as yup from "yup";
import { toast } from 'react-toastify';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { isEmpty } from "lodash";
import firebase from '../../../config/firebase';
import { login, userLoaded } from '../../../redux/actions/authActions'
import { checkOwnerExistence, getOwnerDetails } from '../../../redux/actions/apiActions'
import setAuthToken from "../../../utils/setAuthToken";
import setGlobalLoader from '../../../redux/actions/loaderActions'

const validationSchema = yup.object({
  phoneNumber: yup
    .string()
    .trim()
    .required("Phone Number is required.")
    .min(10, "Phone number short than 10 digits.")
    .max(10, "Phone number long than 10 digits."),
});

const Form = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const isAuthenticated = useSelector(state => state.authReducer.isAuthenticated);

  // useEffect(() => {
  //   if (isAuthenticated === true) {
  //     navigate('/students');
  //   }
  // }, [isAuthenticated])

  const [stepper, setStepper] = useState(1);

  const handleOnSubmit = async (values) => {
    if (isEmpty(values.phoneNumber)) {
      return
    }
    if (!isEmpty(values.phoneNumber) && isEmpty(values.otp)) {


      dispatch(setGlobalLoader(true))

      try {
        await checkOwnerExistence({ phoneNumber: values.phoneNumber });
        dispatch(setGlobalLoader(false))
      } catch (error) {
        dispatch(setGlobalLoader(false))
        console.log("owner verification error", error);
        toast.error("User Doesn't Exist. Please signup or contact admin.");
        return
      }


      const recaptcha = new firebase.auth.RecaptchaVerifier('send_otp', {
        'size': 'invisible',
      })
      const phoneNumber = `+91${values.phoneNumber}`;
      firebase.auth().signInWithPhoneNumber(phoneNumber, recaptcha)
        .then((confirmationResult) => {
          setStepper(2);
          window.confirmationResult = confirmationResult;
          dispatch(setGlobalLoader(false))
        }).catch((error) => {
          console.log(error)
          dispatch(setGlobalLoader(false))
        });
      return;
    }
    if (!isEmpty(values.otp) && !isEmpty(values.phoneNumber)) {
      if (values.phoneNumber === "" || values.otp === "") {
        toast.error('Please fill all the required details');
        return
      }

      try {
        if (stepper === 2) {
          const confirmationResult = window.confirmationResult;

          let otp = values.otp
          dispatch(setGlobalLoader(true));
          confirmationResult.confirm(otp).then(async (result) => {

            dispatch(login(result))
            setAuthToken(result?.user?.Aa);

            try {
              dispatch(setGlobalLoader(true))
              const ownerDetails = await getOwnerDetails();
              dispatch(userLoaded(ownerDetails.data.data))
              setTimeout(() => {
                dispatch(setGlobalLoader(false))
                navigate('/students');
              }, 1000);
            } catch (error) {
              dispatch(setGlobalLoader(false))
              setAuthToken(null)
              console.log("get owner details error", error);
              toast.error(error.response.data.message ?? "Some error occured while fetching owner details");
              return
            }
          }).catch((error) => {
            console.log(error)
            toast.error('Otp not valid')
            navigate('/')
            return
          });
        }
        else {
          navigate('/login')
          return
        }
      }
      catch (error) {
        console.log(error)
        navigate('/login')
        return
      }
    }
    navigate('/login')
  };
  return (
    <Box>
      <Formik
        initialValues={{
          phoneNumber: "",
          otp: "",
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
                  Login
                </Typography>
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  Welcome back
                </Typography>
                <Typography color="text.secondary">
                  {/* Login to manage your account. */}
                </Typography>
              </Box>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={4}>
                  {stepper === 1 && (
                    <Grid item xs={12}>
                      <Typography
                        variant={"subtitle2"}
                        sx={{ marginBottom: 2 }}
                      >
                        Enter Phone Number
                      </Typography>
                      <TextField
                        label="Phone Number *"
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
                  )}
                  {stepper === 2 && (
                    <Grid item xs={12}>
                      <Typography
                        variant={"subtitle2"}
                        sx={{ marginBottom: 2 }}
                      >
                        Enter OTP
                      </Typography>
                      <TextField
                        label="OTP *"
                        variant="outlined"
                        name={"otp"}
                        type={"otp"}
                        fullWidth
                        value={values.otp}
                        onChange={(e) =>
                          setFieldValue("otp", e.target.value)
                        }
                        error={touched.otp && Boolean(errors.otp)}
                        helperText={touched.otp && errors.otp}
                      />
                    </Grid>
                  )}
                  <Grid item container xs={12}>
                    {stepper === 1 && (
                      <Button
                        id='send_otp'
                        size={"large"}
                        variant={"contained"}
                        type={"submit"}
                      >
                        Send OTP
                      </Button>
                    )}
                    {stepper === 2 && (
                      <Button
                        size={"large"}
                        variant={"contained"}
                        type={"submit"}
                      >
                        Sumit
                      </Button>
                    )}
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
