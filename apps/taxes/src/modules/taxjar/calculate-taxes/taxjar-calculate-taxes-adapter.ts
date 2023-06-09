import { TaxBaseFragment } from "../../../../generated/graphql";
import { ChannelConfig } from "../../channels-configuration/channels-config";
import { CalculateTaxesResponse } from "../../taxes/tax-provider-webhook";
import { FetchTaxForOrderArgs, TaxJarClient } from "../taxjar-client";
import { TaxJarConfig } from "../taxjar-config";
import { WebhookAdapter } from "../../taxes/tax-webhook-adapter";
import { TaxJarCalculateTaxesPayloadTransformer } from "./taxjar-calculate-taxes-payload-transformer";
import { TaxJarCalculateTaxesResponseTransformer } from "./taxjar-calculate-taxes-response-transformer";
import { Logger, createLogger } from "../../../lib/logger";

export type Payload = {
  taxBase: TaxBaseFragment;
  channelConfig: ChannelConfig;
};

export type Target = FetchTaxForOrderArgs;
export type Response = CalculateTaxesResponse;

export class TaxJarCalculateTaxesAdapter implements WebhookAdapter<Payload, Response> {
  private logger: Logger;
  constructor(private readonly config: TaxJarConfig) {
    this.logger = createLogger({ service: "TaxJarCalculateTaxesAdapter" });
  }

  async send(payload: Payload): Promise<Response> {
    this.logger.debug({ payload }, "send called with:");
    const payloadTransformer = new TaxJarCalculateTaxesPayloadTransformer();
    const target = payloadTransformer.transform(payload);

    this.logger.debug({ transformedPayload: target }, "Will call fetchTaxForOrder with:");

    const client = new TaxJarClient(this.config);
    const response = await client.fetchTaxForOrder(target);

    this.logger.debug({ response }, "TaxJar fetchTaxForOrder response:");

    const responseTransformer = new TaxJarCalculateTaxesResponseTransformer();
    const transformedResponse = responseTransformer.transform(payload, response);

    this.logger.debug({ transformedResponse }, "Transformed TaxJar fetchTaxForOrder response to:");

    return transformedResponse;
  }
}
