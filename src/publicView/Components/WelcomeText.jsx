import { Box, Typography, Link, Card } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DownloadIcon from "@mui/icons-material/Download";

const WelcomeText = () => {

	const data = [
		{
			name:'Quality Standards - Industry',
			href:'/files/Cement.pdf'
		},
		{
			name:'User Manual -For industries & Units seeking consent/noc under Air,Water & Haz Rules',
			href:'/files/ONLINE_CONSENT_MANAGEMENT_GUIDELINE.pdf'
		},
	]

	return (
		<Box padding={2}>
			<Typography sx={{color:'primary.main', fontSize:{ lg:'1.8rem', xs:'1rem'}, fontWeight:'bold'}} gutterBottom>
				Welcome Uttarakhand Pollution Control Board
      </Typography>
	  <Link component={RouterLink} sx={{color:'#b54a4a', textDecoration:'underline', fontWeight:'bold', '&:hover':{color:'#b54a4a'}}} >Air Quality Index</Link>
      <br />
      <br />
			<Typography variant="body1">
				Uttaranchal Pollution Control Board was established in Year 2001 as per
				Section (4) of Water ( Prevention and Control of Pollution) Act, 1974 by
				Forest and Environment Division, Uttarakhand Secretariat's notification
				no 7756/I-V.G.V/2001-13(5)/2000 dated 26.12.2001. With continuation to
				the same Uttaranchal Pollution Control Board was reconstructed by the
				Forest and Environment Division, Uttarakhand Secretariat notification
				no. 153/1(2)/V.G.V./2002-13(5)/2000 dated 01-05-2002
				<br />
				<br />
				Vide notification no. 1100/1(1)(2)/V.G.V./2003-13(5)/2000/T.C. dated
				14.07.2003 of the Forest and Environment Division, Uttarakhand
				Secretariat. of Uttaranchal Pollution Control Board was changed to
				Uttarakhand Environment Protection and Pollution Control Board.
				<br />
				<br />
				Vide notification no. 967/XXXVII-19-13(05)/2000 dated 11.12.2019 of the
				Forest and Environment Division, Uttarakhand Secretariat. Name of
				Uttarakhand Environment Protection and Pollution Control Board was
				changed to Uttarakhand Pollution Control Board.
			</Typography>
			{/* Add additional content or styling here */}
			
			<Box sx={{mt:5}} >
				{data.map((item, index) => (
				<Card
				key={index}
				sx={{
					display: "flex",
					justifyContent: "start",
					gap: "20px", 
					textDecoration: "none",
					backgroundColor: "#20ff9410",
					mb: "20px",
					p: 2,
					cursor: "pointer",
				}}
				>
				<PictureAsPdfIcon   />
				<Typography variant="body1" color="red">{item?.name}</Typography>
				<DownloadIcon sx={{   marginLeft: "auto" }} />
				</Card>

			))}
			</Box>
		</Box>
	);
};

export default WelcomeText;
