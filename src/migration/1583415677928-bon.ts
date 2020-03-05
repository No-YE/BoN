import {MigrationInterface, QueryRunner} from "typeorm";

export class bon1583415677928 implements MigrationInterface {
    name = 'bon1583415677928'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `comment` (`id` int NOT NULL AUTO_INCREMENT, `content` varchar(255) NOT NULL, `isActive` tinyint NOT NULL, `userId` int NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `postId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `post_to_category` (`postId` int NOT NULL, `categoryId` int NOT NULL, PRIMARY KEY (`postId`, `categoryId`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `post` (`id` int NOT NULL AUTO_INCREMENT, `title` varchar(255) NOT NULL, `content` varchar(20000) NOT NULL, `userId` int NOT NULL, `isActive` tinyint NULL DEFAULT 1, `createdAt` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), FULLTEXT INDEX `IDX_e28aa0c4114146bfb1567bfa9a` (`title`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `category` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `isActive` tinyint NULL DEFAULT 1, `createdAt` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `post_image` (`id` int NOT NULL AUTO_INCREMENT, `uri` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `postId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `social` enum ('google') NOT NULL DEFAULT 'google', `role` enum ('admin', 'operator', 'noRole') NOT NULL DEFAULT 'noRole', `isActive` tinyint NULL DEFAULT 1, `createdAt` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6), INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), UNIQUE INDEX `IDX_539ee6dd9db0d6f72dcbdcdcfb` (`email`, `social`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("CREATE INDEX `IDX_9dab22c49ca441a85b5d130534` ON `post_to_category` (`postId`)", undefined);
        await queryRunner.query("CREATE INDEX `IDX_9d072d7c8d7909a5474fee7bba` ON `post_to_category` (`categoryId`)", undefined);
        await queryRunner.query("ALTER TABLE `comment` ADD CONSTRAINT `FK_94a85bb16d24033a2afdd5df060` FOREIGN KEY (`postId`) REFERENCES `post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `post_to_category` ADD CONSTRAINT `FK_9dab22c49ca441a85b5d1305342` FOREIGN KEY (`postId`) REFERENCES `post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `post_to_category` ADD CONSTRAINT `FK_9d072d7c8d7909a5474fee7bbae` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `post_image` ADD CONSTRAINT `FK_668c9fb892f2accb872670c7b1e` FOREIGN KEY (`postId`) REFERENCES `post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `post_image` DROP FOREIGN KEY `FK_668c9fb892f2accb872670c7b1e`", undefined);
        await queryRunner.query("ALTER TABLE `post_to_category` DROP FOREIGN KEY `FK_9d072d7c8d7909a5474fee7bbae`", undefined);
        await queryRunner.query("ALTER TABLE `post_to_category` DROP FOREIGN KEY `FK_9dab22c49ca441a85b5d1305342`", undefined);
        await queryRunner.query("ALTER TABLE `comment` DROP FOREIGN KEY `FK_94a85bb16d24033a2afdd5df060`", undefined);
        await queryRunner.query("DROP INDEX `IDX_9d072d7c8d7909a5474fee7bba` ON `post_to_category`", undefined);
        await queryRunner.query("DROP INDEX `IDX_9dab22c49ca441a85b5d130534` ON `post_to_category`", undefined);
        await queryRunner.query("DROP INDEX `IDX_539ee6dd9db0d6f72dcbdcdcfb` ON `user`", undefined);
        await queryRunner.query("DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`", undefined);
        await queryRunner.query("DROP TABLE `user`", undefined);
        await queryRunner.query("DROP TABLE `post_image`", undefined);
        await queryRunner.query("DROP TABLE `category`", undefined);
        await queryRunner.query("DROP INDEX `IDX_e28aa0c4114146bfb1567bfa9a` ON `post`", undefined);
        await queryRunner.query("DROP TABLE `post`", undefined);
        await queryRunner.query("DROP TABLE `post_to_category`", undefined);
        await queryRunner.query("DROP TABLE `comment`", undefined);
    }

}
