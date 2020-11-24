export interface UserMention {
  id: number;
  id_str: string;
  indices: number[];
  name: string;
  screen_name: string;
}

export interface Entities {
  hashtags: any[];
  urls: any[];
  user_mentions: UserMention[];
}

export interface Attributes {}

export interface BoundingBox {
  coordinates: number[][][];
  type: string;
}

export interface Place {
  attributes: Attributes;
  bounding_box: BoundingBox;
  contained_within: any[];
  country: string;
  country_code: string;
  full_name: string;
  id: string;
  name: string;
  place_type: string;
  url: string;
}

export interface User {
  created_at: string;
  followers_count: number;
  id: number;
  location: string;
  name: string;
}

export interface TweetInfo {
  coordinates?: any;
  created_at: string;
  entities: Entities;
  favorite_count: number;
  id: number;
  lang: string;
  place: Place;
  retweet_count: number;
  text: string;
  user: User;
}

export interface ApiResponse {
  TweetInfo: TweetInfo;
  TweetTokenization: string[];
  id: string;
}

export interface Data {
  data: ApiResponse[];
}

export interface ParseData {
  id: string;
  name: string;
  location: string;
  followers: number;
  tweet: string;
  retweets: number;
  language: string;
  tweetTokenization: string[];
}
