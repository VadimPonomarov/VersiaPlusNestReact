-- CreateTable
CREATE TABLE `settings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tracing` BOOLEAN NOT NULL DEFAULT false,
    `initial_seed` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `settings_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
