import { Box, CircularProgress, Typography, useMediaQuery } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getCreators, getGameByID } from "../../services/rawgio";
import { Breadcrumb } from "./components/BreadCrumb";

export function DetailsView(){
  const [game,setGame] = useState({})
  const [creators,setCreators] = useState([])
  const [loading,setLoading] = useState(true)

  const { query } = useRouter()
  const ID = query.id

  const isSmallScreen = useMediaQuery('(max-width:860px)') 
  const isMidScreen = useMediaQuery('(max-width:1440px)');
  const isLargeScreen = useMediaQuery('(max-width:1600px)');
  const isLargeXScreen = useMediaQuery('(max-width:4000px)');

  const breakpoints = ()=>{
    if(isSmallScreen){
      return 'repeat(1,1fr)'
    }
    if(isMidScreen){
      return 'repeat(2,1fr)'
    }
    if(isLargeScreen){
      return 'repeat(3,1fr)'
    }
    if(isLargeXScreen){
      return 'repeat(4,1fr)'
    }
  
  }

  const getGame = async ()=>{
    try{
      const response = await getGameByID(ID)
      setGame(response)
    } catch{

      console.log('Deu erro')
    }
  }

  const getGameCreators = async ()=>{
    try{
      const response = await getCreators(ID)
      setCreators(response.results)
    } catch{
      console.log('Deu erro')
    }
  }

  const formatReleasedDate= ()=>{
    if(!game.released){
      return 'N/A'
    }
    const date = game.released 
    const split = date.split('-')
    const newDate = `${split[2]}/${split[1]}/${split[0]}`
  
    return newDate
  }
  const loadInitialData = async ()=>{
    try{
      await Promise.all([getGame(),getGameCreators()])
      document.body.style.backgroundColor= 'rgb(32, 32, 32)';
      setLoading(false)
    }catch{
      setLoading(false)
      console.log('Deu erro')

    }
  }
  useEffect(()=>{
   if(!ID){
    return
   }
   loadInitialData()
  },[ID])

  if(loading){
    return (
      <Box sx={{display:'flex', flex: 1, justifyContent:'center', alignItems:'center', height:'100vh'}}>
        <CircularProgress color="warning"/>
      </Box>
    )
  }
  return (
    <Box sx={{
      display: 'flex',
      position:'relative',
      backgroundImage: `linear-gradient(rgba(32, 32, 32, 0.7), rgb(32, 32, 32) 45%), url(${game.background_image})`,
      backgroundPosition: '50%',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      height:'100vh'
    }}>
      <Box sx={{
        position:'absolute',
        top:'10px',
        left:'20px'
      }}>
        <Breadcrumb game={game.name}/>
      </Box>
      <Box sx={{

        padding:'24px',
        display:'flex',
        flexDirection:'column',
        width:'100%',
 


      }}>
      <Typography sx={{
        color:'#FFF',
        fontWeight:'bold',
        alignSelf:'center',
      
      }} variant="h2">{game?.name}</Typography>
      
      <Box sx={{
        alignSelf:'center',
        color:'#FFF',
        width:'550px',
        
      }}>
      <Typography variant="h4" sx={{
        fontWeight:'bold',
        margin:'24px 0px'
      }}>
        Sobre
      </Typography>
      <Typography sx={{fontWeight:'bold'}} dangerouslySetInnerHTML={{ __html: game.description }}/>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: isSmallScreen ? '1fr' : 'repeat(2,1fr)',
          marginTop: '24px',
          gap:'24px',
          
        }}>
            <Box sx={{
              display:'flex',
              flexDirection:'column'
            }}>
            <Typography sx={{
              marginBottom:'12px',
              color:'#FFFFFF33'
            }}>Plataformas</Typography>
            <Typography>
              {game.platforms.map(item=> item.platform.name).join(', ')}
            </Typography>
            </Box>
            <Box sx={{
              display:'flex',
              flexDirection:'column'
            }}>
            <Typography sx={{
              marginBottom:'12px',
              color:'#FFFFFF33'
            }}>Metascore
            </Typography>
            <Typography
            sx={{
              border: `1px solid ${game.metacritic < 50 ? '#ad5756' : game.metacritic < 80 ? '#fdca52' : '#6dc849'}`,
              color: game.metacritic < 50 ? '#ad5756' : game.metacritic < 80 ? '#fdca52' : '#6dc849',
              borderRadius:'5px',
              width:'32px',
              padding:'2px 0px',
              display: 'flex',
              alignItems:'center',
              justifyContent:'center',
              fontWeight:'bold'
            }}
            >{game.metacritic}</Typography>
            </Box>

            <Box sx={{
              display:'flex',
              flexDirection:'column'
            }}>
            <Typography sx={{
              marginBottom:'12px',
              color:'#FFFFFF33'
            }}>Gêneros</Typography>
            <Typography>
              {game.genres.map(item=> item.name).join(', ')}
            </Typography>
            </Box>

            <Box sx={{
              display:'flex',
              flexDirection:'column'
            }}>
            <Typography sx={{
              marginBottom:'12px',
              color:'#FFFFFF33'
            }}>Data de lançamento</Typography>
            <Typography>
              {formatReleasedDate()}
            </Typography>
            </Box>

            <Box sx={{
              display:'flex',
              flexDirection:'column'
            }}>
            <Typography sx={{
              marginBottom:'12px',
              color:'#FFFFFF33'
            }}>Desenvoledor</Typography>
            <Typography>
            {game.developers.map(item=> item.name).join(', ')}
            </Typography>
            </Box>

            <Box sx={{
              display:'flex',
              flexDirection:'column'
            }}>
            <Typography sx={{
              marginBottom:'12px',
              color:'#FFFFFF33'
            }}>Distribuidora</Typography>
            <Typography>
            {game.publishers.map(item=> item.name).join(', ')}
            </Typography>
            </Box>

            <Box sx={{
              display:'flex',
              flexDirection:'column'
            }}>
            <Typography sx={{
              marginBottom:'12px',
              color:'#FFFFFF33'
            }}>Tags</Typography>
            <Typography>
            {game.tags.map(item=> item.name).join(', ')}
            </Typography>
            </Box>

            
            <Box sx={{
              display:'flex',
              flexDirection:'column'
            }}>
            <Typography sx={{
              marginBottom:'12px',
              color:'#FFFFFF33'
            }}>Website</Typography>
            <a style={{color:'inherit'}} href={game.website}>
            {game.website}
            </a>
            </Box>
        </Box>

      </Box>
      <Box sx={{color:'#FFF',padding:'24px'}}>

     
      <Typography variant="h4" sx={{
        fontWeight:'bold',
        margin:'24px 0px'
      }}>
        Time de desenvolvimento

      </Typography>
        <Box sx={{
          display:'grid',
          gridTemplateColumns: breakpoints(),
          gap:'24px'
        }}>
          {creators.map(item=>(
          <Box key={String(item.id)} sx={{
            borderRadius:'5px',
            padding:'32px 24px',
            display:'flex',
            maxWidth:'300px',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center',
            backgroundImage: `linear-gradient(rgba(32, 32, 32, 0.7), rgb(32, 32, 32) 70%), url(${item.image_background})`,
          'img':{
            width:'128px',
            height:'128px',
            borderRadius:'50%',
            marginBottom:'12px',
            boxShadow: '0 10px 20px 0 rgb(0 0 0 / 20%)',
          }
        }}>
          <img src={item.image}/>
          <Typography variant="h5" sx={{
            fontWeight:'bold',
            marginBottom:'8px'
          }}>{item.name}</Typography>
          <Typography>{item.positions.map(element=> element.name).join(', ')}</Typography>
        </Box>
          ))}

        </Box>
      </Box>
      </Box>
    </Box>
  )
}