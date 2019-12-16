"use strict";
requirejs.config({
    paths: {
        "paper": "../node_modules/paper/dist/paper-core",
        "typescript-collections": "../node_modules/typescript-collections/dist/lib/index",
        "main": "../build/main",
        "view/field2D": "../build/view/field2D",
        "controllers/controller": "../build/controllers/controller"
    }
});
require(["paper"]);
require(["typescript-collections"]);
require(["view/field2D"]);
require(["controllers/controller"]);
require(["main"]);
