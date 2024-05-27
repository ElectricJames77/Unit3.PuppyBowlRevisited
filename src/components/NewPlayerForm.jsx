import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";


const NewPlayerForm = () => {
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [onField, setOnField] = useState(false);
    const navigate = useNavigate()
  
    const handleNameChange = (event) => {
        setName(event.target.value);
    };
  
    const handleBreedChange = (event) => {
        setBreed(event.target.value);
    };
  
    const handleImageUrlChange = (event) => {
        setImageUrl(event.target.value);
    };
  
    const handleOnFieldChange = (event) => {
        setOnField(event.target.checked);
    };
    const submitPlayer = async () => { 
        const status = onField ? "field" : "bench"
        try {


            const response = await fetch("https://fsa-puppy-bowl.herokuapp.com/api/2402-FTB-ET-WEB-PT/players", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: name, 
                breed: breed,
                status: status,
                imageUrl: imageUrl
            })    
        })
        if (!response.ok){
            throw new Error("Failed to create player")
        } else {
            navigate(`/players`)
        }
        } catch (err) {
            console.error("Oops, something went wrong with adding that player!", err);
        }
    }
  return (
    <>
    <FormGroup>
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                required
                id="name"
                label="Name"
                variant="standard"
                onChange={handleNameChange}
                />
            </div>
            <div>
                <TextField
                required
                id="breed"
                label="Breed"
                variant="standard"
                onChange={handleBreedChange}
                />
            </div>
            <div>
                <TextField
                required
                id="standard-helperText"
                label="image URL"
                variant="standard"
                onChange={handleImageUrlChange}
                />
            </div>
        </Box>
        <FormControlLabel control={<Switch checked={onField} onChange={handleOnFieldChange} />} label="On Field" />
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1, width: '25ch' },
            }}
            noValidate
        >
        <Button variant="outlined" onClick={() => submitPlayer()}>Submit Player</Button>
        </Box>
    </FormGroup>
    </>
  )
}
export default NewPlayerForm;