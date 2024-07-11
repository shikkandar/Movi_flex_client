import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Brightness3Icon from '@mui/icons-material/Brightness3';
import LightModeIcon from '@mui/icons-material/LightMode';

export const Dark = () => {
    const [themeBtn, setThemeBtn] = useState(true);

    const ModeBtn = () => {
        setThemeBtn(!themeBtn);
    };

    return (
        <Avatar onClick={ModeBtn} sx={{cursor:'pointer', position: 'fixed', bottom: "20px", right: "10px", backgroundColor :themeBtn ?"#000":"#f29f05" }}>
            {themeBtn ? <Brightness3Icon /> : <LightModeIcon />}
        </Avatar>
    );
};
