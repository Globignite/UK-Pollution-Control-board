import React, { useState, useEffect } from "react";
import { Container, Autocomplete, TextField } from "@mui/material";
import { CustomPopper } from "../AddHeadings";
import { RecursiveSubheading } from "../FileManagement/UploadFiles";

const GetMenu = ({ combinedOptions }) => {
  const [selectedHeading, setSelectedHeading] = useState(null);
  const [selectedSubheadings, setSelectedSubheadings] = useState({});

  const handleHeadingChange = (event, newValue) => {
    setSelectedHeading(newValue);
    setSelectedSubheadings({});
  };

  const handleSubheadingChange = (level, subheading) => {
    setSelectedSubheadings((prev) => {
      const newSubheadings = { ...prev, [level]: subheading };
      Object.keys(newSubheadings).forEach((key) => {
        if (parseInt(key) > level) {
          delete newSubheadings[key];
        }
      });
      return newSubheadings;
    });
  };

  useEffect(() => {
    // This effect could log or otherwise handle the current state of headings
    console.log(selectedHeading, selectedSubheadings);
  }, [selectedHeading, selectedSubheadings]);

  const collectHeadingsAndSubheadings = () => {
    return [selectedHeading, ...Object.values(selectedSubheadings)];
  };

  return (
    <Container
      sx={{ width: { lg: "60%", xs: "100%" }, p: 1, bgcolor: "", mt: 5 }}
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
        sx={{ width: "250px", mb: 2 }}
      />
      {selectedHeading?.subItems && (
        <RecursiveSubheading
          subheadings={selectedHeading.subItems}
          level={1}
          onChange={handleSubheadingChange}
          selectedSubheadings={selectedSubheadings}
        />
      )}
    </Container>
  );
};

export default GetMenu;
