
exports.up = function(knex, Promise) {
    return knex.schema.table('users', function(t) {
        t.dropColumn('timezone');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};
