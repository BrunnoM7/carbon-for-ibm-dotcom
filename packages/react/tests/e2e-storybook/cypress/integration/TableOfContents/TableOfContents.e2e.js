/**
 * Copyright IBM Corp. 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Sets the correct path
 *
 * @type {string}
 * @private
 */
const _paths = {
  manual_default:
    'iframe.html?id=components-table-of-contents--manually-define-menu-items',
  dynamic_default: 'iframe.html?id=components-table-of-contents--dynamic-items',
  heading_content:
    'iframe.html?id=components-table-of-contents--with-heading-content',
};

/**
 * Collection of all tests for dds-table-of-contents
 *
 * @property {function} all
 * @property {function} desktop
 * @property {function} mobile
 * @private
 */
const _tests = {
  /**
   * Collection of tests for use across browser dimensions.
   *
   * @function screenshotThemes - Takes a screenshot of the given page in each theme.
   */
  all: {
    screenshotThemes: () => {
      cy.carbonThemesScreenshot({
        capture: 'viewport',
      });
    },
  },
  /**
   * Collection of tests for use on desktop-sized viewports.
   *
   * @function checkRender            - Asserts [linkID] === [sectionID]
   * @function checkLinkFunctionality - Asserts each link scrolls page to proper position
   * @function checkScrollSpy         - Asserts each link updates onscroll properly
   * @function checkStickyNav         - Asserts navigation stays within viewport
   */
  desktop: {
    checkRender: () => {
      const navItemsIds = [];
      const sectionIds = [];

      cy.get('.bx--tableofcontents__desktop__item a')
        .each(link => {
          navItemsIds.push(link.attr('href').replace('#', ''));
        })
        .get('a[name]')
        .each(section => {
          sectionIds.push(section.attr('name'));
        })
        .then(() => {
          expect(navItemsIds).to.deep.equal(sectionIds);
          cy.screenshot(`${Cypress.currentTest.titlePath[0]}`, {
            capture: 'viewport',
          });
          // Take a snapshot for visual diffing
          cy.percySnapshot(`${Cypress.currentTest.titlePath[0]}`, {
            widths: [1280],
          });
        });
    },
    checkLinkFunctionality: () => {
      const maxScrollVal = document.body.clientHeight - window.innerHeight;

      cy.get('.bx--tableofcontents__desktop__item a').each((link, i) => {
        cy.get(link)
          .click()
          .get(`a[name="${link.attr('href').replace('#', '')}"]`)
          .then(section => {
            const sectionScrolledTo =
              section.offset().top === 0 || window.scrollY === maxScrollVal;
            expect(sectionScrolledTo).to.be.true;
            if (i === 1) {
              cy.screenshot(`${Cypress.currentTest.titlePath[0]}`, {
                capture: 'viewport',
              });
              // Take a snapshot for visual diffing
              cy.percySnapshot(`${Cypress.currentTest.titlePath[0]}`, {
                widths: [1280],
              });
            }
          });
      });
    },
    checkScrollSpy: () => {
      cy.get('a[name]').each((section, i) => {
        cy.scrollTo(0, section.offset().top)
          .wait(1000) // Give the browser time to execute the event callback.
          .get(`a[href="#${section.attr('name')}"]`)
          .then(link => {
            expect(link.attr('aria-current')).to.equal('location');
            expect(link.parent()).to.have.class(
              'bx--tableofcontents__desktop__item--active'
            );
            if (i === 1) {
              cy.screenshot(`${Cypress.currentTest.titlePath[0]}`, {
                capture: 'viewport',
              });
              // Take a snapshot for visual diffing
              cy.percySnapshot(`${Cypress.currentTest.titlePath[0]}`, {
                widths: [1280],
              });
            }
          });
      });
    },
    checkStickyNav: () => {
      cy.wrap(['top', 'center', 'bottom']).each(pos => {
        cy.scrollTo(pos)
          .get('.bx--tableofcontents__desktop')
          .then(sidebar => {
            expect(sidebar.offset().top).to.be.greaterThan(0);
            if (pos === 'bottom') {
              cy.screenshot(`${Cypress.currentTest.titlePath[0]}`, {
                capture: 'viewport',
              });
              // Take a snapshot for visual diffing
              cy.percySnapshot(`${Cypress.currentTest.titlePath[0]}`, {
                widths: [1280],
              });
            }
          });
      });
    },
  },
  /**
   * Collection of tests for use on mobile-sized viewports.
   *
   * @function checkRender            - Asserts [optionID] === [sectionID]
   * @function checkLinkFunctionality - Asserts each select option scrolls page to proper position
   * @function checkScrollSpy         - Asserts select nav updates onscroll properly
   * @function checkStickyNav         - Asserts navigation stays within viewport
   */
  mobile: {
    checkRender: () => {
      const navItemsIds = [];
      const sectionIds = [];

      cy.get('.bx--tableofcontents__mobile__select__option:not([disabled])')
        .each(option => {
          navItemsIds.push(option.val());
        })
        .get('a[name]')
        .each(section => {
          sectionIds.push(section.attr('name'));
        })
        .then(() => {
          expect(navItemsIds).to.deep.equal(sectionIds);
          cy.screenshot(`${Cypress.currentTest.titlePath[0]}`, {
            capture: 'viewport',
          });
          // Take a snapshot for visual diffing
          cy.percySnapshot(`${Cypress.currentTest.titlePath[0]}`, {
            widths: [320],
          });
        });
    },
    checkLinkFunctionality: () => {
      const maxScrollVal = document.body.clientHeight - window.innerHeight;

      cy.get(
        '.bx--tableofcontents__mobile__select__option:not([disabled])'
      ).each((option, i) => {
        cy.get(option)
          .parent()
          .select(option.val())
          .get(`a[name=${option.val()}]`)
          .then(section => {
            const sectionScrolledTo =
              section.offset().top === 0 || window.scrollY === maxScrollVal;
            expect(sectionScrolledTo).to.be.true;
            if (i === 1) {
              cy.screenshot(`${Cypress.currentTest.titlePath[0]}`, {
                capture: 'viewport',
              });
              // Take a snapshot for visual diffing
              cy.percySnapshot(`${Cypress.currentTest.titlePath[0]}`, {
                widths: [320],
              });
            }
          });
      });
    },
    checkScrollSpy: () => {
      cy.get('a[name]').each((section, i) => {
        cy.scrollTo(0, section.offset().top)
          .wait(1000) // Give the browser time to execute the event callback.
          .get('.bx--tableofcontents__mobile__select')
          .then(select => {
            expect(select.val()).to.equal(section.attr('name'));
            if (i === 1) {
              cy.screenshot(`${Cypress.currentTest.titlePath[0]}`, {
                capture: 'viewport',
              });
              // Take a snapshot for visual diffing
              cy.percySnapshot(`${Cypress.currentTest.titlePath[0]}`, {
                widths: [320],
              });
            }
          });
      });
    },
    checkStickyNav: () => {
      cy.wrap(['top', 'center', 'bottom']).each(pos => {
        cy.scrollTo(pos)
          .get('.bx--tableofcontents__mobile')
          .then(mobileNav => {
            expect(mobileNav.offset().top).to.be.greaterThan(-1);
            if (pos === 'bottom') {
              cy.screenshot(`${Cypress.currentTest.titlePath[0]}`, {
                capture: 'viewport',
              });
              // Take a snapshot for visual diffing
              cy.percySnapshot(`${Cypress.currentTest.titlePath[0]}`, {
                widths: [320],
              });
            }
          });
      });
    },
  },
};

describe('TableOfContents | manually defined (desktop)', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit(`/${_paths.manual_default}`);
  });

  it(
    'should load table of contents sidebar with links',
    _tests.desktop.checkRender
  );
  it(
    'should navigate content to selected section',
    _tests.desktop.checkLinkFunctionality
  );
  it('should update current section on scroll', _tests.desktop.checkScrollSpy);
  it(
    'should remain visible on page throughout scroll',
    _tests.desktop.checkStickyNav
  );
  it('should render correctly in all themes', _tests.all.screenshotThemes);
});

describe('TableOfContents | dynamically defined (desktop)', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit(`/${_paths.dynamic_default}`);
  });

  it(
    'should load table of contents sidebar with links',
    _tests.desktop.checkRender
  );
  it(
    'should navigate content to selected section',
    _tests.desktop.checkLinkFunctionality
  );
  it('should update current section on scroll', _tests.desktop.checkScrollSpy);
  it(
    'should remain visible on page throughout scroll',
    _tests.desktop.checkStickyNav
  );
  it('should render correctly in all themes', _tests.all.screenshotThemes);
});

describe('TableOfContents | with heading content (desktop)', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.visit(`/${_paths.heading_content}`);
  });

  it(
    'should load table of contents horizontal bar with links',
    _tests.desktop.checkRender
  );
  it(
    'should navigate content to selected section',
    _tests.desktop.checkLinkFunctionality
  );
  it('should update current section on scroll', _tests.desktop.checkScrollSpy);
  it(
    'should remain visible on page throughout scroll',
    _tests.desktop.checkStickyNav
  );
  it('should render correctly in all themes', _tests.all.screenshotThemes);
});

describe('TableOfContents | manually defined (mobile)', () => {
  beforeEach(() => {
    cy.viewport(320, 720);
    cy.visit(`/${_paths.manual_default}`);
  });

  it(
    'should load table of contents sidebar with links',
    _tests.mobile.checkRender
  );
  it(
    'should navigate content to selected section',
    _tests.mobile.checkLinkFunctionality
  );
  it('should update current section on scroll', _tests.mobile.checkScrollSpy);
  it(
    'should remain visible on page throughout scroll',
    _tests.mobile.checkStickyNav
  );
  it('should render correctly in all themes', _tests.all.screenshotThemes);
});

describe('TableOfContents | dynamically defined (mobile)', () => {
  beforeEach(() => {
    cy.viewport(320, 720);
    cy.visit(`/${_paths.dynamic_default}`);
  });

  it(
    'should load table of contents sidebar with links',
    _tests.mobile.checkRender
  );
  it(
    'should navigate content to selected section',
    _tests.mobile.checkLinkFunctionality
  );
  it('should update current section on scroll', _tests.mobile.checkScrollSpy);
  it(
    'should remain visible on page throughout scroll',
    _tests.mobile.checkStickyNav
  );
  it('should render correctly in all themes', _tests.all.screenshotThemes);
});

describe('TableOfContents | with heading content (mobile)', () => {
  beforeEach(() => {
    cy.viewport(320, 720);
    cy.visit(`/${_paths.heading_content}`);
  });

  it(
    'should load table of contents sidebar with links',
    _tests.mobile.checkRender
  );
  it(
    'should navigate content to selected section',
    _tests.mobile.checkLinkFunctionality
  );
  it('should update current section on scroll', _tests.mobile.checkScrollSpy);
  it(
    'should remain visible on page throughout scroll',
    _tests.mobile.checkStickyNav
  );
  it('should render correctly in all themes', _tests.all.screenshotThemes);
});
