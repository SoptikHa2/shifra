export interface LoginDTO {
  username: string;
  password: string;
}

export interface LoginResponseDto {

}

export interface CheckUsernameAvailabilityDTO {
  username: string;
}

type RegisterTemporaryDTO = CheckUsernameAvailabilityDTO;

export interface Register {
  username: string;
  email: string;
  password: string;
}
