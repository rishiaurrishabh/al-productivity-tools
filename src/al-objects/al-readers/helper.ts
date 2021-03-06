import { IToken } from './tokenizer';
import { IReadContext } from './object-reader';

export class Helper {
  static tokensToString(tokens: Array<IToken>, keywords: any) {
    const buffer: Array<string> = [];
    tokens.forEach((token) => {
      if (keywords[token.value.toLocaleLowerCase()])
        buffer.push(keywords[token.value.toLocaleLowerCase()]);
      else buffer.push(token.value);
    });

    return buffer.join('');
  }

  static readWhiteSpaces(context: IReadContext, tokens: Array<IToken>) {
    while (
      context.pos < context.tokens.length &&
      context.tokens[context.pos].type === 'whitespace'
    ) {
      tokens.push(context.tokens[context.pos++]);
    }
  }

  static readAttribute(context: IReadContext, keywords: any): string {
    const tokens: Array<IToken> = [];

    let value = context.tokens[context.pos].value;
    if (value !== '[') return '';

    while (value !== ']') {
      tokens.push(context.tokens[context.pos]);
      value = context.tokens[++context.pos].value;
    }

    if (value !== ']') throw new Error('Invalid Attribute');
    tokens.push(context.tokens[context.pos]);
    context.pos++;
    Helper.readWhiteSpaces(context, []);

    return Helper.tokensToString(tokens, keywords);
  }

  static readComments(context: IReadContext): Array<string> {
    const comments: Array<string> = [];
    while (context.tokens[context.pos].type === 'comment') {
      comments.push(context.tokens[context.pos].value);
      context.pos++;
      Helper.readWhiteSpaces(context, []);
    }

    Helper.readWhiteSpaces(context, []);

    return comments;
  }

}
