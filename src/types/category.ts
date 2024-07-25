export type CategoryId = 'coffee' | 'matcha' | 'food' | 'milktea' | 'drinks' | 'bread' | 'juice';

export interface Category {
    icon: string;
    id: CategoryId;
    name: string;
}
