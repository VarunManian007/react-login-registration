import { AppBar, Toolbar, Typography, Button, Box, Container, useMediaQuery, IconButton, Menu, MenuItem } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";

const Header = ({ category }: { category: "register" | "login" }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const headerStyles = {
    appBar: {
      backgroundColor: "white", 
      color: "black", 
      boxShadow: 1, 
      width: "100%"
    },
    toolbar: {
      display: "flex",
      justifyContent: "space-between",
      overflow: "hidden"
    }
  };

  return (
    <AppBar sx={headerStyles.appBar}>
      <Container maxWidth="xl">
        <Toolbar sx={headerStyles.toolbar}>
          <Typography variant="h6">MyCompany</Typography>
          <Box>
            {category === "login" ? (
              isMobile ? (
                <Button component={Link} to="/register" variant="contained" color="primary">Register</Button>
              ) : (
                <>
                  <Typography display="inline" sx={{ mr: 1 }}>Not a member yet?</Typography>
                  <Button component={Link} to="/register" variant="contained" color="primary">Register</Button>
                </>
              )
            ) : category === "register" ? (
              isMobile ? (
                <Button component={Link} to="/login" variant="contained" color="primary">Login</Button>
              ) : (
                <>
                  <Typography display="inline" sx={{ mr: 1 }}>Already a member?</Typography>
                  <Button component={Link} to="/login" variant="contained" color="primary">Login</Button>
                </>
              )
            ) : (
              <>
                <IconButton onClick={handleMenuOpen} color="inherit">
                  <AccountCircleIcon />
                </IconButton>
                <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;