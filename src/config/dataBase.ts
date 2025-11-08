import type { StoreConfig } from "../types/dataBase";

export const DB_NAME = "BudgetAppDB";
export const DB_VERSION = 1;

export const STORES: StoreConfig[] = [
  {
    name: "expenses",
    keyPath: "id",
    autoIncrement: true,
    indexes: [
      { name: "createdAt", keyPath: "createdAt", options: { unique: false } },
    ],
  },
  {
    name: "categories",
    keyPath: "id",
    autoIncrement: true,
    indexes: [
      { name: "createdAt", keyPath: "createdAt", options: { unique: false } },
    ],
  },
  {
    name: "income",
    keyPath: "id",
    autoIncrement: true,
    indexes: [
      { name: "createdAt", keyPath: "createdAt", options: { unique: false } },
    ],
  },
];
