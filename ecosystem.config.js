module.exports = {
    apps : [
        {
            name : "creeper",
            script : "./bin/www",
            watch: true,
            error_file : "./database/.pm2/err.log",
            out_file : "./database/.pm2/out.log",
            ignore_watch : ['node_modules','database'],
            max_restarts :3,
            env : {
                "NODE_ENV" : "development",
            },
            env_production : {
                "NODE_ENV" : "production"
            }
        }
    ]
};