import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Match} from "../../match/model/match";
import {Observable} from "rxjs";
import {Message} from "../model/message";
import {MessageToSend} from "../model/message_to_send";


@Injectable({providedIn: 'root'})
export class ChatApiService {
  constructor(private http: HttpClient) {
  }

  getChatMatches(profile_id: number): Observable<Match[]> {
    return this.http.post<Match[]>(`${environment.api_match_url}/match/get-matches-by-profile-id`, {current_profile_id: profile_id});
  }

  getChatMessages(match_id: number): Observable<Message[]> {
    return this.http.post<Message[]>(`${environment.api_chat_url}/chat/get-by-matched-contact-id`, {matched_contact_id: match_id});
  }

  sendMessage(messageToSend: MessageToSend) {
    return this.http.post<Message>(`${environment.api_chat_url}/chat/send-message`, messageToSend);
  }
}
