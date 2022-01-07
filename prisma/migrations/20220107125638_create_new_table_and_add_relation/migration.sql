/*
  Warnings:

  - You are about to drop the column `voteAgainst` on the `Vote` table. All the data in the column will be lost.
  - You are about to drop the column `voteFor` on the `Vote` table. All the data in the column will be lost.
  - Added the required column `votedAgainstId` to the `Vote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `votedForId` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Vote` DROP COLUMN `voteAgainst`,
    DROP COLUMN `voteFor`,
    ADD COLUMN `votedAgainstId` INTEGER NOT NULL,
    ADD COLUMN `votedForId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Pokemon` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `name` VARCHAR(191) NOT NULL,
    `spriteUrl` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
