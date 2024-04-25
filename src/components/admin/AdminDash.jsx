import React, { useEffect, useState } from 'react';
import { AdminHeader } from './AdminHeader';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';

export const AdminDash = () => {
    const[age,setAge]=useState()
    const [theaters, setTheaters] = useState([]);
    console.log(theaters);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/theaters');
                setTheaters(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <div>
            <AdminHeader />
            <Box sx={{ minWidth: 120, width: "200px", marginTop: "200px" }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="Age"
                        onChange={handleChange}
                    >
                        {theaters.map((val, i) => (
                            val.runningMovies && (
                                <MenuItem key={i} value={val.name}>{val.name}</MenuItem>
                            )
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </div>
    );
};
