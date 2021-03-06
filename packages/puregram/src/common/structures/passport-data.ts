import { inspectable } from 'inspectable';

import { TelegramPassportData, TelegramEncryptedPassportElementUnion } from '../../interfaces';
import { EncryptedPassportElement } from './encrypted-passport-element';
import { EncryptedCredentials } from './encrypted-credentials';

/**
 * Contains information about Telegram Passport data shared with the bot by the
 * user.
 */
export class PassportData {
  private payload: TelegramPassportData;

  constructor(payload: TelegramPassportData) {
    this.payload = payload;
  }

  public get [Symbol.toStringTag](): string {
    return this.constructor.name;
  }

  /**
   * Array with information about documents and other Telegram Passport
   * elements that was shared with the bot
   */
  public get data(): EncryptedPassportElement[] {
    const { data } = this.payload;

    if (!data) return [];

    return data.map(
      (element: TelegramEncryptedPassportElementUnion) => (
        new EncryptedPassportElement(element)
      )
    );
  }

  /** Encrypted credentials required to decrypt the data */
  public get credentials(): EncryptedCredentials {
    return new EncryptedCredentials(this.payload.credentials);
  }
}

inspectable(PassportData, {
  serialize(passport: PassportData) {
    return {
      data: passport.data,
      credentials: passport.credentials
    };
  }
});
