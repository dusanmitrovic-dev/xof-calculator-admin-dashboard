import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface GuildMember {
  _id: string;
  guild_id: string;
  id: string;
  name: string;
  display_name: string;
}

interface GuildRole {
  _id: string;
  guild_id: string;
  id: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class GuildService {
  private apiUrl = '/api/guilds'; // Assuming your new routes are under /api/guilds

  constructor(private http: HttpClient) { }

  getGuildMembers(guildId: string): Observable<GuildMember[]> {
    return this.http.get<GuildMember[]>(`${this.apiUrl}/members/${guildId}`);
  }

  getGuildRoles(guildId: string): Observable<GuildRole[]> {
    return this.http.get<GuildRole[]>(`${this.apiUrl}/roles/${guildId}`);
  }
}