import {SafeUrl} from "@angular/platform-browser";
import {Person} from "./person";

export interface Team {
  name: string;
  invite_code: string;
  approved: boolean;
  teamMax: number;
  QRCode: SafeUrl;
  inviteLink: string;
  teamMates: Person[];
}
