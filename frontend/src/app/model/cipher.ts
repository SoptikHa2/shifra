import {Hint} from "./hint";
import {SafeUrl} from "@angular/platform-browser";

export interface Cipher {
  cipher_id?: number;
  cipher_game_id: number;
  req_cipher_id?: number;
  name: string;
  description: string;
  cipher_file?: string;
  img?: string | SafeUrl;
  success_msg: string;
  cooldown: number;
  attempts?: number;
  score: number;
  reference_solution?: string;
  solved: boolean;
  solution?: string;
  judge?: string;
  hints: Hint[]
}
