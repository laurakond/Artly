import { rest } from "msw";

const baseURL = "https://artly-api-a39d790259f4.herokuapp.com/";

export const handlers = [
  rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
    return res(
      ctx.json({
        pk: 3,
        username: "LauraK",
        email: "",
        first_name: "",
        last_name: "",
        profile_id: 3,
        profile_image:
          "https://res.cloudinary.com/dj9vdxwmb/image/upload/v1/media/images/IMG_8561_dcpqal",
      })
    );
  }),
  rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];
