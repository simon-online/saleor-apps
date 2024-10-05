import { createLogger } from "../../../logger";
import { protectedClientProcedure } from "../../trpc/protected-client-procedure";
import { router } from "../../trpc/trpc-server";
import { avataxTaxCodeMatchSchema } from "./avatax-tax-code-match-repository";
import { AvataxTaxCodeMatchesService } from "./avatax-tax-code-matches.service";

const protectedWithAvataxTaxCodeMatchesService = protectedClientProcedure.use(({ next, ctx }) => {
  return next({
    ctx: {
      taxCodeMatchesService: AvataxTaxCodeMatchesService.createFromAuthData({
        saleorApiUrl: ctx.saleorApiUrl,
        token: ctx.appToken,
        appId: ctx.appId,
      }),
    },
  });
});

export const avataxTaxCodeMatchesRouter = router({
  getAll: protectedWithAvataxTaxCodeMatchesService.query(async ({ ctx }) => {
    const logger = createLogger("avataxTaxCodeMatchesRouter.fetch");

    logger.info("Returning tax code matches");

    return ctx.taxCodeMatchesService.getAll();
  }),
  upsert: protectedWithAvataxTaxCodeMatchesService
    .input(avataxTaxCodeMatchSchema)
    .mutation(async ({ ctx, input }) => {
      const logger = createLogger("avataxTaxCodeMatchesRouter.upsert");

      logger.info("Upserting tax code match");

      return ctx.taxCodeMatchesService.upsert(input);
    }),
});
