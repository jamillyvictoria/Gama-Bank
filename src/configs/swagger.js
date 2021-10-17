const inert = require("@hapi/inert")
const vision = require("@hapi/vision")
const { version } = require("../../package.json")
const hapiswagger = require("hapi-swagger")


const swagger =
{
    plugin: hapiswagger,
    options: {
        info: {
            title: "Gamabank - DeVelopers",
            description: "Back end service of a digital bank produced by Gama students in partnership with Accenture",
            version: version
        },
    },
}

module.exports = [inert, vision, swagger]