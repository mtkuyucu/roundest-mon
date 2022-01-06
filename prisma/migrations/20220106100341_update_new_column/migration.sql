/*
  Warnings:

  - You are about to drop the column `votedAgainst` on the `Vote` table. All the data in the column will be lost.
  - You are about to drop the column `votedFor` on the `Vote` table. All the data in the column will be lost.
  - Added the required column `voteAgainst` to the `Vote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `voteFor` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Vote` DROP COLUMN `votedAgainst`,
    DROP COLUMN `votedFor`,
    ADD COLUMN `voteAgainst` INTEGER NOT NULL,
    ADD COLUMN `voteFor` INTEGER NOT NULL;
