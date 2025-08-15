import React from "react";
import type { RowData } from "./types";

type Column = { key: keyof RowData; label: string; type?: "checkbox" };

const columns: Column[] = [
  { key: "image", label: "零件图片" },
  { key: "drawing", label: "图号" },
  { key: "spec", label: "规格" },
  { key: "material", label: "材料" },
  { key: "quantity", label: "数量" },
  { key: "machining", label: "加工方式" },
  { key: "process", label: "工艺要求" },
  { key: "note", label: "备注" },
  { key: "unitPrice", label: "单价" },
  { key: "totalPrice", label: "总价" },
  { key: "purchase", label: "采购", type: "checkbox" },
];

interface Props {
  rows: RowData[];
  onChange: (rows: RowData[]) => void;
}

export default function Spreadsheet({ rows, onChange }: Props) {
  const handleInput = (
    rowIndex: number,
    key: keyof RowData,
    value: string | boolean
  ) => {
    const updated = rows.map((r, i) =>
      i === rowIndex ? { ...r, [key]: value } : r
    );
    onChange(updated);
  };

  const handlePaste = (
    rowIndex: number,
    key: keyof RowData,
    e: React.ClipboardEvent<HTMLDivElement>
  ) => {
    const file = e.clipboardData.files[0];
    if (file && file.type.startsWith("image/")) {
      e.preventDefault();
      const reader = new FileReader();
      reader.onload = (evt) => {
        handleInput(rowIndex, key, `<img src="${evt.target?.result}" class="max-h-16 object-contain" />`);
      };
      reader.readAsDataURL(file);
    }
  };

  const addRow = () => {
    onChange([
      ...rows,
      {
        image: "",
        drawing: "",
        spec: "",
        material: "",
        quantity: "",
        machining: "",
        process: "",
        note: "",
        unitPrice: "",
        totalPrice: "",
        purchase: false,
      },
    ]);
  };

  return (
    <div className="bg-white rounded-xl shadow p-4 overflow-auto">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className="border-b border-gray-200 px-2 py-1 text-left font-medium"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="odd:bg-gray-50">
              {columns.map((col) => (
                <td key={col.key} className="border-b border-gray-100 px-2 py-1">
                  {col.type === "checkbox" ? (
                    <input
                      type="checkbox"
                      checked={row[col.key] as boolean}
                      onChange={(e) => handleInput(i, col.key, e.target.checked)}
                    />
                  ) : (
                    <div
                      className="min-h-[40px] outline-none focus:ring-1 focus:ring-black/40 p-1"
                      contentEditable
                      suppressContentEditableWarning
                      onInput={(e) =>
                        handleInput(i, col.key, e.currentTarget.innerHTML)
                      }
                      onPaste={(e) => handlePaste(i, col.key, e)}
                      dangerouslySetInnerHTML={{
                        __html: row[col.key] as string,
                      }}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={addRow}
        className="mt-4 px-3 py-1 border border-gray-300 rounded hover:bg-gray-100"
      >
        + 添加行
      </button>
    </div>
  );
}
