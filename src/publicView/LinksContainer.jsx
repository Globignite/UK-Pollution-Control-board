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
		<Box padding={2}>
			<Typography variant='h5' sx={{ my: 2, color: "blue" }}>{itemData.name} </Typography>
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
							<Typography variant="body1" > {item.name} </Typography>
							<ArrowRightAltIcon />
						</Card>
					</Link>
				);
			})}
		</Box>
	);
};

export default LinksContainer;
