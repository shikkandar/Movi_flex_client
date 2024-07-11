import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { Image } from "react-bootstrap";
import logo from "../../assets/logo.png";
import { deepPurple } from "@mui/material/colors";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import { Dark } from "../Dark";

export const AdminHeader = () => {
  const settings = ["Swith to user", "Logout"];
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const pages = ["Dashboard", "Verify Tickets"];
  function handleDashboardClick() {
    navigate("/admin/dash");
  }
  function handleTicketClick() {
    navigate("/admin/ticketsVerification");
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  function handleLogoutClick() {
    localStorage.removeItem("admintoken");
    navigate("/");
  }
  function handleSwithUserClick() {
    navigate("/dashbord");
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
                        case "Verify Tickets":
                          handleTicketClick();
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
                      case "Verify Tickets":
                        handleTicketClick();
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
                  <Avatar sx={{ bgcolor: deepPurple[500] }}>A</Avatar>
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
                        case "Logout":
                          handleLogoutClick();
                          break;
                        case "Swith to user":
                          handleSwithUserClick();
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
      <Dark />
    </>
  );
};
