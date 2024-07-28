import  { useState, useEffect } from "react";
import {
  Autocomplete,
  TextField,
  Box,
  Button,
  Popper,
  Container,
} from "@mui/material"; 
import { SideMenu } from "../../publicView/JsonFiles/SideMenu";
import { mainMenu } from "../../publicView/JsonFiles/MainMenu";
import Spinner from "../../publicView/Components/Spinner";

const CustomPopper = (props) => {
  return <Popper {...props} style={{ zIndex: 1 }} placement="bottom-start" />;
};

export const RecursiveSubheading = ({
  subheadings,
  level,
  onChange,
  selectedSubheadings,
}) => {
  const [selectedSubheading, setSelectedSubheading] = useState(null);

  const handleSubheadingChange = (event, newValue) => {
    setSelectedSubheading(newValue);
    onChange(level, newValue);
  };

  useEffect(() => {
    setSelectedSubheading(selectedSubheadings[level] || null);
  }, [selectedSubheadings, level]);

  return (
    <>
      <Autocomplete
        options={subheadings}
        getOptionLabel={(option) => option.name}
        value={selectedSubheading}
        onChange={handleSubheadingChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label={`Subheading Level ${level}`}
            fullWidth
          />
        )}
        PopperComponent={CustomPopper}
        sx={{ width: "100%", mb: 2 }}
      />
      {selectedSubheading?.subItems && (
        <RecursiveSubheading
          subheadings={selectedSubheading.subItems}
          level={level + 1}
          onChange={onChange}
          selectedSubheadings={selectedSubheadings}
        />
      )}
    </>
  );
};

const GetMenu = ({ menuPath }) => {
  const [selectedHeading, setSelectedHeading] = useState(null);
  const [selectedSubheadings, setSelectedSubheadings] = useState({});
  const [selectedFormat, setSelectedFormat] = useState("Excel");
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [customFileName, setCustomFileName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const hasSubheadings = selectedHeading?.subItems
      ? Object.keys(selectedSubheadings).length > 0
      : true;
    setIsSubmitDisabled(!(selectedHeading && hasSubheadings));
  }, [selectedHeading, selectedSubheadings]);

  const handleHeadingChange = (event, newValue) => {
    setSelectedHeading(newValue);
    setSelectedSubheadings({});
    setIsSubmitDisabled(!newValue); // Disable submit if no heading is selected
  };

  const handleSubheadingChange = (level, subheading) => {
    setSelectedSubheadings((prev) => {
      const newSubheadings = { ...prev, [level]: subheading };
      Object.keys(newSubheadings).forEach((key) => {
        if (parseInt(key) > level) {
          delete newSubheadings[key];
        }
      });
      setIsSubmitDisabled(Object.keys(newSubheadings).length === 0); // Disable submit if no subheadings are selected
      return newSubheadings;
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    let combinedHeadings = [
      selectedHeading.name,
      ...Object.values(selectedSubheadings).map(
        (subheading) => subheading?.name
      ),
    ];
    let lastTwoSubheadings;

    if (combinedHeadings.length >= 2) {
      lastTwoSubheadings = combinedHeadings.join("/");
    } else {
      lastTwoSubheadings = `null/${combinedHeadings[0]}`;
    }
    
    menuPath(lastTwoSubheadings);
    setLoading(false);
  };

  const handleClear = () => {
    setSelectedHeading(null);
    setSelectedSubheadings({});
    setSelectedFormat("Excel");
    setCustomFileName("");
    setIsSubmitDisabled(true); // Disable submit button when cleared

    const inputFileField = document.querySelector('input[type="file"]');
    if (inputFileField) {
      inputFileField.value = "";
    }

    menuPath("");
  };

  const combinedOptions = [...mainMenu.slice(1, -1), ...SideMenu.menu];



  return (
    <>
      <Spinner loading={loading} />
      <Container
        sx={{ width: { lg: "100%", xs: "100%" }, p: 1, bgcolor: "", mt: 5 }}
      >
        <Autocomplete
          options={combinedOptions}
          value={selectedHeading}
          getOptionLabel={(option) => option.name}
          onChange={handleHeadingChange}
          renderInput={(params) => (
            <TextField {...params} fullWidth label="Heading" />
          )}
          PopperComponent={CustomPopper}
          sx={{ width: "100%", mb: 2 }}
        />

        {selectedHeading?.subItems && (
          <RecursiveSubheading
            subheadings={selectedHeading.subItems}
            level={1}
            onChange={handleSubheadingChange}
            selectedSubheadings={selectedSubheadings}
          />
        )}

        <Box 
        display="flex"
        flexDirection="row"
        flexWrap="wrap"
        gap={2}
        marginBottom={2}>
          <Button
            variant="outlined"
            sx={{ width: "45%", mt: 2, mr: 1 }}
            onClick={handleClear}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            sx={{ width: "45%", mt: 2, ml: 1 }}
            onClick={handleSubmit}
            disabled={isSubmitDisabled}
          >
            Search
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default GetMenu;