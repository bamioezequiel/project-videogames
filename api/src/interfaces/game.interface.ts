export interface Game {
  _id?: string
  name: string;
  description: Text;
  released: string;
  main_image: string;
  short_screenshots: any;
  rating: number;
  price: number;
  price_with_sale: number;
  on_sale: number;
  active: boolean;
  featured: boolean;
  is_new: boolean;
  genres: any;
  tags: any;
  platforms: any;
}
