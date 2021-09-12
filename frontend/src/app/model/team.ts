import {SafeUrl} from "@angular/platform-browser";
import {Person} from "./person";

export interface Team {
  team_id: number;
  name: string;
  invite_code: string;
  approved: boolean;
  QRCode: SafeUrl;
  inviteLink: string;
  teamMax: number;
  members: Person[];
}
