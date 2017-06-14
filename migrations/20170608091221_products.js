
exports.up = function(knex, Promise) {
  return knex.schema.createTable('products', function(table) {
    table.increments();
    table.string('product_name').notNullable();
    table.string('product_description').nullable();
    table.string('product_link').nullable();
    table.string('product_media').nullable();
    table.integer('maker_id').references('id').inTable('users');
    table.integer('upvote').defaultTo(0);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('products');
};
