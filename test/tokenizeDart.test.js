import {
  initialLineState,
  tokenizeLine,
  TokenType,
  TokenMap,
} from '../src/tokenizeDart.js'

const DEBUG = true

const expectTokenize = (text, state = initialLineState.state) => {
  const lineState = {
    state,
  }
  const tokens = []
  const lines = text.split('\n')
  for (let i = 0; i < lines.length; i++) {
    const result = tokenizeLine(lines[i], lineState)
    lineState.state = result.state
    tokens.push(...result.tokens.map((token) => token.type))
    tokens.push(TokenType.NewLine)
  }
  tokens.pop()
  return {
    toEqual(...expectedTokens) {
      if (DEBUG) {
        expect(tokens.map((token) => TokenMap[token])).toEqual(
          expectedTokens.map((token) => TokenMap[token])
        )
      } else {
        expect(tokens).toEqual(expectedTokens)
      }
    },
  }
}

test('empty', () => {
  expectTokenize(``).toEqual()
})

test('whitespace', () => {
  expectTokenize(' ').toEqual(TokenType.Whitespace)
})

test('keyword', () => {
  // see https://dart.dev/guides/language/language-tour#keywords
  expectTokenize('abstract').toEqual(TokenType.Keyword)
  expectTokenize('as').toEqual(TokenType.Keyword)
  expectTokenize('assert').toEqual(TokenType.Keyword)
  expectTokenize('async').toEqual(TokenType.Keyword)
  expectTokenize('await').toEqual(TokenType.Keyword)
  expectTokenize('break').toEqual(TokenType.Keyword)
  expectTokenize('case').toEqual(TokenType.Keyword)
  expectTokenize('catch').toEqual(TokenType.Keyword)
  expectTokenize('class').toEqual(TokenType.Keyword)
  expectTokenize('const').toEqual(TokenType.Keyword)
  expectTokenize('continue').toEqual(TokenType.Keyword)
  expectTokenize('covariant').toEqual(TokenType.Keyword)
  expectTokenize('default').toEqual(TokenType.Keyword)
  expectTokenize('deferred').toEqual(TokenType.Keyword)
  expectTokenize('do').toEqual(TokenType.Keyword)
  expectTokenize('dynamic').toEqual(TokenType.Keyword)
  expectTokenize('else').toEqual(TokenType.Keyword)
  expectTokenize('enum').toEqual(TokenType.Keyword)
  expectTokenize('export').toEqual(TokenType.Keyword)
  expectTokenize('extends').toEqual(TokenType.Keyword)
  expectTokenize('extension').toEqual(TokenType.Keyword)
  expectTokenize('external').toEqual(TokenType.Keyword)
  expectTokenize('factory').toEqual(TokenType.Keyword)
  expectTokenize('false').toEqual(TokenType.Keyword)
  expectTokenize('final').toEqual(TokenType.Keyword)
  expectTokenize('finally').toEqual(TokenType.Keyword)
  expectTokenize('for').toEqual(TokenType.Keyword)
  expectTokenize('Function').toEqual(TokenType.Keyword)
  expectTokenize('get').toEqual(TokenType.Keyword)
  expectTokenize('hide').toEqual(TokenType.Keyword)
  expectTokenize('if').toEqual(TokenType.Keyword)
  expectTokenize('implements').toEqual(TokenType.Keyword)
  expectTokenize('import').toEqual(TokenType.Keyword)
  expectTokenize('in').toEqual(TokenType.Keyword)
  expectTokenize('interface').toEqual(TokenType.Keyword)
  expectTokenize('is').toEqual(TokenType.Keyword)
  expectTokenize('late').toEqual(TokenType.Keyword)
  expectTokenize('library').toEqual(TokenType.Keyword)
  expectTokenize('mixin').toEqual(TokenType.Keyword)
  expectTokenize('new').toEqual(TokenType.Keyword)
  expectTokenize('null').toEqual(TokenType.Keyword)
  expectTokenize('on').toEqual(TokenType.Keyword)
  expectTokenize('operator').toEqual(TokenType.Keyword)
  expectTokenize('part').toEqual(TokenType.Keyword)
  expectTokenize('required').toEqual(TokenType.Keyword)
  expectTokenize('rethrow').toEqual(TokenType.Keyword)
  expectTokenize('return').toEqual(TokenType.Keyword)
  expectTokenize('set').toEqual(TokenType.Keyword)
  expectTokenize('show').toEqual(TokenType.Keyword)
  expectTokenize('static').toEqual(TokenType.Keyword)
  expectTokenize('super').toEqual(TokenType.Keyword)
  expectTokenize('switch').toEqual(TokenType.Keyword)
  expectTokenize('sync').toEqual(TokenType.Keyword)
  expectTokenize('this').toEqual(TokenType.Keyword)
  expectTokenize('throw').toEqual(TokenType.Keyword)
  expectTokenize('true').toEqual(TokenType.Keyword)
  expectTokenize('try').toEqual(TokenType.Keyword)
  expectTokenize('typedef').toEqual(TokenType.Keyword)
  expectTokenize('var').toEqual(TokenType.Keyword)
  expectTokenize('void').toEqual(TokenType.Keyword)
  expectTokenize('while').toEqual(TokenType.Keyword)
  expectTokenize('with').toEqual(TokenType.Keyword)
  expectTokenize('yield').toEqual(TokenType.Keyword)
})

test('single quoted string', () => {
  expectTokenize(`'Hello' abc`).toEqual(
    TokenType.Punctuation,
    TokenType.String,
    TokenType.Punctuation,
    TokenType.Whitespace,
    TokenType.VariableName
  )
})
