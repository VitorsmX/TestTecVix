-- AlterTable
ALTER TABLE `user` ADD COLUMN `contractDate` DATETIME(3) NULL,
    ADD COLUMN `department` VARCHAR(191) NULL,
    ADD COLUMN `field` VARCHAR(191) NULL,
    ADD COLUMN `fullName` VARCHAR(191) NULL,
    ADD COLUMN `userPhoneNumber` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `vM` ADD COLUMN `pass` VARCHAR(191) NULL,
    ADD COLUMN `vmLocalization` ENUM('bre_barueri', 'usa_miami') NOT NULL DEFAULT 'bre_barueri';
