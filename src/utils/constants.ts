export const ROLES = {
    USER: 'USER',
    ADMIN: 'ADMIN',
    OWNER: 'OWNER',
    GUEST: 'GUEST'
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];

// TODO: define categories
export const CATEGORIES = {
    CAFE: 'CAFE',
    RESTAURANT: 'RESTAURANT',
    BAR: 'BAR',
    PUB: 'PUB',
    OTHER: 'OTHER'
} as const; 

export type Category = typeof CATEGORIES[keyof typeof CATEGORIES];

export const CAMPUSES = {
    CAUFIELD: 'CAUFIELD',
    CLAYTON: 'CLAYTON',
    MALASIA: 'MALASIA',
    PARKVILLE: 'PARKVILLE',
    OTHER: 'OTHER'
} as const;

export type Campus = typeof CAMPUSES[keyof typeof CAMPUSES];

export const DAYS_OF_WEEK = {
    SUNDAY: 'SUNDAY',
    MONDAY: 'MONDAY',
    TUESDAY: 'TUESDAY',
    WEDNESDAY: 'WEDNESDAY',
    THURSDAY: 'THURSDAY',
    FRIDAY: 'FRIDAY',
    SATURDAY: 'SATURDAY'
} as const;

export type DayOfWeek = typeof DAYS_OF_WEEK[keyof typeof DAYS_OF_WEEK];

// TODO: define response code by different functions
export enum ResponseCode {
    SUCCESS = 2000,

    // auth
    LOGIN_FAILED = 4001,
    TOKEN_REFRESH_FAILED = 4002,
    LOGOUT_FAILED = 4003,

    // user
    USER_NOT_FOUND = 4101,
    USER_ALREADY_EXISTS = 4102,
    USER_CREATION_FAILED = 4103,
    USER_UPDATE_FAILED = 4104,
    USER_DELETION_FAILED = 4105,

    // restaurant
    RESTAURANT_NOT_FOUND = 4201,
    RESTAURANT_ALREADY_EXISTS = 4202,
    RESTAURANT_CREATION_FAILED = 4203,
    RESTAURANT_UPDATE_FAILED = 4204,
    RESTAURANT_DELETION_FAILED = 4205,

    // review
    REVIEW_NOT_FOUND = 4301,
    REVIEW_ALREADY_EXISTS = 4302,
    REVIEW_CREATION_FAILED = 4303,
    REVIEW_UPDATE_FAILED = 4304,
    REVIEW_DELETION_FAILED = 4305,

    // like review
    LIKE_REVIEW_NOT_FOUND = 4401,
    LIKE_REVIEW_ALREADY_EXISTS = 4402,
    LIKE_REVIEW_CREATION_FAILED = 4403,
    LIKE_REVIEW_DELETION_FAILED = 4404,

    // fav restaurant
    FAV_RESTAURANT_NOT_FOUND = 4501,
    FAV_RESTAURANT_ALREADY_EXISTS = 4502,
    FAV_RESTAURANT_CREATION_FAILED = 4503,
    FAV_RESTAURANT_DELETION_FAILED = 4504,

    // reply
    REPLY_NOT_FOUND = 4601,
    REPLY_ALREADY_EXISTS = 4602,
    REPLY_CREATION_FAILED = 4603,
    REPLY_UPDATE_FAILED = 4604,
    REPLY_DELETION_FAILED = 4605,
}

export const ErrorMessages = {
    [ResponseCode.SUCCESS]: 'Success',

    // login
    [ResponseCode.LOGIN_FAILED]: 'Login failed',
    [ResponseCode.TOKEN_REFRESH_FAILED]: 'Token refresh failed',
    [ResponseCode.LOGOUT_FAILED]: 'Logout failed',

    // user
    [ResponseCode.USER_NOT_FOUND]: 'User not found',
    [ResponseCode.USER_ALREADY_EXISTS]: 'User already exists',
    [ResponseCode.USER_CREATION_FAILED]: 'User creation failed',
    [ResponseCode.USER_UPDATE_FAILED]: 'User update failed',
    [ResponseCode.USER_DELETION_FAILED]: 'User deletion failed',

    // restaurant
    [ResponseCode.RESTAURANT_NOT_FOUND]: 'Restaurant not found',    
    [ResponseCode.RESTAURANT_ALREADY_EXISTS]: 'Restaurant already exists',
    [ResponseCode.RESTAURANT_CREATION_FAILED]: 'Restaurant creation failed',
    [ResponseCode.RESTAURANT_UPDATE_FAILED]: 'Restaurant update failed',
    [ResponseCode.RESTAURANT_DELETION_FAILED]: 'Restaurant deletion failed',

    // review
    [ResponseCode.REVIEW_NOT_FOUND]: 'Review not found',
    [ResponseCode.REVIEW_ALREADY_EXISTS]: 'Review already exists',
    [ResponseCode.REVIEW_CREATION_FAILED]: 'Review creation failed',
    [ResponseCode.REVIEW_UPDATE_FAILED]: 'Review update failed',
    [ResponseCode.REVIEW_DELETION_FAILED]: 'Review deletion failed',

    // like review
    [ResponseCode.LIKE_REVIEW_NOT_FOUND]: 'Like review not found',
    [ResponseCode.LIKE_REVIEW_ALREADY_EXISTS]: 'Like review already exists',
    [ResponseCode.LIKE_REVIEW_CREATION_FAILED]: 'Like review creation failed',
    [ResponseCode.LIKE_REVIEW_DELETION_FAILED]: 'Like review deletion failed',

    // fav restaurant
    [ResponseCode.FAV_RESTAURANT_NOT_FOUND]: 'Fav restaurant not found',
    [ResponseCode.FAV_RESTAURANT_ALREADY_EXISTS]: 'Fav restaurant already exists',
    [ResponseCode.FAV_RESTAURANT_CREATION_FAILED]: 'Fav restaurant creation failed',
}