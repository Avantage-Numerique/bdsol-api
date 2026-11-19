export interface Tos {
    accepted: boolean;
    acceptedOn?: Date;
    ipAddress?: string;
}

export interface Verify {
    isVerified: boolean;
    token?: string;
    expireDate?: Date;
    validatedOn?: Date;
    ipAddress?: string;
}

export interface ChangePassword {
    token?: string;
    expireDate?: Date;
    ipAddress?: string;
}

export interface UserContract {
    username: string;
    email: string;
    password: string;
    avatar: string;
    name: string;
    firstName?: string;
    lastName?: string;
    role: string;
    tos: Tos;
    verify: Verify;
    changePassword: ChangePassword;
    lastLogin: Date;
}
