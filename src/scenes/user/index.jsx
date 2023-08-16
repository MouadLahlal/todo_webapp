import { Box, Button, IconButton, InputAdornment, TextField, Typography, colors } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { putChangeEmail, putChangePassword, putChangeUsername } from "../../api/user";

const User = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleUsrEmlFormSubmit = async (values) => {
    let usrOk = true, emlOk = true;
    if (values.username != localStorage.getItem('username')) {
        let changed = await putChangeUsername(values.username);
        if (!changed.ok) {
            alert('different')
            usrOk = false;
        }
    }
    if (values.email != localStorage.getItem('email')) {
        let changed = await putChangeEmail(values.email);
        if (!changed.ok) {
            emlOk = false;
        }
    }
    let response = "";
    response += usrOk ? "Username " : "";
    response += usrOk && emlOk ? "and " : "";
    response += emlOk ? "E-mail " : "";
    response += "changed";
    alert(response);
    if (usrOk && emlOk) navigate('dashboard');

  };
  const handlePswFormSubmit = async (values) => {
    let changed = await putChangePassword(values.oldpassword, values.confnewpassword);
    if (changed.ok) {
        alert('Password changed');
    } else {
        alert('Password not changed');
    }
  };

  return (
    <Box m="20px">
      <Header title="USER SETTINGS" subtitle="Update your profile settings" />

      <Formik
        onSubmit={handleUsrEmlFormSubmit}
        initialValues={initialUsrEmlValues}
        validationSchema={checkoutUsrEmlSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          handleReset,
        }) => (
          <form onSubmit={handleSubmit} onReset={handleReset}>
            <Typography
                variant="h3"
                color={colors.grey[100]}
                fontWeight="bold"
                sx={{ m: "0 0 5px 0" }}
            >
                Change Username and Email
            </Typography>
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
                    label="Username"
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
                    type="text"
                    label="Email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.email}
                    name="email"
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{ gridColumn: "span 2" }}
                />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
                <Button type="reset" color="secondary" variant="contained" sx={{ fontSize: 20, padding: "10px 20px", marginRight: 2 }}>
                    cancel
                </Button>
                <Button type="submit" color="secondary" variant="contained" sx={{ fontSize: 20, padding: "10px 20px" }}>
                    apply
                </Button>
            </Box>
          </form>
        )}
      </Formik>

      <Formik
        onSubmit={handlePswFormSubmit}
        // onReset={(values, formProps) => { return window.confirm('Reset?'); }}
        initialValues={initialPswValues}
        validationSchema={checkoutPswSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          handleReset,
        }) => (
          <form onSubmit={handleSubmit} onReset={handleReset}>
            <Typography
                variant="h3"
                color={colors.grey[100]}
                fontWeight="bold"
                sx={{ m: "0 0 5px 0" }}
            >
                Change Password
            </Typography>
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
                    type={showPassword ? 'text' : 'password'}
                    label="Current Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.oldpassword}
                    name="oldpassword"
                    InputProps={{
                    endAdornment: 
                        <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }}
                    error={!!touched.oldpassword && !!errors.oldpassword}
                    helperText={touched.oldpassword && errors.oldpassword}
                    sx={{ gridColumn: "span 2", marginBottom: "20px", textAlign: "center" }}
                />
                <TextField
                    fullWidth
                    variant="filled"
                    type={showPassword ? 'text' : 'password'}
                    label="New Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.newpassword}
                    name="newpassword"
                    InputProps={{
                    endAdornment: 
                        <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                    }}
                    error={!!touched.newpassword && !!errors.newpassword}
                    helperText={touched.newpassword && errors.newpassword}
                    sx={{ gridColumn: "span 2", marginBottom: "20px", textAlign: "center" }}
                />
                <TextField
                    fullWidth
                    variant="filled"
                    type={showPassword ? 'text' : 'password'}
                    label="Confirm New Password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.confnewpassword}
                    name="confnewpassword"
                    InputProps={{
                        endAdornment: 
                        <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                        </InputAdornment>
                    }}
                    error={!!touched.confnewpassword && !!errors.confnewpassword}
                    helperText={touched.confnewpassword && errors.confnewpassword}
                    sx={{ gridColumn: "span 2" }}
                />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="reset" color="secondary" variant="contained" sx={{ fontSize: 20, padding: "10px 20px", marginRight: 2 }}>
                cancel
              </Button>
              <Button type="submit" color="secondary" variant="contained" sx={{ fontSize: 20, padding: "10px 20px" }}>
                apply
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
const emailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const checkoutUsrEmlSchema = yup.object().shape({
    username: yup.string().required("required"),
    email: yup
        .string().required("required")
        .matches(emailRegExp, 'You must enter a valid e-mail'),
});
const checkoutPswSchema = yup.object().shape({
    oldpassword: yup.string().required("required"),
    newpassword: yup
        .string().required("required")
        .matches(passwordRegExp, 'Password must contain at least 8 characters and one number.'),
    confnewpassword: yup
        .string().required("required")
        .oneOf([yup.ref('newpassword')], "Passwords don't match"),
})
const initialUsrEmlValues = {
    username: await localStorage.getItem('username'),
    email: await localStorage.getItem('email'),
};
const initialPswValues = {
    oldpassword: "",
    newpassword: "",
    confnewpassword: "", // confirm new password
}

export default User;