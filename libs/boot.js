module.exports = app => {
    
    if (ProcessingInstruction.env.NODE_ENV !== "test") {
        app.db.sequelize.sync().done(() => {
            app.listen(app.get("port"), () => {
                console.log(`NTask API - http://localhost:${app.get("port")}`);
            });
        });
    }
    
}