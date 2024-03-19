-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL,
    `lives` INTEGER NOT NULL DEFAULT 5,
    `smokeType` ENUM('CIGS', 'PODS', 'DISPOSABLE') NOT NULL,
    `smokedFor` INTEGER NOT NULL,
    `age` INTEGER NULL,
    `sex` ENUM('MALE', 'FEMALE') NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SmokeDate` (
    `id` INTEGER NOT NULL,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cigs` (
    `packPrice` INTEGER NOT NULL,
    `cigsPerDay` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Cigs_userId_key`(`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pods` (
    `juicePrice` INTEGER NOT NULL,
    `juicePerMonth` INTEGER NOT NULL,
    `vaporizerPrice` INTEGER NOT NULL,
    `vaporizersPerMonth` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Pods_userId_key`(`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Disposable` (
    `disposablePrice` INTEGER NOT NULL,
    `disposablesPerMonth` INTEGER NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Disposable_userId_key`(`userId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SmokeDate` ADD CONSTRAINT `SmokeDate_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cigs` ADD CONSTRAINT `Cigs_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pods` ADD CONSTRAINT `Pods_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Disposable` ADD CONSTRAINT `Disposable_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
