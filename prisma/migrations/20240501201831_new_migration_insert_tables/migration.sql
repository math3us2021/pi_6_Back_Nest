-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `dateRegistered` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `favoriteGenres` VARCHAR(191) NOT NULL,
    `receiveNotifications` BOOLEAN NOT NULL DEFAULT false,
    `isAdmin` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Login` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `dtAccess` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `movies` (
    `id` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `genreId` VARCHAR(191) NOT NULL,
    `originalLanguage` VARCHAR(191) NOT NULL,
    `releaseDate` DATETIME(3) NOT NULL,
    `runtime` INTEGER NOT NULL,
    `statusId` VARCHAR(191) NOT NULL,
    `productionCompanies` VARCHAR(191) NOT NULL,
    `overview` VARCHAR(191) NOT NULL,
    `popularity` INTEGER NOT NULL,
    `voteAverage` INTEGER NOT NULL,
    `voteCount` INTEGER NOT NULL,
    `notification` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `status` (
    `id` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `genre` (
    `id` VARCHAR(191) NOT NULL,
    `genre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_UserTomovies` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_UserTomovies_AB_unique`(`A`, `B`),
    INDEX `_UserTomovies_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_genreTomovies` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_genreTomovies_AB_unique`(`A`, `B`),
    INDEX `_genreTomovies_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Login` ADD CONSTRAINT `Login_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserTomovies` ADD CONSTRAINT `_UserTomovies_A_fkey` FOREIGN KEY (`A`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_UserTomovies` ADD CONSTRAINT `_UserTomovies_B_fkey` FOREIGN KEY (`B`) REFERENCES `movies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_genreTomovies` ADD CONSTRAINT `_genreTomovies_A_fkey` FOREIGN KEY (`A`) REFERENCES `genre`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_genreTomovies` ADD CONSTRAINT `_genreTomovies_B_fkey` FOREIGN KEY (`B`) REFERENCES `movies`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;


INSERT INTO genre (id, genre)
VALUES
  (1, 'Action'),
  (2, 'Adventure'),
  (3, 'Fantasy'),
  (4, 'Science Fiction'),
  (5, 'Crime'),
  (6, 'Thriller'),
  (7, 'Horror'),
  (8, 'Comedy'),
  (9, 'Foreign'),
  (10, 'Drama'),
  (11, 'Romance'),
  (12, 'TV Movie');


INSERT INTO status (id, status)
VALUES
(1, 'launched'),
(2, 'foreseen')