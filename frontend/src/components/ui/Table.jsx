import React, { useState } from "react";

const Table = ({
  columns = [],
  data = [],
  loading = false,
  error = null,
  pagination = false,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  sortable = false,
  onSort,
  sortColumn,
  sortDirection,
  selectable = false,
  onSelectionChange,
  emptyMessage = "No data available",
  className = "",
  style = {},
  headerStyle = {},
  rowStyle = {},
  cellStyle = {},
}) => {
  const [selectedRows, setSelectedRows] = useState(new Set());

  const handleSort = (column) => {
    if (sortable && column.sortable !== false) {
      const newDirection = sortColumn === column.key && sortDirection === "asc" ? "desc" : "asc";
      onSort && onSort(column.key, newDirection);
    }
  };

  const handleRowSelection = (rowId) => {
    const newSelection = new Set(selectedRows);
    if (newSelection.has(rowId)) {
      newSelection.delete(rowId);
    } else {
      newSelection.add(rowId);
    }
    setSelectedRows(newSelection);
    onSelectionChange && onSelectionChange(newSelection);
  };

  const handleSelectAll = () => {
    if (selectedRows.size === data.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(data.map((row) => row.id || row._id)));
    }
    onSelectionChange && onSelectionChange(selectedRows);
  };

  const tableStyles = {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "white",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
    ...style,
  };

  const headerStyles = {
    backgroundColor: "#f8f9fa",
    borderBottom: "2px solid #dee2e6",
    ...headerStyle,
  };

  const headerCellStyles = {
    padding: "12px 16px",
    textAlign: "left",
    fontWeight: "600",
    color: "#495057",
    fontSize: "14px",
    borderRight: "1px solid #dee2e6",
    cursor: sortable ? "pointer" : "default",
    userSelect: "none",
    transition: "background-color 0.2s ease",
  };

  const rowStyles = {
    borderBottom: "1px solid #dee2e6",
    transition: "background-color 0.2s ease",
    ...rowStyle,
  };

  const cellStyles = {
    padding: "12px 16px",
    fontSize: "14px",
    color: "#495057",
    borderRight: "1px solid #dee2e6",
    ...cellStyle,
  };

  const paginationStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px",
    backgroundColor: "#f8f9fa",
    borderTop: "1px solid #dee2e6",
  };

  const paginationButtonStyles = {
    padding: "6px 12px",
    margin: "0 4px",
    border: "1px solid #dee2e6",
    backgroundColor: "white",
    color: "#007bff",
    cursor: "pointer",
    borderRadius: "4px",
    transition: "all 0.2s ease",
  };

  const activeButtonStyles = {
    ...paginationButtonStyles,
    backgroundColor: "#007bff",
    color: "white",
  };

  const disabledButtonStyles = {
    ...paginationButtonStyles,
    color: "#6c757d",
    cursor: "not-allowed",
  };

  if (loading) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <div>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "#dc3545" }}>
        <div>Error: {error}</div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div style={{ padding: "40px", textAlign: "center", color: "#6c757d" }}>
        <div>{emptyMessage}</div>
      </div>
    );
  }

  return (
    <div>
      <table style={tableStyles} className={className}>
        <thead style={headerStyles}>
          <tr>
            {selectable && (
              <th style={{ ...headerCellStyles, width: "40px" }}>
                <input
                  type="checkbox"
                  checked={selectedRows.size === data.length}
                  onChange={handleSelectAll}
                  style={{ cursor: "pointer" }}
                />
              </th>
            )}
            {columns.map((column) => (
              <th
                key={column.key}
                style={{
                  ...headerCellStyles,
                  ...(column.width && { width: column.width }),
                }}
                onClick={() => handleSort(column)}
                onMouseEnter={(e) => {
                  if (sortable && column.sortable !== false) {
                    e.target.style.backgroundColor = "#e9ecef";
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "#f8f9fa";
                }}
              >
                {column.title}
                {sortable && column.sortable !== false && (
                  <span style={{ marginLeft: "8px", fontSize: "12px" }}>
                    {sortColumn === column.key ? (sortDirection === "asc" ? "▲" : "▼") : "◇"}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={row.id || row._id || rowIndex}
              style={{
                ...rowStyles,
                backgroundColor: selectedRows.has(row.id || row._id) ? "#e3f2fd" : "white",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = selectedRows.has(row.id || row._id) ? "#e3f2fd" : "#f8f9fa";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = selectedRows.has(row.id || row._id) ? "#e3f2fd" : "white";
              }}
            >
              {selectable && (
                <td style={{ ...cellStyles, width: "40px" }}>
                  <input
                    type="checkbox"
                    checked={selectedRows.has(row.id || row._id)}
                    onChange={() => handleRowSelection(row.id || row._id)}
                    style={{ cursor: "pointer" }}
                  />
                </td>
              )}
              {columns.map((column) => (
                <td key={column.key} style={{ ...cellStyles, ...(column.width && { width: column.width }) }}>
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {pagination && totalPages > 1 && (
        <div style={paginationStyles}>
          <div>
            Page {currentPage} of {totalPages}
          </div>
          <div>
            <button
              style={currentPage === 1 ? disabledButtonStyles : paginationButtonStyles}
              onClick={() => onPageChange && onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  style={currentPage === pageNum ? activeButtonStyles : paginationButtonStyles}
                  onClick={() => onPageChange && onPageChange(pageNum)}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              style={currentPage === totalPages ? disabledButtonStyles : paginationButtonStyles}
              onClick={() => onPageChange && onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
