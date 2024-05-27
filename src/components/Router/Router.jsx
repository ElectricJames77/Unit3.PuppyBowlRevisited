import {Route, Routes} from 'react-router-dom'
import AllPlayers from '../AllPlayers'
import SinglePlayer from '../SinglePlayer'
import NewPlayerForm from '../NewPlayerForm'
const Router = () => {
  return (
    <Routes>
        <Route path='/' element={<h1>Home page</h1>}/>
        <Route path='/players' element={<AllPlayers/>}/>
        <Route path='/player/:id' element ={<SinglePlayer/>}/>
        <Route path='/players/newplayerform' element={<NewPlayerForm/>}/>
    </Routes>
  )
}

export default Router