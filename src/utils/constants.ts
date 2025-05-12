export const ROLES = {
    USER: 'USER',
    ADMIN: 'ADMIN',
    OWNER: 'OWNER'
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];

// TODO: define categories
export const CATEGORIES = {
    CAFE: 'CAFE',
    CHINESE: 'CHINESE',
    SOUTH_EAST_ASIAN: 'SOUTH_EAST_ASIAN',
    JAPANESE: 'JAPANESE',
    MEXICAN: 'MEXICAN',
    ITALIAN: 'ITALIAN',
    INDIAN: 'INDIAN',
    KOREAN: 'KOREAN',
    FAST_FOOD: 'FAST_FOOD',
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
    UNAUTHORIZED = 4004,

    // user
    USER_NOT_FOUND = 4101,
    USER_ALREADY_EXISTS = 4102,
    USER_CREATION_FAILED = 4103,
    USER_UPDATE_FAILED = 4104,
    USER_DELETION_FAILED = 4105,
    GET_ALL_USERS_FAILED = 4106,

    // restaurant
    GET_ALL_RESTAURANTS_FAILED = 4201,
    GET_RESTAURANT_BY_ID_FAILED = 4202,
    RESTAURANT_NOT_FOUND = 4203,
    RESTAURANT_ALREADY_EXISTS = 4204,
    RESTAURANT_CREATION_FAILED = 4205,
    RESTAURANT_UPDATE_FAILED = 4206,
    RESTAURANT_DELETION_FAILED = 4207,

    // review
    GET_ALL_REVIEWS_FAILED = 4301,
    REVIEW_NOT_FOUND = 4302,
    REVIEW_CREATION_FAILED = 4304,
    REVIEW_UPDATE_FAILED = 4305,
    REVIEW_DELETION_FAILED = 4306,
    REVIEW_REPLY_FAILED = 4307,
    GET_REVIEW_BY_RESTAURANT_FAILED = 4308,
    GET_REVIEW_BY_ID_FAILED = 4309,

    // like review
    LIKE_REVIEW_FAILED = 4401,
    UNLIKE_REVIEW_FAILED = 4402,

    // fav restaurant
    FAV_RESTAURANT_FAILED = 4501,
    UNFAV_RESTAURANT_FAILED = 4502,

    // reply
    REPLY_NOT_FOUND = 4601,
    REPLY_ALREADY_EXISTS = 4602,
    REPLY_CREATION_FAILED = 4603,
    REPLY_UPDATE_FAILED = 4604,
    REPLY_DELETION_FAILED = 4605,
}

export const ErrorMessages = {
    [ResponseCode.SUCCESS]: 'Success',

    // auth
    [ResponseCode.LOGIN_FAILED]: 'Login failed',
    [ResponseCode.TOKEN_REFRESH_FAILED]: 'Token refresh failed',
    [ResponseCode.LOGOUT_FAILED]: 'Logout failed',
    [ResponseCode.UNAUTHORIZED]: 'Unauthorized',
    // user
    [ResponseCode.USER_NOT_FOUND]: 'User not found',
    [ResponseCode.USER_ALREADY_EXISTS]: 'User already exists',
    [ResponseCode.USER_CREATION_FAILED]: 'User creation failed',
    [ResponseCode.USER_UPDATE_FAILED]: 'User update failed',
    [ResponseCode.USER_DELETION_FAILED]: 'User deletion failed',
    [ResponseCode.GET_ALL_USERS_FAILED]: 'Get all users failed',

    // restaurant
    [ResponseCode.GET_ALL_RESTAURANTS_FAILED]: 'Get all restaurants failed',
    [ResponseCode.GET_RESTAURANT_BY_ID_FAILED]: 'Get restaurant by id failed',
    [ResponseCode.RESTAURANT_NOT_FOUND]: 'Restaurant not found',    
    [ResponseCode.RESTAURANT_ALREADY_EXISTS]: 'Restaurant already exists',
    [ResponseCode.RESTAURANT_CREATION_FAILED]: 'Restaurant creation failed',
    [ResponseCode.RESTAURANT_UPDATE_FAILED]: 'Restaurant update failed',
    [ResponseCode.RESTAURANT_DELETION_FAILED]: 'Restaurant deletion failed',

    // review
    [ResponseCode.GET_ALL_REVIEWS_FAILED]: 'Get all reviews failed',
    [ResponseCode.GET_REVIEW_BY_RESTAURANT_FAILED]: 'Get review by restaurant id failed',
    [ResponseCode.GET_REVIEW_BY_ID_FAILED]: 'Get review by id failed',
    [ResponseCode.REVIEW_NOT_FOUND]: 'Review not found',
    [ResponseCode.REVIEW_CREATION_FAILED]: 'Review creation failed',
    [ResponseCode.REVIEW_UPDATE_FAILED]: 'Review update failed',
    [ResponseCode.REVIEW_DELETION_FAILED]: 'Review deletion failed',

    // like review
    [ResponseCode.LIKE_REVIEW_FAILED]: 'Like review failed',
    [ResponseCode.UNLIKE_REVIEW_FAILED]: 'Unlike review failed',

    // fav restaurant
    [ResponseCode.FAV_RESTAURANT_FAILED]: 'Fav restaurant failed',
    [ResponseCode.UNFAV_RESTAURANT_FAILED]: 'Unfav restaurant failed',

    // reply
    [ResponseCode.REPLY_NOT_FOUND]: 'Reply not found',
    [ResponseCode.REPLY_ALREADY_EXISTS]: 'Reply already exists',
    [ResponseCode.REPLY_CREATION_FAILED]: 'Reply creation failed',
}