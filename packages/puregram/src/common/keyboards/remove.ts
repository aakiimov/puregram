import { inspectable } from 'inspectable';

interface RemoveKeyboardJSON {
  remove_keyboard: true;

  selective: boolean;
}

/** Remove keyboard */
export class RemoveKeyboard {
  private isSelective: boolean = false;

  public selective(selective: boolean = true): this {
    this.isSelective = selective;

    return this;
  }

  public toJSON(): RemoveKeyboardJSON {
    return {
      remove_keyboard: true,
      selective: this.isSelective
    };
  }

  public toString(): string {
    return JSON.stringify(this);
  }
}

inspectable(RemoveKeyboard, {
  serialize(keyboard: RemoveKeyboard) {
    return keyboard.toJSON();
  }
});
