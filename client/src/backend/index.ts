// Generated by the RPC compiler.
// DO NOT EDIT.

//////////////////////////////
// Types defined in the types file
//////////////////////////////

export interface User {
    email: string;
    firstName: string;
    lastName: string;
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

// SendVerificationRequest is the request that is sent to the sendVerification endpoint.
export interface SendVerificationRequest {
    email: string;
    firstName: string;
    lastName: string;
}

// SendVerificationResponse is the response that is sent to the sendVerification endpoint.
export interface SendVerificationResponse {
    sent: boolean;
}

// RegisterRequest is the request that is sent to the register endpoint.
export interface RegisterRequest {
    email: string;
    password: string;
}

// RegisterResponse is the response that is sent to the register endpoint.
export interface RegisterResponse {
    user: User;
    token: Token;
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
    email: string;
    token: Token;
}

// GetUserInfoResponse is the response that is sent to the getUserInfo endpoint.
export interface GetUserInfoResponse {
    user: User;
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



    async sendVerification(request: SendVerificationRequest): Promise<SendVerificationResponse> {
        const response = await fetch(`${this.base_url}/sendVerification`, {
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

        return json as SendVerificationResponse;
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
}

export const brainwavesAPI = new BrainwavesClient('api');
