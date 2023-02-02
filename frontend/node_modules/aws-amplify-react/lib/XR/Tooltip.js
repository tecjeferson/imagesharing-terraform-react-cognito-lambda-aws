"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 *     http://aws.amazon.com/apache2.0/
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */
var React = __importStar(require("react"));
var ui_1 = require("@aws-amplify/ui");
exports.Tooltip = function (props) {
    var classes = "" + ui_1.tooltip;
    if (props.autoShowTooltip) {
        classes = ui_1.tooltip + " " + ui_1.autoShowTooltip;
    }
    return (React.createElement("div", { className: classes, "data-text": props.text }, props.children));
};
/**
 * @deprecated use named import
 */
exports.default = exports.Tooltip;
//# sourceMappingURL=Tooltip.js.map