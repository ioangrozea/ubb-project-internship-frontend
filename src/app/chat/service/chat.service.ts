import {Injectable} from "@angular/core";
import {ChatApiService} from "../http";
import {ProfileApiService} from "../../profile/http";
import {Match} from "../../match/model/match";
import {Chanel} from "../model/chanel";


@Injectable({providedIn: 'root'})
export class ChatService {
  constructor(private chatApiService: ChatApiService,
              private profileApiService: ProfileApiService) {
  }

  async getChatMatches(profile_id: number): Promise<Match[]> {
    return await this.chatApiService.getChatMatches(profile_id).toPromise()
  }

  async getChatProfile(match: Match, current_Profile_id: number): Promise<Chanel> {
    let partner: number;
    if(current_Profile_id != match.SecondProfileId){
      partner = match.SecondProfileId;
    } else {
      partner = match.FirstProfileId;
    }
    const photos = await this.profileApiService.getProfilePhotos(partner).toPromise();
    const profile = await this.profileApiService.getProfileById(partner).toPromise()
    let url;
    if(photos && photos[0]){
       url = photos[0].Url
    }
    return new Chanel(profile.Name, current_Profile_id, partner, url, match.MatchedContactId)
  }

  async getChatContacts(profile_id: number): Promise<Promise<Chanel>[]> {
     const matches:Match[] = await this.getChatMatches(profile_id);
     return matches.map(match => this.getChatProfile(match, profile_id));
  }
}
