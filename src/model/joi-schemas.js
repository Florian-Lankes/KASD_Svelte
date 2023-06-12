import Joi from "joi";

export const IdSpec = Joi.alternatives().try(Joi.string(), Joi.object()).description("a valid ID");

export const UserCredentialsSpec = Joi.object()
    .keys({
        email: Joi.string().email().example("homer@simpson.com").required(),
        password: Joi.string().example("secret").required(),
    })
    .label("UserCredentials");

export const UserSpec = UserCredentialsSpec
    .keys({
        firstName: Joi.string().example("Homer").required(),
        lastName: Joi.string().example("Simpson").required(),
        username: Joi.string().example("HomerSimpson").optional(),
        isAdmin: Joi.boolean().default(false).required().example("true"),
    }).label("UserDetails");

export const UserSpecPlus = UserSpec
    .keys({
        _id: IdSpec,
        __v: Joi.number(),
    }).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");




export const PlacemarkSpec = Joi.object()
    .keys({
        name: Joi.string().required().example("Steinerne Brücke"),
        description: Joi.string().required().example("Stone bridge built in 1100s featuring 16 arches spanning 300m over the Danube River."),
        latitude: Joi.number().min(-90).max(90).example(49.022676838235945),
        longitude: Joi.number().min(-180).max(180).example(12.097234021044144),
        category: Joi.string().required().example("footbridge"),
        createdById: IdSpec,
        image: Joi.string().optional().example("").allow(""),
    })
    .label("PlacemarkPayload")


export const PlacemarkSpecReal = Joi.object()
    .keys({
        name: Joi.string().required().example("Steinerne Brücke"),
        description: Joi.string().required().example("Stone bridge built in 1100s featuring 16 arches spanning 300m over the Danube River."),
        location: {
            latitude: Joi.number().min(-90).max(90).example(49.022676838235945),
            longitude: Joi.number().min(-180).max(180).example(12.097234021044144),
        },
        category: Joi.string().required().example("footbridge"),
        createdById: IdSpec,
        image: Joi.string().optional().example("").allow(""),
    })
    .label("PlacemarkReal")


export const PlacemarkSpecPlus = PlacemarkSpecReal.keys({
    _id: IdSpec,
    __v: Joi.number(),
}).label("PlacemarkPlus");

export const PlacemarkArraySpec = Joi.array().items(PlacemarkSpecPlus).label("PlacemarkArray");




















export const JwtAuth = Joi.object() //needed later for jwt
    .keys({
        success: Joi.boolean().example("true").required(),
        token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
    })
    .label("JwtAuth");