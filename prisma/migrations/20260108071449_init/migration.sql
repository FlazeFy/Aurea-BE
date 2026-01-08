/*
  Warnings:

  - Added the required column `time` to the `used_schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `used_schedule` ADD COLUMN `time` ENUM('morning', 'afternoon', 'night') NOT NULL;
