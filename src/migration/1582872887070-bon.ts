import {MigrationInterface, QueryRunner} from "typeorm";

export class bon1582872887070 implements MigrationInterface {
    name = 'bon1582872887070'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `comment` (`id` int NOT NULL AUTO_INCREMENT, `content` varchar(255) NOT NULL, `isActive` tinyint NOT NULL, `userId` int NOT NULL, `createdAt` datetime NOT NULL, `updatedAt` datetime NOT NULL, `postId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `post` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `content` varchar(255) NOT NULL, `userId` int NOT NULL, `isActive` tinyint NULL DEFAULT 1, `createdAt` datetime NULL, `updatedAt` datetime NULL, FULLTEXT INDEX `IDX_e28aa0c4114146bfb1567bfa9a` (`title`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `category` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `isActive` tinyint NULL DEFAULT 1, `createdAt` datetime NULL, `updatedAt` datetime NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `post_image` (`id` int NOT NULL AUTO_INCREMENT, `uri` varchar(255) NOT NULL, `createdAt` datetime NOT NULL, `updatedAt` datetime NOT NULL, `postId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `socialId` varchar(255) NOT NULL, `role` enum ('admin', 'operator', 'noRole') NOT NULL DEFAULT 'noRole', `isActive` tinyint NULL DEFAULT 1, `createdAt` datetime NULL, `updatedAt` datetime NULL, INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `post_categories_category` (`postId` int NOT NULL, `categoryId` int NOT NULL, INDEX `IDX_93b566d522b73cb8bc46f7405b` (`postId`), INDEX `IDX_a5e63f80ca58e7296d5864bd2d` (`categoryId`), PRIMARY KEY (`postId`, `categoryId`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `category_posts_post` (`categoryId` int NOT NULL, `postId` int NOT NULL, INDEX `IDX_3a1f3735235af2f4b702a3d398` (`categoryId`), INDEX `IDX_0cb77d79c53f0759b8153ec8a6` (`postId`), PRIMARY KEY (`categoryId`, `postId`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `comment` ADD CONSTRAINT `FK_94a85bb16d24033a2afdd5df060` FOREIGN KEY (`postId`) REFERENCES `post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `post_image` ADD CONSTRAINT `FK_668c9fb892f2accb872670c7b1e` FOREIGN KEY (`postId`) REFERENCES `post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `post_categories_category` ADD CONSTRAINT `FK_93b566d522b73cb8bc46f7405bd` FOREIGN KEY (`postId`) REFERENCES `post`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `post_categories_category` ADD CONSTRAINT `FK_a5e63f80ca58e7296d5864bd2d3` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `category_posts_post` ADD CONSTRAINT `FK_3a1f3735235af2f4b702a3d3987` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `category_posts_post` ADD CONSTRAINT `FK_0cb77d79c53f0759b8153ec8a62` FOREIGN KEY (`postId`) REFERENCES `post`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `category_posts_post` DROP FOREIGN KEY `FK_0cb77d79c53f0759b8153ec8a62`", undefined);
        await queryRunner.query("ALTER TABLE `category_posts_post` DROP FOREIGN KEY `FK_3a1f3735235af2f4b702a3d3987`", undefined);
        await queryRunner.query("ALTER TABLE `post_categories_category` DROP FOREIGN KEY `FK_a5e63f80ca58e7296d5864bd2d3`", undefined);
        await queryRunner.query("ALTER TABLE `post_categories_category` DROP FOREIGN KEY `FK_93b566d522b73cb8bc46f7405bd`", undefined);
        await queryRunner.query("ALTER TABLE `post_image` DROP FOREIGN KEY `FK_668c9fb892f2accb872670c7b1e`", undefined);
        await queryRunner.query("ALTER TABLE `comment` DROP FOREIGN KEY `FK_94a85bb16d24033a2afdd5df060`", undefined);
        await queryRunner.query("DROP INDEX `IDX_0cb77d79c53f0759b8153ec8a6` ON `category_posts_post`", undefined);
        await queryRunner.query("DROP INDEX `IDX_3a1f3735235af2f4b702a3d398` ON `category_posts_post`", undefined);
        await queryRunner.query("DROP TABLE `category_posts_post`", undefined);
        await queryRunner.query("DROP INDEX `IDX_a5e63f80ca58e7296d5864bd2d` ON `post_categories_category`", undefined);
        await queryRunner.query("DROP INDEX `IDX_93b566d522b73cb8bc46f7405b` ON `post_categories_category`", undefined);
        await queryRunner.query("DROP TABLE `post_categories_category`", undefined);
        await queryRunner.query("DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`", undefined);
        await queryRunner.query("DROP TABLE `user`", undefined);
        await queryRunner.query("DROP TABLE `post_image`", undefined);
        await queryRunner.query("DROP TABLE `category`", undefined);
        await queryRunner.query("DROP INDEX `IDX_e28aa0c4114146bfb1567bfa9a` ON `post`", undefined);
        await queryRunner.query("DROP TABLE `post`", undefined);
        await queryRunner.query("DROP TABLE `comment`", undefined);
    }

}
