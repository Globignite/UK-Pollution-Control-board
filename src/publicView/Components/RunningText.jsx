import {Box} from "@mui/material"

const RunningText = () => {
  return (
    <Box sx={{color:'primary.main', fontWeight:'bold', fontSize:'1.2rem', bgcolor:'background.header'}} >
        <marquee>
            *******Say No To Single Use Of Plastic*******
        </marquee>
    </Box>
  )
}

export default RunningText