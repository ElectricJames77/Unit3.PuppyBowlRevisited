import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


 const AllPlayers = () => {
    const [players, setAllPlayers] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const searchTerm = useSelector(state => state.searchTerm)
    
    const filteredPlayers = players.filter(player=> player.name.toLowerCase().includes(searchTerm.toLowerCase()))


    useEffect(()=>{
        async function getData(){
            try{
                const response = await fetch('https://fsa-puppy-bowl.herokuapp.com/api/2402-FTB-ET-WEB-PT/players')
                const data = await response.json()
                setAllPlayers(data.data.players)
                setLoading(false)
            }catch(error){
                console.log(error)
                setLoading(false)
            }
        }
        getData()
    }, [])

  return (
   <>
   {loading ? (<h1>Loading players</h1>) : (
    <div className="grid grid-cols-4 gap-4">
        {filteredPlayers?.map((player)=>{
            return (
                <>
                    <Card sx={{ maxWidth: 300 }}>
                        <CardMedia
                            sx={{ height: 325 }}
                            image={player.imageUrl}
                            title={player.id}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                            {player.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={()=>navigate(`/player/${player.id}`)}>See more info</Button>
                        </CardActions>
                    </Card>
                    {/* 
                    <div className="player" key={player.id} onClick={()=>navigate(`/player/${player.id}`)}>
                        <img src={player.imageUrl} alt="No player image" height={20} width={20}/>
                        <h2>{player.name}</h2>
                    </div> */}
                </>
            )
        })}
    </div>
   )}
   </>
  )
}

export default AllPlayers