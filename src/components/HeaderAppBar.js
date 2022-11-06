import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { getRedirectResult, signInWithRedirect, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";

import { auth, googleAuthProvider } from "../firebase-config";
import { login, logout } from "../store/authSlice";

const HeaderAppBar = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const content = currentUser ? "Logout" : "Login with Google";

  const toggleAuthClickHandler = () => {
    if (currentUser) {
      signOut(auth)
        .then(() => {
          dispatch(logout());
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      signInWithRedirect(auth, googleAuthProvider)
        .then((response) => {
          return getRedirectResult(auth);
        })
        .then((result) => {
          dispatch(login(result.user.uid));
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todos List App
          </Typography>
          <Button color="inherit" onClick={toggleAuthClickHandler}>
            {content}
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default HeaderAppBar;
