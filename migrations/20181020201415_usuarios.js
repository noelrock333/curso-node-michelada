
exports.up = function(knex, Promise) {
  return knex.schema
    .createTable('usuarios', function (t) {
      t.increments('id').primary();
      t.string('nombre');
      t.integer('edad');
      t.timestamps();
    });
};

exports.down = function(knex, Promise) {
  return knex.schema
		.dropTableIfExists('usuarios');
};
