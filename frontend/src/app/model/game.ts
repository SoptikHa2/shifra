import {SafeUrl} from "@angular/platform-browser";
import {Cipher} from "./cipher";

export interface Game {
  cipher_game_id: number;
  cipher_id_to_start_timer: number;
  name: string;
  image: string | SafeUrl;
  description: string;
  visible_from: Date;
  starts_at: Date;
  deadline_signup: Date;
  deadline_event: Date;
  capacity: number;
  teammax: number;
  teamId: number | null;
  signup: boolean;
  ciphers: Cipher[] | undefined;
  password: string;
  autoapprove: boolean;
}
