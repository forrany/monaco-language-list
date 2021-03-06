/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
'use strict';
import { registerLanguage } from '../_.contribution';
registerLanguage({
    id: 'twig',
    extensions: ['.twig'],
    aliases: ['Twig', 'twig'],
    mimetypes: ['text/x-twig'],
    loader: function () { return import('./twig'); }
});
