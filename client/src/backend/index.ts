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

export interface Assessment {
    id: string;
    title: string;
    description?: string;
    courseId: string;
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

export interface Course {
    id: string;
    name: string;
    code?: string;
    description?: string;
    imageURL?: string;
    createdBy: User;
    createdAt: number;
}

export interface UserStats {
    coursesInProgress: number;
    coursesCompleted: number;
    tasksFinished: number;
}

export interface UserSevenDayActivity {
    activities: number[];
}

export interface CourseMembership {
    courseId: string;
    role: string;
}

export interface Forum {
    id: string;
    courseID: string;
    name: string;
}

export interface Thread {
    id: string;
    forumID: string;
    createdBy: User;
    createdAt: number;
    updatedAt: number;
    deletedAt?: number;
    title: string;
    posts: Post[];
}

export interface Post {
    id: string;
    threadID: string;
    createdBy: User;
    createdAt: number;
    updatedAt: number;
    deletedAt?: number;
    content: object;
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
}

// GetUserInfoResponse is the response that is sent to the getUserInfo endpoint.
export interface GetUserInfoResponse {
    user: User;
}

// SetUserProfileRequest is the request that is sent to the setUserProfile endpoint.
export interface SetUserProfileRequest {
    user: User;
}

// SetUserProfileResponse is the response that is sent to the setUserProfile endpoint.
export interface SetUserProfileResponse {

}

// CreateAssessmentRequest is the request that is sent to the createAssessment endpoint.
export interface CreateAssessmentRequest {
    title: string;
    description?: string;
    courseId: string;
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

// SubmitAssignmentRequest is the request that is sent to the submitAssignment endpoint.
export interface SubmitAssignmentRequest {
    assessmentId: string;
    studentId: string;
    fileUrl: string;
}

// SubmitAssignmentResponse is the response that is sent to the submitAssignment endpoint.
export interface SubmitAssignmentResponse {
    submission: Submission;
}

// CreateQuestionRequest is the request that is sent to the createQuestion endpoint.
export interface CreateQuestionRequest {
    assessmentId: string;
    title: string;
    type: string;
    options?: string;
    points: number;
}

// CreateQuestionResponse is the response that is sent to the createQuestion endpoint.
export interface CreateQuestionResponse {
    question: Question;
}

// FetchAssessmentDetailsRequest is the request that is sent to the fetchAssessmentDetails endpoint.
export interface FetchAssessmentDetailsRequest {
    assessmentId: string;
}

// FetchAssessmentDetailsResponse is the response that is sent to the fetchAssessmentDetails endpoint.
export interface FetchAssessmentDetailsResponse {
    assessment: Assessment;
}

// FetchUserStatsRequest is the request that is sent to the fetchUserStats endpoint.
export interface FetchUserStatsRequest {

}

// FetchUserStatsResponse is the response that is sent to the fetchUserStats endpoint.
export interface FetchUserStatsResponse {
    stats: UserStats;
}

// FetchUserSevenDayActivityRequest is the request that is sent to the fetchUserSevenDayActivity endpoint.
export interface FetchUserSevenDayActivityRequest {

}

// FetchUserSevenDayActivityResponse is the response that is sent to the fetchUserSevenDayActivity endpoint.
export interface FetchUserSevenDayActivityResponse {
    activity: UserSevenDayActivity;
}

// CreateCourseRequest is the request that is sent to the createCourse endpoint.
export interface CreateCourseRequest {
    name: string;
    description: string;
    code?: string;
    imageURL?: string;
}

// CreateCourseResponse is the response that is sent to the createCourse endpoint.
export interface CreateCourseResponse {
    course: Course;
}

// GetCoursesRequest is the request that is sent to the getCourses endpoint.
export interface GetCoursesRequest {
    courseIds: string[];
}

// GetCoursesResponse is the response that is sent to the getCourses endpoint.
export interface GetCoursesResponse {
    courses: Course[];
}

// GetUserCoursesRequest is the request that is sent to the getUserCourses endpoint.
export interface GetUserCoursesRequest {

}

// GetUserCoursesResponse is the response that is sent to the getUserCourses endpoint.
export interface GetUserCoursesResponse {
    courses: Course[];
    memberships: CourseMembership[];
}

// CreateCourseInvitationRequest is the request that is sent to the createCourseInvitation endpoint.
export interface CreateCourseInvitationRequest {
    courseId: string;
    role: string;
}

// CreateCourseInvitationResponse is the response that is sent to the createCourseInvitation endpoint.
export interface CreateCourseInvitationResponse {
    code: string;
}

// JoinCourseRequest is the request that is sent to the joinCourse endpoint.
export interface JoinCourseRequest {
    code: string;
}

// JoinCourseResponse is the response that is sent to the joinCourse endpoint.
export interface JoinCourseResponse {
    course: Course;
}

// LeaveCourseRequest is the request that is sent to the leaveCourse endpoint.
export interface LeaveCourseRequest {
    courseId: string;
}

// LeaveCourseResponse is the response that is sent to the leaveCourse endpoint.
export interface LeaveCourseResponse {

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



    async createAssessment(request: CreateAssessmentRequest): Promise<CreateAssessmentResponse> {
        const response = await fetch(`${this.base_url}/createAssessment`, {
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

        return json as CreateAssessmentResponse;
    }



    async submitAnswers(request: SubmitAnswersRequest): Promise<SubmitAnswersResponse> {
        const response = await fetch(`${this.base_url}/submitAnswers`, {
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

        return json as SubmitAnswersResponse;
    }



    async submitAssignment(request: SubmitAssignmentRequest): Promise<SubmitAssignmentResponse> {
        const response = await fetch(`${this.base_url}/submitAssignment`, {
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

        return json as SubmitAssignmentResponse;
    }



    async createQuestion(request: CreateQuestionRequest): Promise<CreateQuestionResponse> {
        const response = await fetch(`${this.base_url}/createQuestion`, {
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

        return json as CreateQuestionResponse;
    }



    async fetchAssessmentDetails(request: FetchAssessmentDetailsRequest): Promise<FetchAssessmentDetailsResponse> {
        const response = await fetch(`${this.base_url}/fetchAssessmentDetails`, {
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

        return json as FetchAssessmentDetailsResponse;
    }



    async fetchUserStats(request: FetchUserStatsRequest): Promise<FetchUserStatsResponse> {
        const response = await fetch(`${this.base_url}/fetchUserStats`, {
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

        return json as FetchUserStatsResponse;
    }



    async fetchUserSevenDayActivity(request: FetchUserSevenDayActivityRequest): Promise<FetchUserSevenDayActivityResponse> {
        const response = await fetch(`${this.base_url}/fetchUserSevenDayActivity`, {
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

        return json as FetchUserSevenDayActivityResponse;
    }



    async createCourse(request: CreateCourseRequest): Promise<CreateCourseResponse> {
        const response = await fetch(`${this.base_url}/createCourse`, {
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

        return json as CreateCourseResponse;
    }



    async getCourses(request: GetCoursesRequest): Promise<GetCoursesResponse> {
        const response = await fetch(`${this.base_url}/getCourses`, {
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

        return json as GetCoursesResponse;
    }



    async getUserCourses(request: GetUserCoursesRequest): Promise<GetUserCoursesResponse> {
        const response = await fetch(`${this.base_url}/getUserCourses`, {
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

        return json as GetUserCoursesResponse;
    }



    async createCourseInvitation(request: CreateCourseInvitationRequest): Promise<CreateCourseInvitationResponse> {
        const response = await fetch(`${this.base_url}/createCourseInvitation`, {
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

        return json as CreateCourseInvitationResponse;
    }



    async joinCourse(request: JoinCourseRequest): Promise<JoinCourseResponse> {
        const response = await fetch(`${this.base_url}/joinCourse`, {
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

        return json as JoinCourseResponse;
    }



    async leaveCourse(request: LeaveCourseRequest): Promise<LeaveCourseResponse> {
        const response = await fetch(`${this.base_url}/leaveCourse`, {
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

        return json as LeaveCourseResponse;
    }
}

export const brainwavesAPI = new BrainwavesClient('/api');
