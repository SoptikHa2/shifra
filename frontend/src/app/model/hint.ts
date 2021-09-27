export interface Hint {
  hint_id: number;
  cipher_id: number;
  msg?: string;
  img?: string;
  hint_file?: string;
  score_cost?: number;
  time_cost?: number;
  is_used?: boolean;
}
