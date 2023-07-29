import { Box, Button, TextField, Typography } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { postLogin } from "../../api/auth";
import { Link } from "react-router-dom";
import { useState } from "react";

const Login = ({setlogged}) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();

  const handleFormSubmit = async (values) => {
    let logged = await postLogin(values.username.toString(), values.password.toString());
    if (logged.status) {
      localStorage.setItem('accessToken', logged.accessToken);
      setlogged(true);
      navigate('/dashboard');
    }
  };

  return (
    <Box m="20px">
      <Header title="LOGIN" subtitle="Create a New User Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                display: "block",
                textAlign: "center"
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Username / Email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.username}
                name="username"
                error={!!touched.username && !!errors.username}
                helperText={touched.username && errors.username}
                sx={{ gridColumn: "span 2", marginBottom: "20px", textAlign: "center" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.password}
                name="password"
                error={!!touched.password && !!errors.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained" sx={{ fontSize: 20, padding: "10px 20px" }}>
                login
              </Button>
            </Box>
          </form>
        )}
      </Formik>
      <Box sx={{ textAlign: 'center', marginTop: '200px' }}>
        <Link to={"/signup"}>
          <Typography>
            Don't have an account? Create one.
          </Typography>
        </Link>
      </Box>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  username: yup.string().required("required"),
  password: yup.string().required("required"),
});
const initialValues = {
  username: "",
  password: "",
};

export default Login;
