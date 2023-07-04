import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------
import userLogin from 'src/auth/userLogin';
import { projectAuth } from 'src/firebase/firebase';


export default function LoginForm() {
  const navigate = useNavigate();


  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const { error, login } = userLogin()


  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";
  const handleClick = async () => {

    await login(email, password);
    if (!error) {
      console.log("hi")
      navigate(from, { replace: true });
      setEmail("");
      setPassword("");

      
      return;
    } else {
      const errorMessage = "Invalid Email Or Password";
      setErrorMessage(errorMessage);
    }

  };

  const user = projectAuth.currentUser;

    return (
      <>
        <p style={{ "color": "red" }}>{error && <p>{errorMessage}</p>}</p>
        <Stack spacing={3}>
          <TextField name="email" label="Email address" onChange={(e) => setEmail(e.target.value)} />

          <TextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          {/* <Checkbox name="remember" label="Remember me" /> */}
          {/* <Link variant="subtitle2" underline="hover">
            Forgot password?
          </Link> */}
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
          Login
        </LoadingButton>
      </>
    );
  



}
