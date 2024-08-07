import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/fetch.hooks";
import avatar from "../assets/13369169.jpg";
import { Image } from "react-bootstrap";
import logo from "../assets/logo.png";
import { Dark } from "./Dark";

export const Header = () => {
  const [{ apiData, isLoading, auth }] = useFetch();
  const pages = [
    "Dashboard",
    "Tickets",
    auth === true ? "Admin" : undefined,
  ].filter(Boolean);
  const settings = ["Profile", "Logout"];
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const usertoken = localStorage.getItem("token");
  const admintoken = localStorage.getItem("admintoken");

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function handleProfileClick() {
    navigate("/profile");
  }
  function handleDashboardClick() {
    navigate("/dashbord");
  }
  function handleTicketClick() {
    navigate("/dashbord/tickets");
  }
  function handleAdminClick() {
    if (admintoken && usertoken) {
      navigate("/admin/dash");
    } else {
      navigate("/admin");
    }
  }
  function handleLogoutClick() {
    localStorage.removeItem("token");
    localStorage.removeItem("admintoken");
    navigate("/");
  }

  return (
    <>
    <AppBar
      position="sticky"
      sx={{ backgroundColor: "#FDB805", color: "#000" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Image
            src={logo}
            style={{ width: "30px" }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}>
            ovi-Flex
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}>
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => {
                    switch (page) {
                      case "Dashboard":
                        handleDashboardClick();
                        break;
                      case "Tickets":
                        handleTicketClick();
                        break;
                      case "Admin":
                        handleAdminClick();
                        break;
                      default:
                        handleCloseNavMenu();
                        break;
                    }
                  }}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => {
                  switch (page) {
                    case "Dashboard":
                      handleDashboardClick();
                      break;
                    case "Tickets":
                      handleTicketClick();
                      break;
                    case "Admin":
                      handleAdminClick();
                      break;
                    default:
                      handleCloseNavMenu();
                      break;
                  }
                }}
                sx={{ my: 2, color: "black", display: "block" }}>
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton
                onClick={handleOpenUserMenu}
                sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src={apiData && apiData.profile ? apiData.profile : avatar}
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>
              {settings.map((setting) => (
                <MenuItem
                  key={setting}
                  onClick={() => {
                    switch (setting) {
                      case "Profile":
                        handleProfileClick();
                        break;
                      case "Logout":
                        handleLogoutClick();
                        break;
                      default:
                        handleCloseUserMenu();
                        break;
                    }
                  }}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    <Dark/>
    </>
  );
};
