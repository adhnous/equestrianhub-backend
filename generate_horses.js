
const sequelize = require('./config/database');
const Horse = require('./models/Horse_NAME');
const {{ v4: uuidv4 }} = require('uuid');

const items = [{"name": "Thunder", "breed": "Arabian", "age": 6, "status": "available"}, {"name": "Bella", "breed": "Thoroughbred", "age": 4, "status": "training"}, {"name": "Shadow", "breed": "Mustang", "age": 7, "status": "available"}, {"name": "Spirit", "breed": "Quarter Horse", "age": 5, "status": "retired"}];

async function seed() {{
  try {{
    await sequelize.sync();

    for (const item of items) {{
      await Horse.create({{
        ...item,
        id: uuidv4(),
        createdAt: new Date(),
        updatedAt: new Date()
      }});
      console.log(`✅ Added item: ${{item.name || item.username}}`);
    }}

    console.log('🎉 Seeding complete!');
    process.exit(0);
  }} catch (err) {{
    console.error('❌ Seeding failed:', err.message);
    process.exit(1);
  }}
}}

seed();
