/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable("scores", function (table) {
    table.increments("scoreId");
    table.integer("userId").unsigned().notNullable();
    table.integer("attemptsLeft").notNullable();
    table.string("correctWord").notNullable();
     table
        .foreign("userId")
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("scores");
};
