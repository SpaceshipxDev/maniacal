import React from "react";
import type { Metadata, RowData } from "./types";

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

const channelColumns: Record<string, Column[]> = {
  报价单: columns,
  生产单: columns.filter((c) => c.key !== "unitPrice" && c.key !== "totalPrice"),
  送货单: columns.filter((c) => c.key !== "unitPrice"),
  采购单: columns.filter((c) =>
    ["image", "drawing", "spec", "material", "quantity", "purchase"].includes(
      c.key
    )
  ),
};

interface Props {
  metadata: Metadata;
  rows: RowData[];
  channel: string;
  onClose: () => void;
}

export default function PreviewSheet({ metadata, rows, channel, onClose }: Props) {
  const cols = channelColumns[channel] || columns;
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-xl shadow-xl w-11/12 h-5/6 p-8 overflow-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          ✕
        </button>
        <h2 className="text-center text-xl font-semibold mb-6">{channel}</h2>
        <div className="grid grid-cols-5 gap-4 text-sm mb-6">
          <div>销售单号: {metadata.order}</div>
          <div>交期: {metadata.dueDate}</div>
          <div>客户名称: {metadata.customer}</div>
          <div>联系人: {metadata.contact}</div>
          <div>备注: {metadata.note}</div>
        </div>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              {cols.map((col) => (
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
                {cols.map((col) => (
                  <td key={col.key} className="border-b border-gray-100 px-2 py-1">
                    {col.type === "checkbox" ? (
                      row[col.key] ? "✔" : ""
                    ) : (
                      <div
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
        <div className="mt-4 text-right">
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            打印
          </button>
        </div>
      </div>
    </div>
  );
}
