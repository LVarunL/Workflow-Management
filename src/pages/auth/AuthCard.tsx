import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControl,
  Stack,
} from "@mui/material";
import React, { useRef } from "react";
import { NavLink } from "react-router";

interface AuthCardProps {
  submitCallback: Function;
  authPageName: "Login" | "Sign Up" | "Forgot Password";
}

const AuthCard: React.FC<AuthCardProps> = ({
  submitCallback,
  authPageName,
}) => {

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  function handleSubmit(){
    if(authPageName==="Sign Up"){
     
      submitCallback(emailRef.current.value,passwordRef.current.value,confirmPasswordRef.current.value);
    }
    else if(authPageName==="Login"){
      submitCallback(emailRef.current.value,passwordRef.current.value);
    }
    else
    {

    }
  }

  return (
    <Card sx={{ maxWidth: 400, mx: "auto", mt: 5, p: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" textAlign="center" marginBottom={2}>
          {authPageName}
        </Typography>
        <FormControl fullWidth>
          <Stack spacing={2}>
            <TextField label="Email ID" variant="outlined" required fullWidth inputRef={emailRef}/>
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              required
              fullWidth
              inputRef={passwordRef}
            />
            {authPageName === "Sign Up" && (
              <TextField
                label="Confirm Password"
                variant="outlined"
                type="password"
                required
                fullWidth
                inputRef={confirmPasswordRef}
              />
            )}
            {/* {authPageName==="Login" && <Typography
                variant="body2"
                textAlign="right"
                component={NavLink}
                to="/login" //change to forgot password
                sx={{width:120 ,color: "primary.main", cursor: "pointer" , alignSelf:"end"}}
              > 
                Forgot Password?
              </Typography>} */}
            <Button variant="contained" fullWidth onClick={handleSubmit}>
              {authPageName}
            </Button>

            {authPageName === "Login" ? (
              <Typography variant="body2" textAlign="center">
                Don't have an account?{" "}
                <NavLink
                  to="/signup"
                  style={{ color: "blue", textDecoration: "none" }}
                >
                  Sign Up
                </NavLink>
              </Typography>
            ) : (
              <Typography variant="body2" textAlign="center">
                Already have an account?{" "}
                <NavLink
                  to="/login"
                  style={{ color: "blue", textDecoration: "none" }}
                >
                  Login
                </NavLink>
              </Typography>
            )}
          </Stack>
        </FormControl>
      </CardContent>
    </Card>
  );
};

export { AuthCard };
