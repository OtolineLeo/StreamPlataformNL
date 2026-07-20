export interface CreateUserDto {
    username: string;
    email: string;
    password: string;

    // Optional fields
    avatarUrl?: string; // generic logo
    bio?: string; // general information about the user = insert your bio
}