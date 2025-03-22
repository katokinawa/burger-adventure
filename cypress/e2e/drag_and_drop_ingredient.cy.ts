describe("Drag & Drop тест булки", () => {
  beforeEach(() => {
    cy.intercept("GET", "ingredients", { fixture: "ingredient" }).as(
      "getIngredients"
    ); // мокаем запрос ингредиентов
    cy.visit("http://localhost:5173/");
  });

  it("Должен перетащить ингредиент в конструктор", () => {
    cy.get('[data-testid="ingredients-elements-block"]').as(
      "ingredients-elements-block"
    ); // блок с ингредиентами
    cy.get('[data-testid="сonstructor-ingredients-block-ingredient"]').as(
      "сonstructor-ingredients-block-ingredient"
    ); // блок с конструктором

    cy.get("@ingredients-elements-block")
      .find('[data-testid="ingredient"]')
      .contains("Соус")
      .as("ingredient-drag"); // берём замоканый ингредиент и присваеваем ей имя

    cy.get("@ingredient-drag").trigger("dragstart").wait(500) // ждём, чтобы не было багов;
    cy.get("@сonstructor-ingredients-block-ingredient").trigger("drop").wait(500) // ждём, чтобы не было багов;

    cy.get('[data-testid="ingredient-constructor-element"]').eq(0).should("exist");
  });
});
