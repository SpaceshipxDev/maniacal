import React from "react";
import type { Metadata } from "./types";

interface Props {
  metadata: Metadata;
  onChange: (meta: Metadata) => void;
}

export default function MetadataForm({ metadata, onChange }: Props) {
  const handle = (field: keyof Metadata) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange({ ...metadata, [field]: e.target.value });
  };

  return (
    <div className="grid grid-cols-5 gap-4 p-4 bg-white rounded-xl shadow mb-6">
      <input
        className="border-b border-gray-300 focus:outline-none focus:border-black px-2 py-1"
        placeholder="销售单号"
        value={metadata.order}
        onChange={handle("order")}
      />
      <input
        className="border-b border-gray-300 focus:outline-none focus:border-black px-2 py-1"
        placeholder="交期"
        value={metadata.dueDate}
        onChange={handle("dueDate")}
      />
      <input
        className="border-b border-gray-300 focus:outline-none focus:border-black px-2 py-1"
        placeholder="客户名称"
        value={metadata.customer}
        onChange={handle("customer")}
      />
      <input
        className="border-b border-gray-300 focus:outline-none focus:border-black px-2 py-1"
        placeholder="联系人"
        value={metadata.contact}
        onChange={handle("contact")}
      />
      <input
        className="border-b border-gray-300 focus:outline-none focus:border-black px-2 py-1"
        placeholder="备注"
        value={metadata.note}
        onChange={handle("note")}
      />
    </div>
  );
}
