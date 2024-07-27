import PropTypes from "prop-types";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Button from "@mui/material/Button";

const Pagination = ({ pagination, setPageNo, pageNo }) => {
  return (
    <>
      <div className="pagination">
        <p>Total : {pagination?.total} </p>
        <div style={{ display: "flex", alignItems: "center" }}>
          {pagination?.hasPreviousPage && (
            <Button
              onClick={() => setPageNo(Number(pageNo) - 1)}
              variant="outlined"
              color="success"
            >
              <ArrowBackIosIcon />
            </Button>
          )}
          <span style={{ marginInline: "10px" }}>
            Page {pageNo} of {pagination?.totalPages}
          </span>
          {pagination?.hasNextPage && (
            <Button
              onClick={() => setPageNo(Number(pageNo) + 1)}
              variant="outlined"
              color="success"
            >
              <ArrowForwardIosIcon />
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

Pagination.propTypes = {
  pagination: PropTypes.any.isRequired,
  setPageNo: PropTypes.func.isRequired,
  pageNo: PropTypes.number.isRequired,
};

export default Pagination;
