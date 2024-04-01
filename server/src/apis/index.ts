// Generated by the RPC compiler. DO NOT EDIT.


import { app } from "@/globals";
import { checkEmail } from "@/handlers/checkEmail";
import { createAssessment } from "@/handlers/createAssessment";
import { fetchAssessmentDetails } from "@/handlers/fetchAssessmentDetails";
import { getFeatured } from "@/handlers/getFeatured";
import { getUserInfo } from "@/handlers/getUserInfo";
import { login } from "@/handlers/login";
import { ping } from "@/handlers/ping";
import { register } from "@/handlers/register";
import { setUserProfile } from "@/handlers/setUserProfile";
import { submitAnswers } from "@/handlers/submitAnswers";
import { verifyEmail } from "@/handlers/verifyEmail";
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

export interface Assessment {
    id: string;
    title: string;
    description?: string;
    courseCode: string;
    startDate?: string;
    dueDate?: string;
    duration?: number;
    type: string;
    questions: Question[];
    submissions: Submission[];
}

export interface Question {
    id: string;
    assessmentId: string;
    title: string;
    type: string;
    options?: string;
    points: number;
}

export interface Submission {
    id: string;
    assessmentId: string;
    studentId: string;
    submittedAt?: string;
    fileUrl?: string;
    answers?: string;
    grade?: number;
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

// CreateAssessmentRequest is the request that is sent to the createAssessment endpoint.
export interface CreateAssessmentRequest {
    title: string;
    description?: string;
    courseCode: string;
    startDate?: string;
    dueDate?: string;
    duration?: number;
    type: string;
}

// CreateAssessmentResponse is the response that is sent to the createAssessment endpoint.
export interface CreateAssessmentResponse {
    assessment: Assessment;
}

// SubmitAnswersRequest is the request that is sent to the submitAnswers endpoint.
export interface SubmitAnswersRequest {
    assessmentId: string;
    studentId: string;
    answers: string;
}

// SubmitAnswersResponse is the response that is sent to the submitAnswers endpoint.
export interface SubmitAnswersResponse {
    submission: Submission;
}

// FetchAssessmentDetailsRequest is the request that is sent to the fetchAssessmentDetails endpoint.
export interface FetchAssessmentDetailsRequest {
    assessmentId: string;
}

// FetchAssessmentDetailsResponse is the response that is sent to the fetchAssessmentDetails endpoint.
export interface FetchAssessmentDetailsResponse {
    assessment: Assessment;
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

// ping is the endpoint handler for the ping endpoint.
// It wraps around the function at @/handlers/ping.
app.post('/api/ping', async (req, res) => {
    const request: PingRequest = req.body;
    try {
        const response: PingResponse = await ping(request);
        res.json(response);
    } catch (e) {
        if (e instanceof APIError) {
            res.status(400);
            res.json({ message: e.message, code: e.code, _rpc_error: true });
            return;
        } else {
            res.status(500);
            res.json({ message: "Internal server error", _rpc_error: true });
            console.error(`Error occurred while handling request ping with arguments ${ JSON.stringify(request) }: `, e);
            return;
        }
    }
});

// checkEmail is the endpoint handler for the checkEmail endpoint.
// It wraps around the function at @/handlers/checkEmail.
app.post('/api/checkEmail', async (req, res) => {
    const request: CheckEmailRequest = req.body;
    try {
        const response: CheckEmailResponse = await checkEmail(request);
        res.json(response);
    } catch (e) {
        if (e instanceof APIError) {
            res.status(400);
            res.json({ message: e.message, code: e.code, _rpc_error: true });
            return;
        } else {
            res.status(500);
            res.json({ message: "Internal server error", _rpc_error: true });
            console.error(`Error occurred while handling request checkEmail with arguments ${ JSON.stringify(request) }: `, e);
            return;
        }
    }
});

// register is the endpoint handler for the register endpoint.
// It wraps around the function at @/handlers/register.
app.post('/api/register', async (req, res) => {
    const request: RegisterRequest = req.body;
    try {
        const response: RegisterResponse = await register(request);
        res.json(response);
    } catch (e) {
        if (e instanceof APIError) {
            res.status(400);
            res.json({ message: e.message, code: e.code, _rpc_error: true });
            return;
        } else {
            res.status(500);
            res.json({ message: "Internal server error", _rpc_error: true });
            console.error(`Error occurred while handling request register with arguments ${ JSON.stringify(request) }: `, e);
            return;
        }
    }
});

// verifyEmail is the endpoint handler for the verifyEmail endpoint.
// It wraps around the function at @/handlers/verifyEmail.
app.post('/api/verifyEmail', async (req, res) => {
    const request: VerifyEmailRequest = req.body;
    try {
        const response: VerifyEmailResponse = await verifyEmail(request);
        res.json(response);
    } catch (e) {
        if (e instanceof APIError) {
            res.status(400);
            res.json({ message: e.message, code: e.code, _rpc_error: true });
            return;
        } else {
            res.status(500);
            res.json({ message: "Internal server error", _rpc_error: true });
            console.error(`Error occurred while handling request verifyEmail with arguments ${ JSON.stringify(request) }: `, e);
            return;
        }
    }
});

// login is the endpoint handler for the login endpoint.
// It wraps around the function at @/handlers/login.
app.post('/api/login', async (req, res) => {
    const request: LoginRequest = req.body;
    try {
        const response: LoginResponse = await login(request);
        res.json(response);
    } catch (e) {
        if (e instanceof APIError) {
            res.status(400);
            res.json({ message: e.message, code: e.code, _rpc_error: true });
            return;
        } else {
            res.status(500);
            res.json({ message: "Internal server error", _rpc_error: true });
            console.error(`Error occurred while handling request login with arguments ${ JSON.stringify(request) }: `, e);
            return;
        }
    }
});

// getFeatured is the endpoint handler for the getFeatured endpoint.
// It wraps around the function at @/handlers/getFeatured.
app.post('/api/getFeatured', async (req, res) => {
    const request: GetFeaturedRequest = req.body;
    try {
        const response: GetFeaturedResponse = await getFeatured(request);
        res.json(response);
    } catch (e) {
        if (e instanceof APIError) {
            res.status(400);
            res.json({ message: e.message, code: e.code, _rpc_error: true });
            return;
        } else {
            res.status(500);
            res.json({ message: "Internal server error", _rpc_error: true });
            console.error(`Error occurred while handling request getFeatured with arguments ${ JSON.stringify(request) }: `, e);
            return;
        }
    }
});

// getUserInfo is the endpoint handler for the getUserInfo endpoint.
// It wraps around the function at @/handlers/getUserInfo.
app.post('/api/getUserInfo', async (req, res) => {
    const request: GetUserInfoRequest = req.body;
    try {
        const response: GetUserInfoResponse = await getUserInfo(request);
        res.json(response);
    } catch (e) {
        if (e instanceof APIError) {
            res.status(400);
            res.json({ message: e.message, code: e.code, _rpc_error: true });
            return;
        } else {
            res.status(500);
            res.json({ message: "Internal server error", _rpc_error: true });
            console.error(`Error occurred while handling request getUserInfo with arguments ${ JSON.stringify(request) }: `, e);
            return;
        }
    }
});

// setUserProfile is the endpoint handler for the setUserProfile endpoint.
// It wraps around the function at @/handlers/setUserProfile.
app.post('/api/setUserProfile', async (req, res) => {
    const request: SetUserProfileRequest = req.body;
    try {
        const response: SetUserProfileResponse = await setUserProfile(request);
        res.json(response);
    } catch (e) {
        if (e instanceof APIError) {
            res.status(400);
            res.json({ message: e.message, code: e.code, _rpc_error: true });
            return;
        } else {
            res.status(500);
            res.json({ message: "Internal server error", _rpc_error: true });
            console.error(`Error occurred while handling request setUserProfile with arguments ${ JSON.stringify(request) }: `, e);
            return;
        }
    }
});

// createAssessment is the endpoint handler for the createAssessment endpoint.
// It wraps around the function at @/handlers/createAssessment.
app.post('/api/createAssessment', async (req, res) => {
    const request: CreateAssessmentRequest = req.body;
    try {
        const response: CreateAssessmentResponse = await createAssessment(request);
        res.json(response);
    } catch (e) {
        if (e instanceof APIError) {
            res.status(400);
            res.json({ message: e.message, code: e.code, _rpc_error: true });
            return;
        } else {
            res.status(500);
            res.json({ message: "Internal server error", _rpc_error: true });
            console.error(`Error occurred while handling request createAssessment with arguments ${ JSON.stringify(request) }: `, e);
            return;
        }
    }
});

// submitAnswers is the endpoint handler for the submitAnswers endpoint.
// It wraps around the function at @/handlers/submitAnswers.
app.post('/api/submitAnswers', async (req, res) => {
    const request: SubmitAnswersRequest = req.body;
    try {
        const response: SubmitAnswersResponse = await submitAnswers(request);
        res.json(response);
    } catch (e) {
        if (e instanceof APIError) {
            res.status(400);
            res.json({ message: e.message, code: e.code, _rpc_error: true });
            return;
        } else {
            res.status(500);
            res.json({ message: "Internal server error", _rpc_error: true });
            console.error(`Error occurred while handling request submitAnswers with arguments ${ JSON.stringify(request) }: `, e);
            return;
        }
    }
});

// fetchAssessmentDetails is the endpoint handler for the fetchAssessmentDetails endpoint.
// It wraps around the function at @/handlers/fetchAssessmentDetails.
app.post('/api/fetchAssessmentDetails', async (req, res) => {
    const request: FetchAssessmentDetailsRequest = req.body;
    try {
        const response: FetchAssessmentDetailsResponse = await fetchAssessmentDetails(request);
        res.json(response);
    } catch (e) {
        if (e instanceof APIError) {
            res.status(400);
            res.json({ message: e.message, code: e.code, _rpc_error: true });
            return;
        } else {
            res.status(500);
            res.json({ message: "Internal server error", _rpc_error: true });
            console.error(`Error occurred while handling request fetchAssessmentDetails with arguments ${ JSON.stringify(request) }: `, e);
            return;
        }
    }
});
