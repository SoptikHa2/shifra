export interface Game {
  cipher_game_id: number;
  cipher_id_to_start_timer: number;
  name: string;
  description: string;
  visible_from: Date;
  deadline_signup: Date;
  deadline_event: Date;
  capacity: number;
  teammax: number;
  autoapprove: boolean;
}
