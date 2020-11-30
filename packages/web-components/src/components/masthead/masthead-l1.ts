/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, customElement, LitElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import StableSelectorMixin from '../../globals/mixins/stable-selector';
import styles from './masthead.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * Masthead.
 *
 * @element dds-masthead-l1
 * @slot brand - The left hand area.
 * @slot nav - The nav content.
 * @slot profile - The right hand area.
 */
@customElement(`${ddsPrefix}-masthead-l1`)
class DDSMastheadL1 extends StableSelectorMixin(LitElement) {
  render() {
    return html`
      <slot name="name"></slot>
      <slot></slot>
    `;
  }

  static get stableSelector() {
    return `${ddsPrefix}--masthead__l1`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default DDSMastheadL1;