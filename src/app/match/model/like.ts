export class Like {
  current_profile_id: number;
  liked_profile_if: number;
  like: boolean;


  constructor(current_profile_id: number, liked_profile_if: number, like: boolean) {
    this.current_profile_id = current_profile_id;
    this.liked_profile_if = liked_profile_if;
    this.like = like;
  }
}
