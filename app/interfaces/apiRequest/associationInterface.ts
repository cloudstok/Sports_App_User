export default interface association {
  data: Data;
  cache: Cache;
  schema: Schema;
  error?: any;
  http_status_code: number;
}

interface Schema {
  major_version: string;
  minor_version: string;
}

interface Cache {
  key: string;
  expires: number;
  etag: string;
  max_age: number;
}

interface Data {
  associations: Association[];
  previous_page_key?: any;
  next_page_key?: any;
}

interface Association {
  key: string;
  code: string;
  name: string;
  country: Country;
  parent?: string;
}

interface Country {
  short_code?: string;
  code?: string;
  name?: string;
  official_name?: string;
  is_region: boolean;
}