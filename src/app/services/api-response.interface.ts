export interface Hashtag {
  indices: number[];
  text: string;
}

export interface Url {
  display_url: string;
  expanded_url: string;
  indices: number[];
  url: string;
}

export interface Entities {
  hashtags: Hashtag[];
  urls: Url[];
  user_mentions: any[];
}

export interface User {
  created_at: string;
  followers_count: number;
  id: number;
  location: string;
  name: string;
}

export interface Data {
  coordinates?: any;
  created_at: string;
  entities: Entities;
  favorite_count: number;
  id: number;
  lang: string;
  place?: any;
  retweet_count: number;
  text: string;
  user: User;
}

export interface ApiResponse {
  data: Data;
}
