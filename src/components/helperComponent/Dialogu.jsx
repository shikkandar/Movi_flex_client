import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

export const Dialogu = (props) => {
    const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    window.location.replace(props.route);
  };
  return (
    <div>
      <React.Fragment>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          aria-labelledby="responsive-dialog-title">
          <DialogTitle id="responsive-dialog-title">
            Your session has expired
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Your session has expired. Please log in again to continue
              exploring. We're here to keep your experience seamless and secure.
              Thank you for your understanding.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleClose}
              autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    </div>
  )
}
