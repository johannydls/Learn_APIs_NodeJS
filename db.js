import fs from "fs";
import path from "path";
import Sequelize from "sequelize";

let db = null;

module.exports = app => {
    if (!db) {
        const config = app.libs.config;
        const sequelize = new Sequelize(
            config.database,
            config.username,
            config.password,
            config.params
        );

        db = {
            sequelize,
            Sequelize,
            models: {}
        };

        const dir = path.join(__dirname, "models");

        /**
         * Retorna um array de strings referente aos nomes
         * de arquivos existentes no diretório models.
         * Depois, esse array será iterado, para que dentro de
         * seu escopo de iteração sejam carregados todos os modelos
         * via função sequelize.import(modelDir)
         */
        fs.readdirSync(dir).forEach(file => {
            const modelDir = path.join(dir, file);
            const model = sequelize.import(modelDir);
            db.models[model.name] = model;
        });

        /**
         * Essa função executará a função db.models[key].associate(db.models)
         * para garantir o relacionamento correto entre os modelos.
         */
        Object.keys(db.models).forEach(key => {
            db.models[key].options.classMethods.associate(db.models);
        });
    }

    return db;
};