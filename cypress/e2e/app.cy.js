/// <reference types="cypress" />

describe('HomePage', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should display "ToTopButton" and work correctly', () => {
    cy.get('.button-top__icon')
      .click()

    cy.window()
      .its('scrollY')
      .should('equal', 0)
  })

  it('should play video on "CourseCard" hover if video is available', () => {
    cy.get('.course-card__image')
      .first()
      .trigger('mouseover')

    cy.get('.course-card__video')
      .first()
      .should('have.attr', 'loop')
  })

  it('should show image on "CourseCard" hover if video is not available', () => {
    cy.get('.course-card__image img')
      .first()
      .trigger('mouseover')

    cy.get('.course-card__image img')
      .first()
      .should('be.visible')
  })

  it('should display correct search params on pagination click and page reload', () => {
    cy.get('.pagination__item')
      .contains('2')
      .click();

    cy.url()
      .should('include', 'page=2');

    cy.reload();

    cy.url()
      .should('include', 'page=2');
  });

  it('should have "Logo" in "Header"', () => {
    cy.get('.header > a > img')
      .should('be.visible')
  })

  it('should have "Logo" in "Footer"', () => {
    cy.get('.footer__container > [href="#/"] > img')
      .should('be.visible')
  })

  it('should contain a footer link to GitHub', () => {
    cy.get('.footer__link')
      .should('have.attr', 'href', 'https://github.com/dmytro-lebedchenko')
      .and('contain', 'Github')
  })
})

describe('CoursePage', () => {
  beforeEach(() => {
    cy.visit('/course/58a1a586-51d1-4a74-a30b-bddd095af398?lesson=8763437d-9f09-440d-884c-1b7af9c94296')
  })

  it('should display the course video', () => {
    cy.get('.player__video')
      .should('be.visible')
  })

  it('should display the lesson title', () => {
    cy.get('.player__title')
      .should('contain.text', 'Behaviors that make people dislike you')
  })

  it('should have a back button', () => {
    cy.get('.back-button')
      .should('exist')
  })

  it('should display "ToTopButton" and work correctly', () => {
    cy.get('.button-top__icon')
      .click()

    cy.window()
      .its('scrollY')
      .should('equal', 0)
  })

  it('should have "Logo" in "Header"', () => {
    cy.get('.header > a > img')
      .should('be.visible')
  })

  it('should navigate back to homepage when clicking on "Logo" in "Header"', () => {
    cy.get('.header > a > img')
      .click()

    cy.url()
      .should('equal', 'https://dmytro-lebedchenko.github.io/react_courses-app/#/')
  })

  it('should have "Logo" in "Footer"', () => {
    cy.get('.footer__container > [href="#/"] > img')
      .should('be.visible')
  })

  it('should navigate back to homepage when clicking on "Logo" in "Footer"', () => {
    cy.get('.footer__container > [href="#/"] > img')
      .click()

    cy.url()
      .should('equal', 'https://dmytro-lebedchenko.github.io/react_courses-app/#/')
  })

  it('should have a playlist with multiple items', () => {
    cy.get('.playlist__item')
      .should('have.length.greaterThan', 1)
  })

  it('should start playing the correct video when clicking a playlist item', () => {
    cy.get('.playlist__item')
      .eq(2)
      .click()

    cy.wait(2000)

    cy.url()
      .should('include', 'lesson=71742b9d-e4f4-4c32-89bb-a257e58ca096')
  })

  it('should display the correct lesson title', () => {
    cy.get('.playlist__item--active > .playlist__item-title')
      .invoke('text')
      .then(playlistTitle => {
        cy.get('.player__title')
          .invoke('text')
          .should('equal', playlistTitle.trim())
      })
  })

  it('should contain a footer link to GitHub', () => {
    cy.get('.footer__link')
      .should('have.attr', 'href', 'https://github.com/dmytro-lebedchenko')
      .and('contain', 'Github')
  })
})

describe('NotFoundPage', () => {
  beforeEach(() => {
    cy.visit('/blablabla')
  })

  it('should display the "not found" message', () => {
    cy.get('.not-found-page__title')
      .should('have.text', 'Oh, no! Page is not found...');
  });

  it('should display the "not found" image', () => {
    cy.get('.not-found-page__image')
      .should('exist');
  });

  it('should display "ToTopButton" and work correctly', () => {
    cy.get('.button-top__icon')
      .click()

    cy.window()
      .its('scrollY')
      .should('equal', 0)
  })

  it('should have "Logo" in "Header"', () => {
    cy.get('.header > a > img')
      .should('be.visible')
  })

  it('should have "Logo" in "Footer"', () => {
    cy.get('.footer__container > [href="#/"] > img')
      .should('be.visible')
  })
})
