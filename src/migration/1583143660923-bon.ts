import {MigrationInterface, QueryRunner} from "typeorm";

export class bon1583143660923 implements MigrationInterface {
    name = 'bon1583143660923'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `comment` CHANGE `createdAt` `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)", undefined);
        await queryRunner.query("ALTER TABLE `comment` CHANGE `updatedAt` `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)", undefined);
        await queryRunner.query("ALTER TABLE `post` DROP COLUMN `content`", undefined);
        await queryRunner.query("ALTER TABLE `post` ADD `content` varchar(20000) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `post` CHANGE `createdAt` `createdAt` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6)", undefined);
        await queryRunner.query("ALTER TABLE `post` CHANGE `updatedAt` `updatedAt` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6)", undefined);
        await queryRunner.query("ALTER TABLE `category` CHANGE `createdAt` `createdAt` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6)", undefined);
        await queryRunner.query("ALTER TABLE `category` CHANGE `updatedAt` `updatedAt` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6)", undefined);
        await queryRunner.query("ALTER TABLE `post_image` CHANGE `createdAt` `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)", undefined);
        await queryRunner.query("ALTER TABLE `post_image` CHANGE `updatedAt` `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `createdAt` `createdAt` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6)", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `updatedAt` `updatedAt` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6)", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` CHANGE `updatedAt` `updatedAt` datetime(0) NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` CHANGE `createdAt` `createdAt` datetime(0) NULL", undefined);
        await queryRunner.query("ALTER TABLE `post_image` CHANGE `updatedAt` `updatedAt` datetime(0) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `post_image` CHANGE `createdAt` `createdAt` datetime(0) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `category` CHANGE `updatedAt` `updatedAt` datetime(0) NULL", undefined);
        await queryRunner.query("ALTER TABLE `category` CHANGE `createdAt` `createdAt` datetime(0) NULL", undefined);
        await queryRunner.query("ALTER TABLE `post` CHANGE `updatedAt` `updatedAt` datetime(0) NULL", undefined);
        await queryRunner.query("ALTER TABLE `post` CHANGE `createdAt` `createdAt` datetime(0) NULL", undefined);
        await queryRunner.query("ALTER TABLE `post` DROP COLUMN `content`", undefined);
        await queryRunner.query("ALTER TABLE `post` ADD `content` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `comment` CHANGE `updatedAt` `updatedAt` datetime(0) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `comment` CHANGE `createdAt` `createdAt` datetime(0) NOT NULL", undefined);
    }

}
