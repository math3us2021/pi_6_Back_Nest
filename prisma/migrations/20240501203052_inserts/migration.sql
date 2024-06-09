-- CreateTable
CREATE TABLE `_moviesTostatus` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_moviesTostatus_AB_unique`(`A`, `B`),
    INDEX `_moviesTostatus_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_moviesTostatus` ADD CONSTRAINT `_moviesTostatus_A_fkey` FOREIGN KEY (`A`) REFERENCES `movies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_moviesTostatus` ADD CONSTRAINT `_moviesTostatus_B_fkey` FOREIGN KEY (`B`) REFERENCES `status`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
