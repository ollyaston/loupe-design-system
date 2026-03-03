import React from "react";

interface UsageTablePreviewProps {
  fontFamily: string;
  titleColor: string;
  titleFontWeight: string;
  titleFontSize: string;
  thFontSize: string;
  thFontWeight: string;
  thColor: string;
  tdFontSize: string;
  tdColor: string;
  wrapperBorder: string;
  headerBg: string;
  headerBorderBottom: string;
  thBg: string;
  thBorderBottom: string;
  tdBg: string;
  tdFontWeight: string;
  tdBorderBottom: string;
  rowHoverBg: string;
}

export function UsageTablePreview({
  fontFamily,
  titleColor,
  titleFontWeight,
  titleFontSize,
  thFontSize,
  thFontWeight,
  thColor,
  tdFontSize,
  tdColor,
  wrapperBorder,
  headerBg,
  headerBorderBottom,
  thBg,
  thBorderBottom,
  tdBg,
  tdFontWeight,
  tdBorderBottom,
  rowHoverBg,
}: UsageTablePreviewProps) {
  return (
    <div
      className="loupe-system loupe-usage-table-container"
      style={{ position: "relative", minWidth: 0 }}
    >
      <div
        className="loupe-usage-table-table-wrapper"
        style={{
          position: "static",
          height: "auto",
          left: undefined,
          top: undefined,
          cursor: undefined,
          border: wrapperBorder,
          borderRadius: "12px",
          boxShadow: "0 2px 16px 0 rgba(16, 24, 40, 0.08)",
          overflowX: "auto",
          transition: "box-shadow 0.2s",
          fontFamily: fontFamily,
          width: "100%",
          minWidth: 0,
        }}
      >
        <div
          className="loupe-usage-table-header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "18px 24px",
            background: headerBg,
            borderBottom: headerBorderBottom,
            borderRadius: "12px 12px 0 0",
            fontFamily: fontFamily,
          }}
        >
          <h3
            className="loupe-usage-table-title"
            style={{
              fontSize: titleFontSize,
              fontWeight: titleFontWeight,
              color: titleColor,
              fontFamily: fontFamily,
            }}
          >
            Usage table
          </h3>
        </div>
        <div style={{ overflow: "auto" }}>
          <table
            className="loupe-usage-table-table"
            style={{
              width: "100%",
              minWidth: 0,
              tableLayout: "auto",
              wordBreak: "break-word",
              borderCollapse: "separate",
              borderSpacing: 0,
              fontFamily: fontFamily,
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    fontSize: thFontSize,
                    fontWeight: thFontWeight,
                    color: thColor,
                    textAlign: "left",
                    padding: "18px 24px",
                    background: thBg,
                    borderBottom: thBorderBottom,
                    whiteSpace: "nowrap",
                    fontFamily: fontFamily,
                  }}
                >
                  Event
                </th>
                <th
                  style={{
                    fontSize: thFontSize,
                    fontWeight: thFontWeight,
                    color: thColor,
                    textAlign: "left",
                    padding: "18px 24px",
                    background: thBg,
                    borderBottom: thBorderBottom,
                    whiteSpace: "nowrap",
                    fontFamily: fontFamily,
                  }}
                >
                  Start date
                </th>
                <th
                  style={{
                    fontSize: thFontSize,
                    fontWeight: thFontWeight,
                    color: thColor,
                    textAlign: "left",
                    padding: "18px 24px",
                    background: thBg,
                    borderBottom: thBorderBottom,
                    whiteSpace: "nowrap",
                    fontFamily: fontFamily,
                  }}
                >
                  End date
                </th>
                <th
                  style={{
                    fontSize: thFontSize,
                    fontWeight: thFontWeight,
                    color: thColor,
                    textAlign: "center",
                    padding: "18px 24px",
                    background: thBg,
                    borderBottom: thBorderBottom,
                    whiteSpace: "nowrap",
                    fontFamily: fontFamily,
                  }}
                >
                  Current usage
                </th>
                <th
                  style={{
                    fontSize: thFontSize,
                    fontWeight: thFontWeight,
                    color: thColor,
                    textAlign: "center",
                    padding: "18px 24px",
                    background: thBg,
                    borderBottom: thBorderBottom,
                    whiteSpace: "nowrap",
                    fontFamily: fontFamily,
                  }}
                >
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                style={{
                  backgroundColor: tdBg,
                  borderBottom: tdBorderBottom,
                  fontFamily: fontFamily,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = rowHoverBg)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = tdBg)
                }
              >
                <td
                  style={{
                    fontSize: tdFontSize,
                    color: tdColor,
                    fontWeight: 600,
                    padding: "16px 24px",
                    whiteSpace: "nowrap",
                    fontFamily: fontFamily,
                    borderBottom: tdBorderBottom,
                  }}
                >
                  User login
                </td>
                <td
                  style={{
                    fontSize: tdFontSize,
                    color: tdColor,
                    fontWeight: tdFontWeight,
                    padding: "16px 24px",
                    whiteSpace: "nowrap",
                    fontFamily: fontFamily,
                    borderBottom: tdBorderBottom,
                  }}
                >
                  Mar 1, 2024
                </td>
                <td
                  style={{
                    fontSize: tdFontSize,
                    color: tdColor,
                    fontWeight: tdFontWeight,
                    padding: "16px 24px",
                    whiteSpace: "nowrap",
                    fontFamily: fontFamily,
                    borderBottom: tdBorderBottom,
                  }}
                >
                  Mar 31, 2024
                </td>
                <td
                  style={{
                    fontSize: tdFontSize,
                    color: tdColor,
                    fontWeight: tdFontWeight,
                    padding: "16px 24px",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    fontFamily: fontFamily,
                    borderBottom: tdBorderBottom,
                  }}
                >
                  150
                </td>
                <td
                  style={{
                    fontSize: tdFontSize,
                    color: tdColor,
                    fontWeight: 600,
                    padding: "16px 24px",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    fontFamily: fontFamily,
                    borderBottom: tdBorderBottom,
                  }}
                >
                  $1,250.00
                </td>
              </tr>
              <tr
                style={{
                  backgroundColor: tdBg,
                  borderBottom: tdBorderBottom,
                  fontFamily: fontFamily,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = rowHoverBg)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = tdBg)
                }
              >
                <td
                  style={{
                    fontSize: tdFontSize,
                    color: tdColor,
                    fontWeight: 600,
                    padding: "16px 24px",
                    whiteSpace: "nowrap",
                    fontFamily: fontFamily,
                    borderBottom: tdBorderBottom,
                  }}
                >
                  API Request
                </td>
                <td
                  style={{
                    fontSize: tdFontSize,
                    color: tdColor,
                    fontWeight: tdFontWeight,
                    padding: "16px 24px",
                    whiteSpace: "nowrap",
                    fontFamily: fontFamily,
                    borderBottom: tdBorderBottom,
                  }}
                >
                  Mar 1, 2024
                </td>
                <td
                  style={{
                    fontSize: tdFontSize,
                    color: tdColor,
                    fontWeight: tdFontWeight,
                    padding: "16px 24px",
                    whiteSpace: "nowrap",
                    fontFamily: fontFamily,
                    borderBottom: tdBorderBottom,
                  }}
                >
                  Mar 31, 2024
                </td>
                <td
                  style={{
                    fontSize: tdFontSize,
                    color: tdColor,
                    fontWeight: tdFontWeight,
                    padding: "16px 24px",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    fontFamily: fontFamily,
                    borderBottom: tdBorderBottom,
                  }}
                >
                  300
                </td>
                <td
                  style={{
                    fontSize: tdFontSize,
                    color: tdColor,
                    fontWeight: 600,
                    padding: "16px 24px",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    fontFamily: fontFamily,
                    borderBottom: tdBorderBottom,
                  }}
                >
                  $300.00
                </td>
              </tr>
              <tr
                style={{
                  backgroundColor: tdBg,
                  fontFamily: fontFamily,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = rowHoverBg)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = tdBg)
                }
              >
                <td
                  style={{
                    fontSize: tdFontSize,
                    color: tdColor,
                    fontWeight: 600,
                    padding: "16px 24px",
                    whiteSpace: "nowrap",
                    fontFamily: fontFamily,
                  }}
                >
                  Data export
                </td>
                <td
                  style={{
                    fontSize: tdFontSize,
                    color: tdColor,
                    fontWeight: tdFontWeight,
                    padding: "16px 24px",
                    whiteSpace: "nowrap",
                    fontFamily: fontFamily,
                  }}
                >
                  Mar 1, 2024
                </td>
                <td
                  style={{
                    fontSize: tdFontSize,
                    color: tdColor,
                    fontWeight: tdFontWeight,
                    padding: "16px 24px",
                    whiteSpace: "nowrap",
                    fontFamily: fontFamily,
                  }}
                >
                  Mar 31, 2024
                </td>
                <td
                  style={{
                    fontSize: tdFontSize,
                    color: tdColor,
                    fontWeight: tdFontWeight,
                    padding: "16px 24px",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    fontFamily: fontFamily,
                  }}
                >
                  50
                </td>
                <td
                  style={{
                    fontSize: tdFontSize,
                    color: tdColor,
                    fontWeight: 600,
                    padding: "16px 24px",
                    textAlign: "center",
                    whiteSpace: "nowrap",
                    fontFamily: fontFamily,
                  }}
                >
                  $250.00
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
