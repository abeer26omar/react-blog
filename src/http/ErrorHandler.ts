export const handleApiError = (error: any): string => {
    let errorMessage = 'An error occurred';

    if (error.response) {
        const { status, data } = error.response;
        
        switch (status) {
            case 400:
                errorMessage = 'Bad request. Please check your input.';
                break;
            case 401:
                errorMessage = 'Unauthorized. Please log in.';
                break;
            case 404:
                errorMessage = 'Resource not found.';
                break;
            case 500:
                errorMessage = 'Internal server error. Please try again later.';
                break;
            default:
                errorMessage = `Error: ${status}`;
        }

        if (data && typeof data === 'string') {
            errorMessage += ` - ${data}`;
        }
    }

    return errorMessage;
};
