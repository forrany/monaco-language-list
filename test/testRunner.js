/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import '../monaco.contribution';
import { loadLanguage } from '../_.contribution';
import * as test from 'tape';
// Allow for running under nodejs/requirejs in tests
var _monaco = (typeof monaco === 'undefined' ? self.monaco : monaco);
export function testTokenization(_language, tests) {
    var languages;
    if (typeof _language === 'string') {
        languages = [_language];
    }
    else {
        languages = _language;
    }
    var mainLanguage = languages[0];
    test(mainLanguage + ' tokenization', function (t) {
        Promise.all(languages.map(function (l) { return loadLanguage(l); })).then(function () {
            // clean stack
            setTimeout(function () {
                runTests(t, mainLanguage, tests);
                t.end();
            });
        }).then(null, function () { return t.end(); });
    });
}
function runTests(t, languageId, tests) {
    tests.forEach(function (test) { return runTest(t, languageId, test); });
}
function runTest(t, languageId, test) {
    var text = test.map(function (t) { return t.line; }).join('\n');
    var actualTokens = _monaco.editor.tokenize(text, languageId);
    var actual = actualTokens.map(function (lineTokens, index) {
        return {
            line: test[index].line,
            tokens: lineTokens.map(function (t) {
                return {
                    startIndex: t.offset,
                    type: t.type
                };
            })
        };
    });
    t.deepEqual(actual, test);
}
