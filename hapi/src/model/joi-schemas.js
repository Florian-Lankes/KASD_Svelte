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
        isAdmin: Joi.boolean().required().example("true"),
    }).label("UserDetails");

export const UserSpecPlus = UserSpec
    .keys({
        _id: IdSpec,
        __v: Joi.number(),
    }).label("UserDetailsPlus");

export const UserArray = Joi.array().items(UserSpecPlus).label("UserArray");


export const image = Joi.string().optional().example("").allow("");
// PlacemarkSpec for addPlacemark that the latitude and longitude are seperate
export const PlacemarkSpec = Joi.object()
    .keys({
        name: Joi.string().required().example("Steinerne Brücke"),
        description: Joi.string().required().example("Stone bridge built in 1100s featuring 16 arches spanning 300m over the Danube River."),
        latitude: Joi.number().min(-90).max(90).example(49.022676838235945),
        longitude: Joi.number().min(-180).max(180).example(12.097234021044144),
        category: Joi.string().required().example("footbridge"),
        createdById: IdSpec,
        image: Joi.array().optional().example("").allow("").items(image),
    })
    .label("PlacemarkPayload")


export const PlacemarkSpecReal = Joi.object()
    .keys({
        name: Joi.string().required().example("Steinerne Brücke"),
        category: Joi.string().required().example("footbridge"),
        description: Joi.string().required().example("Stone bridge built in 1100s featuring 16 arches spanning 300m over the Danube River."),
        image: Joi.array().optional().example("").allow("").items(image),
        location: {
            latitude: Joi.number().min(-90).max(90).example(49.022676838235945),
            longitude: Joi.number().min(-180).max(180).example(12.097234021044144),
        },
        createdById: IdSpec,
    })
    .label("PlacemarkReal")


export const PlacemarkSpecPlus = PlacemarkSpecReal.keys({
    _id: IdSpec,
    __v: Joi.number(),
}).label("PlacemarkPlus");

export const PlacemarkArraySpec = Joi.array().items(PlacemarkSpecPlus).label("PlacemarkArray");




export const PlacemarkIdArray = Joi.array().items(IdSpec).label("PlacemarkIdArray");
export const GroupCredentialsSpec = Joi.object()
    .keys({
        title: Joi.string().required().example("Want to visit")
    })
    .label("GroupCredentials");

export const GroupSpec = GroupCredentialsSpec
    .keys({
        userId: IdSpec,
        arrayOfPlacemarkIds: PlacemarkIdArray
    }).label("GroupDetails");

export const GroupSpecPlus = GroupSpec
    .keys({
        _id: IdSpec,
        __v: Joi.number(),
        $__: Joi.object(),
        $isNew: Joi.boolean(),
        _doc: Joi.object(),
    }).label("GroupDetailsPlus");

export const GroupArraySpec = Joi.array().items(GroupSpecPlus).label("GroupArray");


export const JwtAuth = Joi.object() //needed later for jwt
    .keys({
        success: Joi.boolean().example("true").required(),
        token: Joi.string().example("eyJhbGciOiJND.g5YmJisIjoiaGYwNTNjAOhE.gCWGmY5-YigQw0DCBo").required(),
        userId: IdSpec,
    })
    .label("JwtAuth");