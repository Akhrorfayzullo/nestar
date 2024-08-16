export enum Message {
	SOMETHING_WENT_WRONG = 'Something went wrong!',
	NO_DATA_FOUND = 'No data found!',
	CREATE_FAILED = 'Creation failed!',
	UPDATE_FAILED = 'Update failed!',
	REMOVE_FAILED = 'Removal failed!',
	UPLOAD_FAILED = 'Upload failed!',
	BAD_REQUEST = 'Bad Request!',

	NO_MEMBER_NICK = 'Member nickname is missing!',
	BLOCKED_USER = 'This user has been blocked!',
	WRONG_PASSWORD = 'Incorrect password, please try again!',
	NOT_AUTHENTICATED = 'Authentication required, please log in first!',
	TOKEN_NOT_PROVIDED = 'Bearer token is missing!',
	ROLES_ALLOWED_ONLY = 'Access restricted to specific roles!',
	NOT_ALLOWED_REQUEST = 'This request is not allowed!',
	ALLOWED_FORMATS_ONLY = 'Please upload images in jpg, jpeg, or png format!',
	SELF_SUBSCRIPTION_DENIED = 'Self-subscription is not permitted!',
}