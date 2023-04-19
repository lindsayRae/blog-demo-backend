"use strict";

/**
 * post controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::post.post", ({ strapi }) => ({
  async find(ctx) {
    const { slug } = ctx.params; // Extract the slug from the request parameters
    const sanitizedQueryParams = await this.sanitizeQuery(ctx);
    const { results, pagination } = await strapi
      .service("api::post.post")
      .find({ ...sanitizedQueryParams, slug }); // Pass the slug as a filter to the `find` method
    const sanitizedResults = await this.sanitizeOutput(results, ctx);

    return this.transformResponse(sanitizedResults, { pagination });
  },

  //   async find(ctx) {
  //     const { id } = ctx.params;

  //     const results = await strapi.db.query("api::post.post").findOne({
  //       where: { slug: id },
  //     });
  //     const sanitizedResults = await this.sanitizeOutput(results, ctx);

  //     return this.transformResponse(sanitizedResults);
  //   },
}));
