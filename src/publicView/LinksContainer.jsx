import  Box  from "@mui/material/Box";
import Card  from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { RoutesJson } from "../RoutesJson";
import { Link } from "react-router-dom";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const LinksContainer = ({ itemData }) => {
	const submenuItems = RoutesJson.filter(
		(item) => item.parent_id === itemData.id,
	);
	// console.log("itemData", itemData);
	// console.log("submenuItems", submenuItems);
	return (
		<Box padding={{lg:2, xs:0}}>
			<Typography variant='h5' sx={{my:3, fontWeight:'600', fontSize:{ lg:'1.8rem', xs:'1rem'}, color:'primary.main'}}>{itemData.name} </Typography>
			{submenuItems.map((item) => {
				return (
					<Link to={`/${item.path}`} key={item.path}  >
						<Card
							sx={{
								display: "flex",
								justifyContent: "space-between", 
								mb: "20px",
								p: 2,
								cursor: "pointer",
							}}
						>
							<Typography variant="body1" color="red" > {item.name} </Typography>
							<ArrowRightAltIcon />
						</Card>
					</Link>
				);
			})}
		</Box>
	);
};

export default LinksContainer;
