export interface Cipher {
  cipher_id?: number;
  cipher_game_id: number;
  req_cipher_id?: number;
  name: string;
  description: string;
  cipher_file?: string;
  img?: string;
  success_msg: string;
  cooldown: number;
  attempts?: number;
  score: number;
  reference_solution?: string;
}
