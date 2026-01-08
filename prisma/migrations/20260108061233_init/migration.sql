-- CreateTable
CREATE TABLE `dictionary` (
    `id` CHAR(36) NOT NULL,
    `dictionary_name` CHAR(36) NOT NULL,
    `dictionary_type` CHAR(36) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `dictionary_dictionary_name_key`(`dictionary_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` CHAR(36) NOT NULL,
    `username` CHAR(36) NOT NULL,
    `password` CHAR(36) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `telegram_user_id` VARCHAR(10) NULL,
    `telegram_is_valid` BOOLEAN NOT NULL DEFAULT false,
    `bio` VARCHAR(500) NULL,
    `profile_image` TEXT NULL,
    `born_at` DATE NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    UNIQUE INDEX `user_telegram_user_id_key`(`telegram_user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `history` (
    `id` CHAR(36) NOT NULL,
    `history_type` CHAR(36) NOT NULL,
    `history_context` CHAR(36) NOT NULL,
    `created_by` CHAR(36) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `history_history_type_key`(`history_type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `allergic` (
    `id` CHAR(36) NOT NULL,
    `allergic_context` CHAR(36) NOT NULL,
    `allergic_desc` VARCHAR(255) NULL,
    `created_by` CHAR(36) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `google_token` (
    `id` CHAR(36) NOT NULL,
    `access_token` TEXT NOT NULL,
    `refresh_token` TEXT NOT NULL,
    `expiry` DATETIME(3) NOT NULL,
    `created_by` CHAR(36) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `care_product` (
    `id` CHAR(36) NOT NULL,
    `product_name` VARCHAR(255) NOT NULL,
    `brand` VARCHAR(100) NOT NULL,
    `product_category` CHAR(36) NOT NULL,
    `product_type` CHAR(36) NOT NULL,
    `ingredients` JSON NULL,
    `key_ingredients` JSON NULL,
    `alcohol_free` BOOLEAN NOT NULL DEFAULT false,
    `fragrance_free` BOOLEAN NOT NULL DEFAULT false,
    `paraben_free` BOOLEAN NOT NULL DEFAULT false,
    `recommended_for` VARCHAR(255) NULL,
    `suitable_skin` VARCHAR(100) NULL,
    `usage_instruction` TEXT NULL,
    `is_active` BOOLEAN NOT NULL DEFAULT true,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `created_by` CHAR(36) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `history` ADD CONSTRAINT `history_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `allergic` ADD CONSTRAINT `allergic_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `google_token` ADD CONSTRAINT `google_token_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `care_product` ADD CONSTRAINT `care_product_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `user`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
