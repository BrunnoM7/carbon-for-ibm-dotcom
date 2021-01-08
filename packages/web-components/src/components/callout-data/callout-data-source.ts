/**
 * @license
 *
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { html, property, customElement, LitElement } from 'lit-element';
import ddsSettings from '@carbon/ibmdotcom-utilities/es/utilities/settings/settings.js';
import styles from './callout-data.scss';

const { stablePrefix: ddsPrefix } = ddsSettings;

/**
 * The source content of callout data.
 *
 * @element dds-callout-data-source
 */
@customElement(`${ddsPrefix}-callout-data-source`)
class DDSCalloutDataSource extends LitElement {
  /**
   * The shadow slot this source content should be in.
   */
  @property({ reflect: true })
  slot = 'source';

  render() {
    return html`
      <slot></slot>
    `;
  }

  // `styles` here is a `CSSResult` generated by custom WebPack loader
  static styles = styles;
}

export default DDSCalloutDataSource;