import React from "react";

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  itemsPerPage = 10,
  onPageChange,
  onItemsPerPageChange,
  showItemsPerPage = true,
  showPageInfo = true,
  maxVisiblePages = 5,
  className = "",
  style = {},
}) => {
  const getVisiblePages = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];
    const halfVisible = Math.floor(maxVisiblePages / 2);

    if (currentPage <= halfVisible) {
      // Show first pages + ellipsis + last page
      for (let i = 1; i <= maxVisiblePages - 1; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(totalPages);
    } else if (currentPage >= totalPages - halfVisible) {
      // Show first page + ellipsis + last pages
      pages.push(1);
      pages.push("...");
      for (let i = totalPages - (maxVisiblePages - 2); i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first page + ellipsis + middle pages + ellipsis + last page
      pages.push(1);
      pages.push("...");
      for (let i = currentPage - halfVisible + 1; i <= currentPage + halfVisible - 1; i++) {
        pages.push(i);
      }
      pages.push("...");
      pages.push(totalPages);
    }

    return pages;
  };

  const containerStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px",
    backgroundColor: "#f8f9fa",
    borderTop: "1px solid #dee2e6",
    flexWrap: "wrap",
    gap: "16px",
    ...style,
  };

  const pageInfoStyles = {
    fontSize: "14px",
    color: "#495057",
  };

  const controlsStyles = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  };

  const buttonStyles = {
    padding: "6px 12px",
    border: "1px solid #dee2e6",
    backgroundColor: "white",
    color: "#007bff",
    cursor: "pointer",
    borderRadius: "4px",
    fontSize: "14px",
    transition: "all 0.2s ease",
    minWidth: "40px",
    height: "36px",
  };

  const activeButtonStyles = {
    ...buttonStyles,
    backgroundColor: "#007bff",
    color: "white",
    borderColor: "#007bff",
  };

  const disabledButtonStyles = {
    ...buttonStyles,
    color: "#6c757d",
    cursor: "not-allowed",
    backgroundColor: "#f8f9fa",
  };

  const ellipsisStyles = {
    padding: "6px 8px",
    color: "#6c757d",
    fontSize: "14px",
    userSelect: "none",
  };

  const selectStyles = {
    padding: "6px 12px",
    border: "1px solid #dee2e6",
    borderRadius: "4px",
    fontSize: "14px",
    backgroundColor: "white",
    color: "#495057",
    cursor: "pointer",
  };

  const labelStyles = {
    fontSize: "14px",
    color: "#495057",
    marginRight: "8px",
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange && onPageChange(page);
    }
  };

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value);
    onItemsPerPageChange && onItemsPerPageChange(newItemsPerPage);
  };

  const getStartItem = () => {
    return totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  };

  const getEndItem = () => {
    return Math.min(currentPage * itemsPerPage, totalItems);
  };

  const visiblePages = getVisiblePages();

  return (
    <div style={containerStyles} className={className}>
      {showPageInfo && (
        <div style={pageInfoStyles}>
          Showing {getStartItem()} to {getEndItem()} of {totalItems} entries
        </div>
      )}

      <div style={controlsStyles}>
        <button
          style={currentPage === 1 ? disabledButtonStyles : buttonStyles}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        {visiblePages.map((page, index) => (
          <React.Fragment key={index}>
            {page === "..." ? (
              <span style={ellipsisStyles}>...</span>
            ) : (
              <button
                style={currentPage === page ? activeButtonStyles : buttonStyles}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}

        <button
          style={currentPage === totalPages ? disabledButtonStyles : buttonStyles}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {showItemsPerPage && (
        <div style={controlsStyles}>
          <label style={labelStyles}>Items per page:</label>
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            style={selectStyles}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      )}
    </div>
  );
};

export default Pagination;
