import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';

import OpenInNewIcon from '@mui/icons-material/OpenInNew';

function RelatedLinks() {

  const linksJson = [
    {
      "name": "Ministry Of Health",
      "url": "http://mohfw.nic.in"
    },
    {
      "name": "Govt. Of India",
      "url": "http://www.india.gov.in"
    },
    {
      "name": "Govt. Of Uttarkhand",
      "url": "http://www.uk.gov.in"
    },
    {
      "name": "World Health Organisation",
      "url": "http://www.who.int"
    },
    {
      "name": "UNICEF",
      "url": "http://www.unicef.org/"
    },
    {
      "name": "Central Pollution Control Board (CPCB)",
      "url": "http://cpcb.nic.in/"
    },
    {
      "name": "UP Pollution Control Board (UPPCB)",
      "url": "http://www.uppcb.com/"
    },
    {
      "name": "Health Care Facilities",
      "url": "http://cpcb.nic.in/Bio_medical.php#1"
    },
    {
      "name": "Centre for Science & Environment",
      "url": "http://www.cseindia.org"
    },
    {
      "name": "OCMMS",
      "url": "https://investuttarakhand.com/"
    },
    {
      "name": "NCAP Uttarakhand",
      "url": "http://ncaputtarakhand.in"
    },
    {
      "name": "Forest Survey Of India",
      "url": "http://www.fsi.nic.in"
    },
    {
      "name": "Agriculture Department of Uttarakhand",
      "url": "http://www.agriculture.uk.gov.in"
    },
    {
      "name": "Madhya Pradesh Pollution Control Board",
      "url": "http://www.mppcb.nic.in"
    },
    {
      "name": "Punjab Pollution Control Board",
      "url": "http://ppcb.gov.in"
    },
    {
      "name": "Uttarakhand Forest Department",
      "url": "http://www.forest.uk.gov.in"
    },
    {
      "name": "Uttarakhand Jal Vidyut Nigam Ltd. (UJVNL)",
      "url": "http://www.ujvnl.com"
    },
    {
      "name": "Rajasthan Pollution Control Board",
      "url": "http://www.environment.rajasthan.gov.in"
    },
    {
      "name": "Tamil Naidu Pollution Control Board",
      "url": "http://www.tnpcb.gov.in"
    }
  ]


  return (
    <Box padding={{lg:2, xs:0}}>
      <Typography variant="h5" sx={{my:3, fontWeight:'600', fontSize:{ lg:'1.8rem', xs:'1rem'}, color:'primary.main' }}>
        Related Links
      </Typography>

      {linksJson.map((item, index) => (
        <Card
          key={index}
          sx={{
            display: "flex",
            justifyContent: "start",
            gap: "20px",  
            mb: "20px",
            p: 2,
            cursor: "pointer",
          }}
        >
          <OpenInNewIcon   />
          <Typography variant="body1">{item.name}</Typography> 
        </Card>
      ))}
    </Box>
  );
}

export default RelatedLinks;
