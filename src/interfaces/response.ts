export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface Response<T> {
  data: T;
}

export interface ListResponse<T> {
  data: T[];
}

export interface ErrorResponse {
  error: string;
  message: string;
  status: number;
  details?: string;
}

export const UsernameNotUniqueErrorResponse = {
  error: "INVALID_REQUEST",
  message: "이미 사용중인 사용자 이름입니다.",
  status: 400,
};

export const InvalidIdErrorResponse: ErrorResponse = {
  error: "INVALID_ID",
  message: "잘못된 ID 형식입니다.",
  status: 400,
};

export const InvalidRequestErrorResponse = (
  propertyName?: string
): ErrorResponse => ({
  error: "INVALID_REQUEST",
  message: propertyName
    ? `${propertyName} 값이 올바르지 않습니다.`
    : "입력값이 올바르지 않습니다.",
  status: 400,
});

export const NoRequiredFieldErrorResponse = (
  fields: string[]
): ErrorResponse => ({
  error: "INVALID_REQUEST",
  message: `${fields.join(", ")}는 필수 입력 항목입니다.`,
  status: 400,
});

export const NotFoundErrorResponse = (field?: string): ErrorResponse => ({
  error: "NOT_FOUND",
  message: `${field || "데이터"}를 찾을 수 없습니다.`,
  status: 404,
});

export const ServerErrorResponse: ErrorResponse = {
  error: "SERVER_ERROR",
  message: "서버에서 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.",
  status: 500,
};

export const UnauthorizedErrorResponse: ErrorResponse = {
  error: "UNAUTHORIZED",
  message: "인증되지 않은 사용자입니다.",
  status: 401,
};

export const ForbiddenErrorResponse: ErrorResponse = {
  error: "FORBIDDEN",
  message: "권한이 없습니다.",
  status: 403,
};

export const RetrieveErrorResponse: ErrorResponse = {
  error: "RETRIEVE_ERROR",
  message: "데이터 조회 중 문제가 발생했습니다.",
  status: 500,
};

export const CreateErrorResponse: ErrorResponse = {
  error: "CREATE_ERROR",
  message: "데이터 생성 중 문제가 발생했습니다.",
  status: 500,
};

export const UpdateErrorResponse: ErrorResponse = {
  error: "UPDATE_ERROR",
  message: "데이터 수정 중 문제가 발생했습니다.",
  status: 500,
};

export const DeleteErrorResponse: ErrorResponse = {
  error: "DELETE_ERROR",
  message: "데이터 삭제 중 문제가 발생했습니다.",
  status: 500,
};

export const UserNotFoundErrorResponse: ErrorResponse = {
  error: "LOGIN_ERROR",
  message: "사용자를 찾을 수 없습니다.",
  details: "사용자 이름 또는 비밀번호를 확인해주세요.",
  status: 404,
};

export const SuccessfullyDeletedResponse: Response<{ message: string }> = {
  data: { message: "성공적으로 삭제되었습니다." },
};
