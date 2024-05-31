export interface Customer {
  id: number;
  name: string;
  gender: string;
  phone: string;
  address: string;
  point: number;
  membershipId: number;
  membershipRate: string;
}

export interface CustomerResponse {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: Customer[];
}
