import {
  Telegram,
  InlineKeyboard,
  InlineKeyboardBuilder,
  Keyboard,
  KeyboardBuilder,
  RemoveKeyboard,
  ForceReply
} from 'puregram';

import { HearManager } from '@puregram/hear';

const telegram = new Telegram({
  token: process.env.TOKEN
});

const hearManager = new HearManager();

telegram.updates.on('message', hearManager.middleware);

hearManager.onFallback(
  (context) => (
    context.send(
      'There are six commands: ' +
      '/keyboard, ' +
      '/keyboardbuilder, ' +
      '/inlinekeyboard, ' +
      '/inlinekeyboardbuilder, ' +
      '/removekeyboard ' +
      'and /forcereply.'
    )
  )
);

hearManager.hear(/^\/keyboard$/i, (context) => {
  const keyboard = Keyboard.keyboard([
    [
      Keyboard.textButton('Some button')
    ],

    [
      Keyboard.textButton('Two buttons'),
      Keyboard.textButton('In one row')
    ]
  ]).resize(); // keyboard will be much smaller

  return context.send('Using `Keyboard`', {
    reply_markup: keyboard,
    parse_mode: 'Markdown'
  });
});

hearManager.hear(/^\/keyboardbuilder$/i, (context) => {
  const keyboard = new KeyboardBuilder()
    .textButton('Some button')
    .row()
    .textButton('Two buttons')
    .textButton('In one row')
    .resize();

  return context.send('Using `KeyboardBuilder`', {
    reply_markup: keyboard,
    parse_mode: 'Markdown'
  });
});

hearManager.hear(/^\/inlinekeyboard$/i, (context) => {
  const keyboard = InlineKeyboard.keyboard([
    [
      InlineKeyboard.textButton({
        text: 'Some button',
        payload: 'Some payload'
      })
    ],

    [
      InlineKeyboard.textButton({
        text: 'Two buttons',
        payload: { objectPayload: true }
      }),

      InlineKeyboard.textButton({
        text: 'In one row',
        payload: 'Payload is required'
      })
    ]
  ]);

  return context.send('Using `InlineKeyboard`', {
    reply_markup: keyboard,
    parse_mode: 'Markdown'
  });
});

hearManager.hear(/^\/inlinekeyboardbuilder$/i, (context) => {
  const keyboard = new InlineKeyboardBuilder()
    .textButton({
      text: 'Some button',
      payload: 'Some payload'
    })
    .row()
    .textButton({
      text: 'Two buttons',
      payload: { objectPayload: true }
    })
    .textButton({
      text: 'In one row',
      payload: 'Payload is required'
    });

  return context.send('Using `InlineKeyboardBuilder`', {
    reply_markup: keyboard,
    parse_mode: 'Markdown'
  });
});

hearManager.hear(/^\/removekeyboard$/i, (context) => {
  const keyboard = new RemoveKeyboard();

  return context.send('Removing keyboard...', {
    reply_markup: keyboard
  });
});

hearManager.hear(/^\/forcereply$/i, (context) => {
  const keyboard = new ForceReply();

  return context.send('Doing a force reply...', {
    reply_markup: keyboard
  });
});

telegram.updates.startPolling().then(
  () => console.log(`Bot @${telegram.bot.username} started polling`)
).catch(console.error);
