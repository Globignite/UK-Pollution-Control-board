import {Box} from "@mui/material"

const RunningText = () => {
  return (
    <Box sx={{color:'primary.main', fontWeight:'bold', fontSize:{lg:'1.2rem', xs:'1rem'}, bgcolor:'background.header'}} >
        <marquee>
            *******Say No To Single Use Of Plastic*******
        </marquee>
    </Box>
  )
}

export default RunningText