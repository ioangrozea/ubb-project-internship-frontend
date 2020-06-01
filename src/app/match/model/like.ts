export class Like {
  current_profile_id: number;
  liked_profile_id: number;
  like: boolean;


  constructor(current_profile_id: number, liked_profile_id: number, like: boolean) {
    this.current_profile_id = current_profile_id;
    this.liked_profile_id = liked_profile_id;
    this.like = like;
  }
}
