import { Box } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useRouter } from 'next/router';


export function Breadcrumb({game}) {
  const {replace} = useRouter()
  return (
    <Box role="presentation" >
      <Breadcrumbs aria-label="breadcrumb">
        <Link sx={{
          color:'#FFF',
          fontWeight:'bold',
          cursor:'pointer'
        }} underline="hover" color="inherit" onClick={()=> replace('/')}>
          Home
        </Link>
        <Link
          aria-current="page"
          underline='none'
          color='#FFFFFF33'
        >
          {game}
        </Link>
      </Breadcrumbs>
    </Box>
  );
}