describe("Проверка логики работы модального окна", () => {
  beforeEach(() => {
    cy.intercept("GET", "ingredients", { fixture: "ingredient" }).as(
      "getIngredients"
    ); // мокаем запрос ингредиентов
    cy.visit("http://localhost:5173/");
    cy.viewport("macbook-11"); // для удобства
  });

  it("Должно открыться по клику", () => {
    cy.get(".open-modal-button").contains("Булка").click();
    cy.get('[data-testid="modal-window"]').should("exist").wait(500);
  });

  it("Должно открыться по клику оформить заказ", () => {
    // Устанавливаем refreshToken в куки
    cy.setCookie("refreshToken", "lol");

    // берем булку и бросаем в конструктор
    cy.get('[data-testid="ingredients-elements-block"]').as(
      "ingredients-elements-block"
    ); // блок с ингредиентами
    cy.get('[data-testid="сonstructor-ingredients-block-bun"]').as(
      "сonstructor-ingredients-block-bun"
    ); // блок конструктором

    cy.get("@ingredients-elements-block")
      .find('[data-testid="ingredient"]')
      .contains("Булка")
      .as("ingredient-drag"); // берём замоканную булку и присваеваем ей имя

    cy.get("@ingredient-drag").trigger("dragstart").wait(500); // ждём, чтобы не было багов;
    cy.get("@сonstructor-ingredients-block-bun").trigger("drop").wait(500); // ждём, чтобы не было багов;

    cy.get('[data-testid="bun-constructor-element"]').eq(0).should("exist");

    cy.get('[data-testid="ingredients-elements-block"]').as(
      "ingredients-elements-block"
    ); // блок с ингредиентами
    cy.get('[data-testid="сonstructor-ingredients-block-ingredient"]').as(
      "сonstructor-ingredients-block-ingredient"
    ); // блок с конструктором

    // берем ингредиент и бросаем в конструктор
    cy.get("@ingredients-elements-block")
      .find('[data-testid="ingredient"]')
      .contains("Соус")
      .as("ingredient-drag"); // берём замоканый ингредиент и присваеваем ей имя

    cy.get("@ingredient-drag").trigger("dragstart").wait(500); // ждём, чтобы не было багов;
    cy.get("@сonstructor-ingredients-block-ingredient")
      .trigger("drop")
      .wait(500); // ждём, чтобы не было багов;

    cy.get('[data-testid="ingredient-constructor-element"]')
      .eq(0)
      .should("exist");

    // теперь кликаем по кнопке оформить заказ
    cy.get(".open-modal-button").contains("Оформить заказ").click();
    cy.get('[data-testid="modal-window"]').should("exist");
  });

  it("Должно закрыться по крестику", () => {
    cy.get(".open-modal-button").contains("Булка").click();
    cy.get('[data-testid="close-button"]').click();
    cy.get('[data-testid="modal-window"]').should("not.exist");
  });

  it("Должно закрыться по клику на оверлей", () => {
    cy.get(".open-modal-button").contains("Булка").click();
    cy.get('[data-testid="modal-window"]').should("exist");
    cy.get('[data-testid="open-modal-overlay"]').click(0, 0); // чтобы не пытался кликнуть прям посередине, где модальное окно
    cy.get('[data-testid="modal-window"]').should("not.exist");
  });

  it("Должно закрыться при нажатии ESC", () => {
    cy.get(".open-modal-button").contains("Булка").click();
    cy.get('[data-testid="modal-window"]').should("exist").wait(500);
    cy.get("body").type("{esc}");
    cy.get('[data-testid="modal-window"]').should("not.exist");
  });
});
