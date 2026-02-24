export interface JobsApiResponse {
  page: number;
  page_count: number;
  items_per_page: number;
  took: number;
  timed_out: boolean;
  total: number;
  results: Job[];
  aggregations: Aggregations; 
}

export interface Job {
  id: number;
  name: string;
  short_name: string;
  contents: string; 
  type: string;
  isLiked?: boolean;
  model_type: string;
  publication_date: string; 
  locations: Location[];
  categories: Category[];
  levels: Level[];
  tags: Tag[];
  refs: JobRefs;
  company: Company;
}


export interface Location {
  name: string;
}

export interface Category {
  name: string;
}

export interface Level {
  name: string;
  short_name: string;
}

export interface Tag {
  name: string;
  short_name?: string; 
}

export interface JobRefs {
  landing_page: string;
}

export interface Company {
  id: number;
  short_name: string;
  name: string;
}

export interface Aggregations {
  [key: string]: any; 
}

export interface FavoriteOffer {
  id?: number;
  userId: string;
  offerId: number;
  title: string;
  company: string;
  location: string;
  url: string;
  dateAdded: string;
}