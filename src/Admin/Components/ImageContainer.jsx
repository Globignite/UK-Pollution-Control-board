

const ImageContainer = ({ imageUrl }) => {
  const containerStyle = {
    width: "200px",
    height: "150px",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center", 
    borderRadius:"8px",
    boxShadow:"0 0 3px black"
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover", // This makes the image cover the area of the div without distorting its aspect ratio
  };

  return (
    <div style={containerStyle}>
      <img src={imageUrl} alt="Cover Image" style={imageStyle} />
    </div>
  );
};

export default ImageContainer;
