import { inspectable } from 'inspectable';

import { Attachment } from './attachment';
import { TelegramAttachment } from '../../interfaces';
import { AttachmentType } from '../../types';

export interface DefaultAttachment {
  file_id: string;

  file_unique_id: string;
}

/** Attachment with `fileId` and `fileUniqueId` properties */
export class FileAttachment<
  T extends TelegramAttachment = DefaultAttachment
> extends Attachment {
  protected payload: T;

  public attachmentType?: AttachmentType;

  constructor(payload: T) {
    super();

    this.payload = payload;
  }

  /**
   * Identifier for this file, which can be used to download or reuse the file
   */
  public get fileId(): string {
    return this.payload.file_id;
  }

  /**
   * Unique identifier for this file, which is supposed to be the same over
   * time and for different bots. Can't be used to download or reuse the file.
   */
  public get fileUniqueId(): string {
    return this.payload.file_unique_id;
  }
}

inspectable(FileAttachment, {
  serialize(attachment: FileAttachment) {
    return {
      fileId: attachment.fileId,
      fileUniqueId: attachment.fileUniqueId
    };
  }
});
