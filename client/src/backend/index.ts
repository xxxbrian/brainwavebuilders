// Generated by the RPC compiler.
// DO NOT EDIT.

//////////////////////////////
// Types defined in the types file
//////////////////////////////

export interface User {
    email: string;
    firstName: string;
    lastName: string;
    avatar?: string;
    gender?: string;
    title?: string;
    bio?: string;
}

export type Token = string;

export interface Error {
    message: string;
}

export interface Featured {
    background: string;
    title: string;
    description: string;
}

//////////////////////////////
// Endpoint Requests/Responses
//////////////////////////////


// PingRequest is the request that is sent to the ping endpoint.
export interface PingRequest {
    seq: number;
}

// PingResponse is the response that is sent to the ping endpoint.
export interface PingResponse {
    seq: number;
}

// CheckEmailRequest is the request that is sent to the checkEmail endpoint.
export interface CheckEmailRequest {
    email: string;
}

// CheckEmailResponse is the response that is sent to the checkEmail endpoint.
export interface CheckEmailResponse {
    taken: boolean;
}

// RegisterRequest is the request that is sent to the register endpoint.
export interface RegisterRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    otp: string;
}

// RegisterResponse is the response that is sent to the register endpoint.
export interface RegisterResponse {
    
}

// VerifyEmailRequest is the request that is sent to the verifyEmail endpoint.
export interface VerifyEmailRequest {
    email: string;
}

// VerifyEmailResponse is the response that is sent to the verifyEmail endpoint.
export interface VerifyEmailResponse {
    
}

// LoginRequest is the request that is sent to the login endpoint.
export interface LoginRequest {
    email: string;
    password: string;
}

// LoginResponse is the response that is sent to the login endpoint.
export interface LoginResponse {
    user: User;
    token: Token;
}

// GetFeaturedRequest is the request that is sent to the getFeatured endpoint.
export interface GetFeaturedRequest {
    
}

// GetFeaturedResponse is the response that is sent to the getFeatured endpoint.
export interface GetFeaturedResponse {
    featured: Featured;
}

// GetUserInfoRequest is the request that is sent to the getUserInfo endpoint.
export interface GetUserInfoRequest {
    email?: string;
    token: Token;
}

// GetUserInfoResponse is the response that is sent to the getUserInfo endpoint.
export interface GetUserInfoResponse {
    user: User;
}

// SetUserProfileRequest is the request that is sent to the setUserProfile endpoint.
export interface SetUserProfileRequest {
    user: User;
    token: Token;
}

// SetUserProfileResponse is the response that is sent to the setUserProfile endpoint.
export interface SetUserProfileResponse {
    
}


//////////////////////////////
// API Errors
//////////////////////////////

export class APIError extends Error {
    public code?: string;
    constructor(message: string, code?: string) {
        super(message);
        this.code = code;
    }
}

// eslint-disable-next-line
export const isAPIError = (e: any): e is APIError => {
    // eslint-disable-next-line
    return e instanceof APIError || !!e._rpc_error;
}

export class BrainwavesClient {
    base_url: string;
    constructor(base_url: string) {
        this.base_url = base_url;
    }
    async ping(request: PingRequest): Promise<PingResponse> {
        const response = await fetch(`${this.base_url}/ping`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });

        const json = await response.json();

        if (!response.ok) {
            if (isAPIError(json)) {
                switch (response.status) {
                    case 400:
                        throw new APIError(json.message, json.code);
                    case 500:
                        throw new Error(json.message);
                }
            }

            throw new Error("RPC Request Failed.");
        }

        return json as PingResponse;
    }



    async checkEmail(request: CheckEmailRequest): Promise<CheckEmailResponse> {
        const response = await fetch(`${this.base_url}/checkEmail`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });

        const json = await response.json();

        if (!response.ok) {
            if (isAPIError(json)) {
                switch (response.status) {
                    case 400:
                        throw new APIError(json.message, json.code);
                    case 500:
                        throw new Error(json.message);
                }
            }

            throw new Error("RPC Request Failed.");
        }

        return json as CheckEmailResponse;
    }



    async register(request: RegisterRequest): Promise<RegisterResponse> {
        const response = await fetch(`${this.base_url}/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });

        const json = await response.json();

        if (!response.ok) {
            if (isAPIError(json)) {
                switch (response.status) {
                    case 400:
                        throw new APIError(json.message, json.code);
                    case 500:
                        throw new Error(json.message);
                }
            }

            throw new Error("RPC Request Failed.");
        }

        return json as RegisterResponse;
    }



    async verifyEmail(request: VerifyEmailRequest): Promise<VerifyEmailResponse> {
        const response = await fetch(`${this.base_url}/verifyEmail`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });

        const json = await response.json();

        if (!response.ok) {
            if (isAPIError(json)) {
                switch (response.status) {
                    case 400:
                        throw new APIError(json.message, json.code);
                    case 500:
                        throw new Error(json.message);
                }
            }

            throw new Error("RPC Request Failed.");
        }

        return json as VerifyEmailResponse;
    }



    async login(request: LoginRequest): Promise<LoginResponse> {
        const response = await fetch(`${this.base_url}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });

        const json = await response.json();

        if (!response.ok) {
            if (isAPIError(json)) {
                switch (response.status) {
                    case 400:
                        throw new APIError(json.message, json.code);
                    case 500:
                        throw new Error(json.message);
                }
            }

            throw new Error("RPC Request Failed.");
        }

        return json as LoginResponse;
    }



    async getFeatured(request: GetFeaturedRequest): Promise<GetFeaturedResponse> {
        const response = await fetch(`${this.base_url}/getFeatured`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });

        const json = await response.json();

        if (!response.ok) {
            if (isAPIError(json)) {
                switch (response.status) {
                    case 400:
                        throw new APIError(json.message, json.code);
                    case 500:
                        throw new Error(json.message);
                }
            }

            throw new Error("RPC Request Failed.");
        }

        return json as GetFeaturedResponse;
    }



    async getUserInfo(request: GetUserInfoRequest): Promise<GetUserInfoResponse> {
        const response = await fetch(`${this.base_url}/getUserInfo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });

        const json = await response.json();

        if (!response.ok) {
            if (isAPIError(json)) {
                switch (response.status) {
                    case 400:
                        throw new APIError(json.message, json.code);
                    case 500:
                        throw new Error(json.message);
                }
            }

            throw new Error("RPC Request Failed.");
        }

        return json as GetUserInfoResponse;
    }



    async setUserProfile(request: SetUserProfileRequest): Promise<SetUserProfileResponse> {
        const response = await fetch(`${this.base_url}/setUserProfile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(request)
        });

        const json = await response.json();

        if (!response.ok) {
            if (isAPIError(json)) {
                switch (response.status) {
                    case 400:
                        throw new APIError(json.message, json.code);
                    case 500:
                        throw new Error(json.message);
                }
            }

            throw new Error("RPC Request Failed.");
        }

        return json as SetUserProfileResponse;
    }
}

export const brainwavesAPI = new BrainwavesClient('api');
