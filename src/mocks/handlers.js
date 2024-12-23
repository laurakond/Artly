import { rest } from "msw";

const baseURL = "https://artly-api-a39d790259f4.herokuapp.com/";

export const handlers = [
    rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
        return rest(
        ctx.json({
            pk: 2,
            username: "testuser",
            email: "",
            first_name: "",
            last_name: "",
        })
        );
    }),
    rest.post(`${baseURL}dj-rest-auth/user/logout/`, (req, res, ctx)=>{
        return res(ctx.status(200));
    })
];
