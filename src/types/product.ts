import { CategoryId } from './category';

export interface PercentSale {
    percent: number;
    type: 'percent';
}

export interface FixedSale {
    amount: number;
    type: 'fixed';
}

export type Sale = FixedSale | PercentSale;

export interface Option {
    key: string;
    label?: string;
    priceChange?: Sale;
}

export interface BaseVariant {
    key: string;
    label?: string;
    options: Option[];
}

export interface SingleOptionVariant extends BaseVariant {
    default?: string;
    type: 'single';
}

export interface MultipleOptionVariant extends BaseVariant {
    default?: string[];
    type: 'multiple';
}

export type Variant = MultipleOptionVariant | SingleOptionVariant;

export interface Product {
    categoryId: CategoryId[];
    descriptions?: string;
    id: number;
    image: string;
    name: string;
    price: number;
    sale?: Sale;
    variants?: Variant[];
}
