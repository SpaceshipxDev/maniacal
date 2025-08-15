'use client';

import { useState } from 'react';
import MetadataForm from '../components/MetadataForm';
import Spreadsheet from '../components/Spreadsheet';
import PreviewSheet from '../components/PreviewSheet';
import type { Metadata, RowData } from '../components/types';

export default function Home() {
  const [metadata, setMetadata] = useState<Metadata>({
    order: '',
    dueDate: '',
    customer: '',
    contact: '',
    note: '',
  });

  const [rows, setRows] = useState<RowData[]>([
    {
      image: '',
      drawing: '',
      spec: '',
      material: '',
      quantity: '',
      machining: '',
      process: '',
      note: '',
      unitPrice: '',
      totalPrice: '',
      purchase: false,
    },
  ]);

  const [preview, setPreview] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-gray-100 p-8 font-sans">
      <div className="max-w-full mx-auto space-y-6">
        <MetadataForm metadata={metadata} onChange={setMetadata} />
        <Spreadsheet rows={rows} onChange={setRows} />
        <div className="flex gap-4 justify-center mt-6">
          {['报价单', '生产单', '送货单', '采购单'].map((ch) => (
            <button
              key={ch}
              onClick={() => setPreview(ch)}
              className="px-4 py-2 bg-white rounded-lg shadow hover:bg-gray-50"
            >
              {ch}
            </button>
          ))}
        </div>
      </div>
      {preview && (
        <PreviewSheet
          metadata={metadata}
          rows={rows}
          channel={preview}
          onClose={() => setPreview(null)}
        />
      )}
    </main>
  );
}
