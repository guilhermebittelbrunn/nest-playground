export enum ProductStatus {
  'ACTIVE' = 'active',
  'INACTIVE' = 'inactive',
}

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  status: ProductStatus;
}
