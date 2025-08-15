export interface Metadata {
  order: string;
  dueDate: string;
  customer: string;
  contact: string;
  note: string;
}

export interface RowData {
  image: string;
  drawing: string;
  spec: string;
  material: string;
  quantity: string;
  machining: string;
  process: string;
  note: string;
  unitPrice: string;
  totalPrice: string;
  purchase: boolean;
}
