import React from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	Link,
} from "@mui/material";

const projectData = [
	{
		project_description:
			"Proposed Common Solid Waste Management Facility for Roorkee Cluster at Vill. Saliyar, Roorkee, Distt. Haridwar by M/s Nagar Nigam Roorkee",
		meeting_details: "15.03.2024 at 11:00 am in Project Site",
		advertisement:
			"/files/Ph_solid_waste_mgmt_facility_roorkee_cluster_at_vill_saliyar.pdf",
		documents: [
			"/files/Roorkee_MSW_Executive_Summary_Hindi_-.pdf",
			"/files/Executive_Summary_Draft_EIA_Roorkee_MSW.pdf",
			"/files/Roorkee_EIA_06-01-2024_removed.pdf",
		],
	},
	{
		project_description:
			"Baituli Soapstone Mining Project (Area-4.942 Hect.) at Vill. Baituli, Tehsil & Distt. Bageshwar by Sh. Rajendra Prasad Tiwari",
		meeting_details: "19.03.2024 at 11:00 am in Project Site",
		advertisement: "/files/Rajendra_Prasad_Tiwari_Bageshwar.pdf",
		documents: [],
	},
	{
		project_description:
			"Nayal Chamoli Palsari Soapstone Mining Project (Area-5.133 Hect.) at Vill. Nayal Chamoli Palsari, tehsil & Distt. Bageshwar by M/s Jai Gangnath Mines Bhidi",
		meeting_details: "18.03.2024 at 11:00 am in Project Site",
		advertisement:
			"/files/PH_Nayal_Chamoli_Palsari_Soapstone_Pulsari_Bageshwar.pdf",
		documents: ["/files/Exeutive_Summary.pdf", "/files/Final_Draft_EIA.pdf"],
	},
	{
		project_description:
			"Papolilagga, Kafli & Odiyar Soapstone Mining Project (Area 2.413 Hect.) at Vill. Papolilagga, Kafli & Odiyar, Tehsil Dugnakuri, Distt. Bageshwar by Sh. Diwan Singh Papola.",
		meeting_details: "28.03.2024 at 11:00 am in Project Site",
		advertisement:
			"/files/Ph_papolilagga_Kafli_and_odiyar_soapstone_dugnakuri_bageshwar.pdf",
		documents: [
			"/files/Executive_Summary_-_Hindi_3.pdf",
			"/files/Executive_Summary_English_44.pdf",
		],
	},
	{
		project_description:
			"Kafli & Papoli Soapstone Mining Project (Area 2.99 Hect.) at Vill. Kafli & Papoli, Tehsil Dugnakuri, Distt. Bageshwar by Sh. Diwan Singh Papola.",
		meeting_details: "27.03.2024 at 11:00 am in Project Site",
		advertisement:
			"/files/PH_Kafli_and_papoli_soapstone_mining_bageshwar_diwan_singh_papola.pdf",
		documents: [
			"/files/Executive_Summary_-_Hindi_4.pdf",
			"/files/Executive_Summary_-_English_2.pdf",
			"/files/Final_Draft_EIA_Report_compressed_(1).pdf",
		],
	},
	{
		project_description:
			"Reemakutty Soapstone Mining Project (Area-2.938 Hect.) at Vill. Reemakutty, Tehsil Dugnakuri, Distt. Bageshwar by Sh. Devesh Srivastava",
		meeting_details: "20.03.2024 at 11:00 am in Project Site",
		advertisement: "/files/PH_Devesh_Srivastava_Bageshwar.pdf",
		documents: [],
	},
	{
		project_description:
			"Baitouli Soapstone Mining Project (Area-2.980 Hect.0 at Vill. Baitouli, Tehsil & Distt. Bageshwar by Sh. Kundan Singh Latwal & Sh. Rahul Dafouti",
		meeting_details: "29.03.2024 at 11:00 am in Project Site",
		advertisement:
			"/files/PH_baitouli_soapstone_mining_project_bageshwar_Kundan_Singh_Latwal.pdf",
		documents: [
			"/files/Executive_Summry_-_Hind1.pdf",
			"/files/Executive_Summary_13.pdf",
			"/files/DEIA_KUNDAN_LATWAL.pdf",
		],
	},
	{
		project_description:
			"Gurana Soapstone Mining Project (Area-6.570 Hect._ at Vill/ Gurana, Tehsil & Distt. Bageshwar by Sh. Ashok Pal & Sh. Prakash Bankoti.",
		meeting_details: "21.03.2024 at 11:00 am in Project Site",
		advertisement: "/files/Advst_Ashok_Pal.pdf",
		documents: [],
	},
	{
		project_description:
			"Reemakutty Soapstone Mining Project (Area-2.938 Hect.) at Vill. Reemakutty, Tehsil Dugnakuri, Distt. Bageshwar by Sh. Devesh Srivastava.",
		meeting_details: "20.03.2024 at 11:00 am in Project Site",
		advertisement: "/files/Advst-Reemakutty.pdf",
		documents: [],
	},
	{
		project_description:
			"Baituli Soapstone Mining Project (Area-4.942 Hect.) at Vill. Baituli, Tehsil & Distt. Bageshwar by Sh. Rajendra Prasad Tiwari.",
		meeting_details: "19.03.2024 at 11:00 am in Project Site",
		advertisement: "/files/Advst_Rajendra.pdf",
		documents: [],
	},
	{
		project_description:
			"Kholiyagaon Soapstone Mining Project(Area-4.502 Hect.0 at Vill. Kholiyagaon, Tehsil & Distt. Bageshwar by Sh. Ramesh Chandra",
		meeting_details: "29.02.2024 at 11:00 am in Project Site",
		advertisement: "/files/Advst_Ramesh_Chandra.pdf",
		documents: [
			"/files/Executive_Summary_-_Hindi_2.pdf",
			"/files/Executive_Summary_-_Eng.pdf",
			"/files/DEIA_RAMESH_CHANDRA_compressed.pdf",
		],
	},
	{
		project_description:
			"Proposed expansion of existing Sugar Unit from 2500 TCD to 10000TCD along with Co-Gen-Power Plant of 22 MW and establishment of Distillery having capacity 400 KLD (Based on Cane Juice Syrup/Molasses/Grains) along with 9.0MW Co-Gen-Power within Sugar industry premises at Vill. Sarkada & Nakatpura, Tehsil Sitarganj, Distt. U.S. Nagar by M/s JGN Sugar & Biofuels Pvt. Ltd. (Unit: Sitarganj)",
		meeting_details: "26.02.2024 at 11:00 am in Project Site",
		advertisement: "/files/Advst_JGN_Sugar.pdf",
		documents: [
			"/files/JGN_Draft_EIA_print_compressed.pdf",
			"/files/Minutes_of_PH_JGN_Sugar__Biofuels_1.pdf",
		],
	},
	{
		project_description:
			"Bhataura Rankot Soapstone Mining Project (Area-6.864 Hect.) at Vill. Bhataura Rankot, Tehsil & Distt. Bageshwar by Shri Pushkar Lal Shah.",
		meeting_details: "07.02.2024 at 11:00 am in Project Site",
		advertisement: "/files/Advst_Pushkar_Lal_Shah.pdf",
		documents: ["/files/Draft_EIA_Pushker_Lal.pdf"],
	},
	{
		project_description:
			"PEeda Soapstone Mining Project (Area 8.394 Hect.) at Vill. Eeda, Tehsil & Distt. Bageshwar by M/s Onkar Minerals Eeda Bageshwar.",
		meeting_details: "11.01.2024 at 11:00 am in Project Site",
		advertisement: "/files/Advst_Onkar_Minerals_dated_11.01.2024.pdf",
		documents: [
			"/files/Hindi_Summary_Final.pdf",
			"/files/English_summary.pdf",
			"/files/Draft_EIA_Report_1.pdf",
		],
	},
	{
		project_description:
			"Chirang Soapstone Mining Project (Area-4.85 Hect.) at Vill. Chirang, Tehsil & Dist. Bageshwar by M/s Baba Bagnath Mines Chirang.",
		meeting_details: "12.01.2024 at 11:00 am in Project Site",
		advertisement: "/files/Advst_Baba_Bagnath_dated_12.01.2024.pdf",
		documents: ["/files/_समरी_1.pdf", "/files/Executive_Summary_12.pdf"],
	},
	{
		project_description:
			"Bheruchaubatta Soapstone Mining Project (Area-3.834 Hect) at Vill. Bheruchaubatta, Tehsil & Distt. Bageshwar by M/s Jai Shri Ganganath Minerals.",
		meeting_details: "02.01.2024 at 11:00 am in Project Site",
		advertisement: "/files/Advst-Jai_Ganganath_Minerals_1.pdf",
		documents: [
			"/files/Hindi_Summary_Final__Bheruchabatta.pdf",
			"/files/Executive_summary_Final.pdf",
			"/files/Ganganath_Final.pdf",
		],
	},
	{
		project_description:
			"Dunga Soapstone Mining Project (Area-7.971 Hect.) at Vill. Dunga, Tehsil & Distt. Bageshwar by Sh. Anand Ballabh Joshi",
		meeting_details: "01.01.2024 at 11:00 am in Project Site",
		advertisement: "/files/Advst-_Anand_Vallabh_Joshi_1.pdf",
		documents: [
			"/files/Hindi_Summary_Final_Dunga_1.pdf",
			"/files/English_Summary_1.pdf",
			"/files/Dunga_Final_1.pdf",
		],
	},
	{
		project_description:
			"Chauhana Soapstone Mining Project (Area-8.925 Hect.) at Vill. Chauhana, Tehsil & Distt. Bageshwar by M/s Jai Edi Golu Minerals.",
		meeting_details: "03.01.2024 at 11:00 am in Project Site",
		advertisement: "/files/Advst-Jai_Edi_Golu_1.pdf",
		documents: [
			"/files/Executive_Summary_10.pdf",
			"/files/Chauhana_Final_Pdf_1.pdf",
		],
	},
	{
		project_description:
			"Dhapola Shera Soapstone Mining Project (Area 4.863 Hect.) at Vill. Dhapola Shera, Tehsil Kanda, Distt. Bageshwar by M/s Shikar Mines & Minerals",
		meeting_details: "06.12.2023 at 11:00 am in Project Site",
		advertisement: "/files/ad_PH_Shikhar_Mines_and_Minerals_Bageshwar.pdf",
		documents: [
			"/files/Executive_Summary_Hindi_44.pdf",
			"/files/Executive_Summary_English_43.pdf",
		],
	},
	{
		project_description:
			"Dhunga(Mitardhai) Soapstone Mining Project (Area 9.708 Hect.) at Vill. Dhuunga(Mitardhai), Tehsil & Distt. Bageshwar by Sh. Harish Chandra Upreti.",
		meeting_details: "29.11.2023 at 11:00 am in Project Site",
		advertisement: "/files/advertisment_PH_Harish_Chandra_Upreti.pdf",
		documents: [
			"/files/Executive_Summary_-_Hindi_1.pdf",
			"/files/Executive_Summary_-_English_1.pdf",
		],
	},
	{
		project_description:
			"Karuli Soapstone Mining Project (Area 4.116 Hect.) at Vill. Karuli, Tehsil & Distt. Bageshwr by M/s Khetwal Mines Karuli.",
		meeting_details: "05.12.2023 at 11:00 am in Project Site",
		advertisement: "/files/ad_PH_Khetwal_Mines_Karuli_Bageshwar.pdf",
		documents: [
			"/files/Executive_Summary_-_Hindi.pdf",
			"/files/Executive_Summary_-English.pdf",
		],
	},
	{
		project_description:
			"Tuper Tok Binsar Soapstone Mining Project (Area 3.594 Hect.) at Vill.Tuper Tok Binsar, Tehsil & Distt. Bageshwar by M/s Jai Shree Hari Soapstone Chirang",
		meeting_details: "30.11.2023 at 11:00 am in Project Site",
		advertisement:
			"/files/ad_PH_Jai_Shree_Hari_Soapstone_Chirang,_Bageshwar.pdf",
		documents: [
			"/files/executive_summary_-Hindi.pdf",
			"/files/Executive_summary_-_English.pdf",
		],
	},
	{
		project_description:
			"Bhairu Chaubatta Tok Tiladi, Simayal, Karuli Tok Rikhadi Soapstone Mining Project (Area 4.227 Hect.) at Vill. Bhairu Chaubatta Tok Tiladi, Simayal, Karuli Tok Rikhadi, Tehsil & Distt. Bageshwar by Sh. Basant Ballabh Pathak",
		meeting_details: "28.11.2023 at 11:00 am in Project Site",
		advertisement:
			"/files/ad_PH_Bhairu_Chaubatta_Tok_Tiladi,_Rikhadi_Soapstone_Bageshwar.pdf",
		documents: [
			"/files/Executive_Summary-_Hindi_1.pdf",
			"/files/Executive_summary_-_English_1.pdf",
		],
	},
	{
		project_description:
			"Surkali Gaon Soapstone Mining Project (Area 2.231 Hect.) at Vill. Surkali Gaon, Tehsil Dugnakuri, Distt. Bageshwar by Sh. Thakur Singh Garia",
		meeting_details: "08.12.2023 at 11:00 am in Project Site",
		advertisement: "/files/ad_PH_Thakur_SIngh_Gadiya_Kiroli.pdf",
		documents: [
			"/files/Executive_Summary_Hindi_41.pdf",
			"/files/t.s_garia_English_Executive_Summary_(1)_11.pdf",
			"/files/Draft_EIA_PDF_FILE.pdf",
		],
	},
	{
		project_description:
			"Agar Soapstone Mining Project (Area 5.985 Hect.) at Vill. Agar, Tehsil Kanda, Distt. Bageshwar by M/s Eco Tech Minerals.",
		meeting_details: "07.12.2023 at 11:00 am in Project Site",
		advertisement: "/files/ad_PH_Agar_Soapstone_Mining_Kanda_Bageshwar.pdf",
		documents: [
			"/files/Executive_Summary_Hindi_42.pdf",
			"/files/Executive_Summary_English_42.pdf",
		],
	},
	{
		project_description:
			"Common Biomedical Waste Treatment Facility (CBWTF) at Khasra No. 724, VIll Kunja (Bahafarpur) Tehsil Bhagwanpur, Distt. Haridwar by M/s ECON Waste Solution",
		meeting_details: "07.11.2023 at 11:00 am in Project Premises",
		advertisement: "/files/IMG_20231012_162148.jpg",
		documents: [
			"/files/_सारांश_-_ECON_WASTE_SOLUTION.docx.pdf",
			"/files/Executive_Summary_-_ECON_Waste_Solution_1.pdf",
			"/files/DRAFT_EIA_-_ECON_Waste_Solution.pdf",
		],
	},
	{
		project_description:
			"Soapstone Mining Project (Area 4.773 Hect.) at Vill. Kwerali, Tehsil & Distt. Bageshwar by Smt. Seema Devi & Sh. Akshay Singh.",
		meeting_details: "17.10.2023 at 11:00 am in Project Premises",
		advertisement: "/files/IMG_20231012_154655.jpg",
		documents: [],
	},
	{
		project_description:
			"Soapstone Mining Project (Area 3.136 Hect.) at Vill. Khuldori, Tehsil & Distt. Bageshwar by Sh. Charu Sharma & Sh. Vinod Singh",
		meeting_details: "13.10.2023 at 11:00 am in Project Premises",
		advertisement:
			"/files/PH_EIA_Notifiaction_2006,_Charu_Sharma,_Bageshwar.pdf",
		documents: [
			"/files/Executive_Summary_Hindi_34.pdf",
			"/files/Executive_Summary_English_37.pdf",
		],
	},
	{
		project_description:
			"Soapstone Mining Project (Area 2.943 Hect.) at Vill. Tupper, Tehsil & Distt. Bageshwar by Sh. Puran Singh Khetwal",
		meeting_details: "12.10.2023 at 11:00 am in Project Premises",
		advertisement:
			"/files/PH_EIA_Notification_2006,_Pooran_Singh_Khetwal_Bageshwar.pdf",
		documents: [
			"/files/Executive_Summary_Hindi_37.pdf",
			"/files/Executive_Summary_English_40.pdf",
		],
	},
	{
		project_description:
			"Soapstone Mining Project (Area 8.883 Hect.) at Vill. Kularang Chaura (Tok Rang Chaura), Tehsil & Distt. Bageshwar by M/s Hari Om Soapstone Mines",
		meeting_details: "11.10.2023 at 11:00 am in Project Premises",
		advertisement:
			"/files/PH_EIA_Notification_2006,_Hari_Om_Soapstone_Mines,_Bageshwar.pdf",
		documents: [
			"/files/Executive_Summary_Hindi_40.pdf",
			"/files/Executive_Summary_English_41.pdf",
		],
	},
];

const PublicHearing = () => {
	return (
		<TableContainer component={Paper}>
			<Table aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Description</TableCell>
						<TableCell align="right">Meeting Details</TableCell>
						<TableCell align="right">Advertisement</TableCell>
						<TableCell align="right">Documents</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{projectData.map((row, index) => (
						<TableRow key={index}>
							<TableCell component="th" scope="row">
								{row.project_description}
							</TableCell>
							<TableCell align="right">{row.meeting_details}</TableCell>
							<TableCell align="right">
								<Link href={row.advertisement} target="_blank" rel="noopener">
									Advst
								</Link>
							</TableCell>
							<TableCell align="right">
								{row.documents.map((doc, docIndex) => (
									<Link
										key={docIndex}
										href={doc}
										target="_blank"
										rel="noopener"
										style={{ display: "block" }}
									>
										Document_{docIndex + 1}
									</Link>
								))}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default PublicHearing;
