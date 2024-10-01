export type platformType = "PC" | "XBOX" | "PS4" | "PS5";
export type requirementsType = {
  min: {
    os_version: string;
    cpu: string;
    memory: number;
    gpu: string;
    storage: number;
  };
  recommend: {
    os_version: string;
    cpu: string;
    memory: number;
    gpu: string;
    storage: number;
  };
};
export type ProductType = {
  id?: string;
  title: string;
  description: string;
  trailer?: string;
  rating: string;
  card_img: string;
  imges: string[];
  relase_date: string;
  platform: platformType;
  price: number;
  requirements?: requirementsType;
};
export type cartType = {
  uid: string;
  products: [];
};

export type CartProductType = {
  title: string;
  card_img: string;
  platform: platformType;
  price: number;
  amount: number;
};
export type DiscounatCodesType = { code: string; percent: number; id?: string };
export type OrderStatusType = "pending" | "rejected" | "completed";
export type PaymentForm = {
  name: string;
  email: string;
  uid?: string;
  total?: number;
  anotherID?: string;
  products?: CartProductType[];
  status?: OrderStatusType;
  paymnetInfo: {
    transactionID: string;
  };
};
export type pendingType = "pending" | "fulfilled" | "rejected" | "idle";
export type roleType = "user" | "admin";

export type wishlistProductType = {
  title: string;
  card_img: string;
  platform: platformType;
  price: number;
};
export type WishListType = {
  uid: string;
  products: wishlistProductType[];
  id: string;
};
