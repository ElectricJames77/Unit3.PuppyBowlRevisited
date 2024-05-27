import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import DeleteIcon from '@mui/icons-material/Delete';
import Typography from '@mui/material/Typography';


const SinglePlayer = () => {
    const [player, setPlayer] = useState({})
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const { id } = useParams()
    const navigate = useNavigate()
    console.log(loading ? 'I am loading' : 'I found something!')
    useEffect(() => {
        async function getData() {
            try {
                const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2402-FTB-ET-WEB-PT/players/${id}`)
                const data = await response.json()
                if (!response.ok) {
                    throw new Error("Player not found")
                }
                setPlayer(data.data.player)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
                setError(error.message)
            }
        }
        getData()
    },[id])

    const handleClick = async () => {
        if(window.confirm("Are you sure you want to remove this cute puppy?")){
            try {
                const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2402-FTB-ET-WEB-PT/players/${id}`,{
                    method: "DELETE"
                })
                if(!response.ok){
                    throw new Error("failed to delete player")
                }
            } catch (err) {
                console.error(
                `Whoops, trouble removing player #${id} from the roster!`,
                err
                );
            }
            
        navigate(`/players`)
    
        }
    };

    const handleReturn = () => {
        navigate(`/players`)
    }

    return (
        <>
            {error ? (
                <h1>{error}</h1>
            ) : player ? (
                <>
                <Card sx={{ maxWidth: 345, ml: 40}}>
                  <CardMedia
                    component="img"
                    alt={player.name+"'s image not found"}
                    height="140"
                    image={player.imageUrl}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                               {player.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Breed: {player.breed}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Status: {player.status}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        ID:    {player.id}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Chip
                    label="Return to Player List"
                    onClick={handleReturn}
                    variant="outlined"
                    />
                    <Chip
                    label="Delete this Player"
                    onClick={handleClick}
                    onDelete={handleClick}
                    deleteIcon={<DeleteIcon />}
                    variant="outlined"
                    />
                  </CardActions>
                </Card>
                </>
            ) : (
                <h1>Loading....</h1>
            )}
        </>
    )
}
export default SinglePlayer
