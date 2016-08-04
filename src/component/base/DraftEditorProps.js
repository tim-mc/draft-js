/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule DraftEditorProps
 * @flow
 */

'use strict';

import type ContentBlock from 'ContentBlock';
import type {DraftBlockRenderMap} from 'DraftBlockRenderMap';
import type {DraftDragType} from 'DraftDragType';
import type {DraftEditorCommand} from 'DraftEditorCommand';
import type {DraftTextAlignment} from 'DraftTextAlignment';
import type {DraftInlineStyle} from 'DraftInlineStyle';
import type EditorState from 'EditorState';
import type SelectionState from 'SelectionState';

export type DraftEditorProps = {
  /**
   * The two most critical props are `editorState` and `onChange`.
   *
   * The `editorState` prop defines the entire state of the editor, while the
   * `onChange` prop is the method in which all state changes are propagated
   * upward to higher-level components.
   *
   * These props are analagous to `value` and `onChange` in controlled React
   * text inputs.
   */
  editorState: EditorState,
  onChange: (editorState: EditorState) => void,

  placeholder?: string,

  // Specify whether text alignment should be forced in a direction
  // regardless of input characters.
  textAlignment?: DraftTextAlignment,

  // For a given `ContentBlock` object, return an object that specifies
  // a custom block component and/or props. If no object is returned,
  // the default `TextEditorBlock` is used.
  blockRendererFn?: (block: ContentBlock) => ?Object,

  // Function that returns a cx map corresponding to block-level styles.
  blockStyleFn?: (type: number) => string,

  // A function that accepts a synthetic key event and returns
  // the matching DraftEditorCommand constant, or null if no command should
  // be invoked.
  keyBindingFn?: (e: SyntheticKeyboardEvent) => ?string,

  // Set whether the `DraftEditor` component should be editable. Useful for
  // temporarily disabling edit behavior or allowing `DraftEditor` rendering
  // to be used for consumption purposes.
  readOnly?: boolean,

  // Note: spellcheck is always disabled for IE. If enabled in Safari, OSX
  // autocorrect is enabled as well.
  spellCheck?: boolean,

  // Set whether to remove all style information from pasted content. If your
  // use case should not have any block or inline styles, it is recommended
  // that you set this to `true`.
  stripPastedStyles?: boolean,

  tabIndex?: number,

  ariaActiveDescendantID?: string,
  ariaAutoComplete?: string,
  ariaDescribedBy?: string,
  ariaExpanded?: boolean,
  ariaHasPopup?: boolean,
  ariaLabel?: string,
  ariaOwneeID?: string,

  webDriverTestID?: string,

  /**
   * Cancelable event handlers, handled from the top level down. A handler
   * that returns true will be the last handler to execute for that event.
   */

  // Useful for managing special behavior for pressing the `Return` key. E.g.
  // removing the style from an empty list item.
  handleReturn?: (e: SyntheticKeyboardEvent) => boolean,

  // Map a key command string provided by your key binding function to a
  // specified behavior.
  handleKeyCommand?: (command: DraftEditorCommand) => boolean,

  // Handle intended text insertion before the insertion occurs. This may be
  // useful in cases where the user has entered characters that you would like
  // to trigger some special behavior. E.g. immediately converting `:)` to an
  // emoji Unicode character, or replacing ASCII quote characters with smart
  // quotes.
  handleBeforeInput?: (chars: string) => boolean,

  handlePastedText?: (text: string, html?: string) => boolean,

  handlePastedFiles?: (files: Array<Blob>) => boolean,

  // Handle dropped files
  handleDroppedFiles?: (
    selection: SelectionState,
    files: Array<Blob>
  ) => boolean,

  // Handle other drops to prevent default text movement/insertion behaviour
  handleDrop?: (
    selection: SelectionState,
    dataTransfer: Object,
    isInternal: DraftDragType
  ) => boolean,

  allowNativeInsertion?: (chars: string) =>  boolean,

  /**
   * Non-cancelable event triggers.
   */
  onEscape?: (e: SyntheticKeyboardEvent) => void,
  onTab?: (e: SyntheticKeyboardEvent) => void,
  onUpArrow?: (e: SyntheticKeyboardEvent) => void,
  onDownArrow?: (e: SyntheticKeyboardEvent) => void,

  onBlur?: (e: SyntheticEvent) => void,
  onFocus?: (e: SyntheticEvent) => void,

  // Provide a map of inline style names corresponding to CSS style objects
  // that will be rendered for matching ranges.
  customStyleMap?: Object,

  // Provide a function that will construct CSS style objects given inline
  // style names.
  customStyleFn?: (style: DraftInlineStyle) => ?Object,

  // Provide a map of block rendering configurations. Each block type maps to
  // an element tag and an optional react element wrapper. This configuration
  // is used for both rendering and paste processing.
  blockRenderMap: DraftBlockRenderMap
};
