const { adminServer, } = require("../../../config.json");
const getLocalCommands = require("../../utils/getLocalCommands");
const getApplicationCommands = require("../../utils/getApplicationCommands");
const areCommandsDifferent = require("../../utils/areCommandsDifferent");

module.exports = async (client) => {
	try {
        const localCommands = getLocalCommands();
        const applicationCommands = await getApplicationCommands(
            client,
            adminServer
        );

        console.log("\nADMIN SERVER CONFIGURATION : \n")

        for (const localCommand of localCommands) {
            const { name, description, options } = localCommand;

            if (localCommand.hide) {
                continue;
            }
            if (!localCommand.adminServer) {
                console.log(`Command ${name} is not set to be usable in this server`)
                continue;
            }

            const existingCommand = await applicationCommands.cache.find(
                (cmd) => cmd.name === name
            );

            if (existingCommand) {
                if (localCommand.deleted) {
                    await applicationCommands.delete(existingCommand.id);

                    console.log(`Deleted command "${name}".`);
                    continue;
                }

                if (areCommandsDifferent(existingCommand, localCommand)) {
                    await applicationCommands.edit(existingCommand.id, {
                        description,
                        options,
                    });

                    console.log(`Edited command ${name}.`);
                }
            } else {
                if (localCommand.deleted) {
                    console.log(`Skipping registering command "${name}" as it's set to delete`);
					continue;
                }

                await applicationCommands.create({
                    name,
                    description,
                    options,
                });

                console.log(`Registered command "${name}".`);
            }
        }
    } catch (error) {
        console.log(`Error detected : ${error}`);
    }
};
