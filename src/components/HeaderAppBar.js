import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { useContext } from "react";
import AuthContext from "../store/auth-context";

const HeaderAppBar = () => {
  const authContext = useContext(AuthContext);
  const content = authContext.currentUser ? "Logout" : "Login with Google";
  const toggleAuthClickHandler = () => {
    if (authContext.currentUser) {
      authContext.onLogout();
    } else {
      authContext.onLogin();
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
