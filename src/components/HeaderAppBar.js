import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { signInWithRedirect, signOut } from "firebase/auth";
import { auth, googleAuthProvider } from "../firebase-config";

const HeaderAppBar = (props) => {
  const content = props.currentUser ? "Logout" : "Login with Google";
  const toggleAuthClickHandler = () => {
    if (props.currentUser) {
      signOut(auth);
    } else {
      signInWithRedirect(auth, googleAuthProvider);
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
