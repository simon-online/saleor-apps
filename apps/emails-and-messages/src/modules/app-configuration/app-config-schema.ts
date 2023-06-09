// TODO: MIGRATION CODE FROM CONFIG VERSION V1. REMOVE THIS FILE AFTER MIGRATION

export interface AppConfigurationPerChannel {
  active: boolean;
  mjmlConfigurationId?: string;
  sendgridConfigurationId?: string;
}

export type AppConfigurationsChannelMap = Record<string, AppConfigurationPerChannel>;

export type AppConfig = {
  configurationsPerChannel: AppConfigurationsChannelMap;
};
