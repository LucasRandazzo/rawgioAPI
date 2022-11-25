import { Box, Divider, Typography } from "@mui/material";
import styles from './styles'

export function GenreCard({genrer}){
  return (
    <Box sx={{
      
        display:'flex',
        padding:'16px',
        flexDirection:'column',
        justifyContent:'center',
        background:'#202020',
        borderRadius: '12px 12px 12px 12px',
        minHeight:'280px',
        backgroundColor:'rgb(32, 32, 32)',
        backgroundImage: `linear-gradient(rgba(32, 32, 32, 0.5), rgb(32, 32, 32) 70%), url(${genrer.image_background})`,
        backgroundPosition: '50%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        boxShadow: '0 10px 20px 0 rgb(0 0 0 / 20%)'
    }}>
        <Typography sx={styles.title}>{genrer.name}</Typography>
        <Box sx={{marginTop:'24px'}}>
          <Typography sx={styles.gameName}>Jogos populares</Typography>
          <Divider sx={styles.divider}/>
          <Box sx={styles.gamesGender}>
            {genrer.games.map(game=>(
          <Typography key={String(game.id)} sx={styles.gameName}>{game.name}</Typography>
            ))}
          </Box>
     
        </Box>
    </Box>
  )
}