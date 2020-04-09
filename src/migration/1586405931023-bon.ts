import {MigrationInterface, QueryRunner} from "typeorm";

export class bon1586405931023 implements MigrationInterface {
    name = 'bon1586405931023'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `post` CHANGE `isActive` `isActive` tinyint NOT NULL DEFAULT 1", undefined);
        await queryRunner.query("ALTER TABLE `post` CHANGE `createdAt` `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)", undefined);
        await queryRunner.query("ALTER TABLE `post` CHANGE `updatedAt` `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)", undefined);
        await queryRunner.query("ALTER TABLE `post` CHANGE `isActive` `isActive` tinyint NOT NULL DEFAULT 1", undefined);
        await queryRunner.query("ALTER TABLE `post` CHANGE `createdAt` `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)", undefined);
        await queryRunner.query("ALTER TABLE `post` CHANGE `updatedAt` `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)", undefined);
        await queryRunner.query("CREATE FULLTEXT INDEX `IDX_d178da0438977d4e6911acaed3` ON `post` (`content`)", undefined);
        await queryRunner.query("CREATE FULLTEXT INDEX `IDX_d178da0438977d4e6911acaed3` ON `post` (`content`)", undefined);
        await queryRunner.query("CREATE INDEX `IDX_9d072d7c8d7909a5474fee7bba` ON `post_to_category` (`categoryId`)", undefined);
        await queryRunner.query("CREATE INDEX `IDX_9dab22c49ca441a85b5d130534` ON `post_to_category` (`postId`)", undefined);
        await queryRunner.query("ALTER TABLE `comment` ADD CONSTRAINT `FK_94a85bb16d24033a2afdd5df060` FOREIGN KEY (`postId`) REFERENCES `post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `post_to_category` ADD CONSTRAINT `FK_9dab22c49ca441a85b5d1305342` FOREIGN KEY (`postId`) REFERENCES `post`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
        await queryRunner.query("ALTER TABLE `post_to_category` ADD CONSTRAINT `FK_9d072d7c8d7909a5474fee7bbae` FOREIGN KEY (`categoryId`) REFERENCES `category`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `post_to_category` DROP FOREIGN KEY `FK_9d072d7c8d7909a5474fee7bbae`", undefined);
        await queryRunner.query("ALTER TABLE `post_to_category` DROP FOREIGN KEY `FK_9dab22c49ca441a85b5d1305342`", undefined);
        await queryRunner.query("ALTER TABLE `comment` DROP FOREIGN KEY `FK_94a85bb16d24033a2afdd5df060`", undefined);
        await queryRunner.query("DROP INDEX `IDX_9dab22c49ca441a85b5d130534` ON `post_to_category`", undefined);
        await queryRunner.query("DROP INDEX `IDX_9d072d7c8d7909a5474fee7bba` ON `post_to_category`", undefined);
        await queryRunner.query("DROP INDEX `IDX_d178da0438977d4e6911acaed3` ON `post`", undefined);
        await queryRunner.query("DROP INDEX `IDX_d178da0438977d4e6911acaed3` ON `post`", undefined);
        await queryRunner.query("ALTER TABLE `post` CHANGE `updatedAt` `updatedAt` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6)", undefined);
        await queryRunner.query("ALTER TABLE `post` CHANGE `createdAt` `createdAt` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6)", undefined);
        await queryRunner.query("ALTER TABLE `post` CHANGE `isActive` `isActive` tinyint NULL DEFAULT '1'", undefined);
        await queryRunner.query("ALTER TABLE `post` CHANGE `updatedAt` `updatedAt` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6)", undefined);
        await queryRunner.query("ALTER TABLE `post` CHANGE `createdAt` `createdAt` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6)", undefined);
        await queryRunner.query("ALTER TABLE `post` CHANGE `isActive` `isActive` tinyint NULL DEFAULT '1'", undefined);
    }

}
