export interface User {
    id:string
}

export interface BaseUser extends User {
    rate: string;
    asset_id_base: string;
    time:string
    asset_id_quote:string

}
  